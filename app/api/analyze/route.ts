// app/api/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import Together from "together-ai";

export async function POST(request: NextRequest) {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    console.error("Together API key is not defined in environment variables");
    return NextResponse.json(
      { error: "API configuration error" },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const together = new Together({ apiKey });

    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");

    const systemMessage = {
      role: "system" as const,
      content:
        "You are a medical imaging expert. Provide analysis in clear text without any markdown formatting or special characters like asterisks. Use simple headings and bullet points with standard formatting.",
    };

    const userMessage = {
      role: "user" as const,
      content: [
        {
          type: "text" as const,
          text: `Please analyze this X-ray image and provide a detailed medical report using the following format:

Type of X-ray:
[Describe the type and orientation of the X-ray]

Key Findings:
• [List each finding on a new line with a bullet point]
• [Focus on normal and abnormal findings]
• [Include major anatomical structures]

Potential Conditions:
• [List potential conditions based on findings]
• [Include likelihood assessments]

Recommendations:
• [Provide any follow-up recommendations]

Please provide the analysis in plain text without any special characters or markdown formatting.`,
        },
        {
          type: "image_url" as const,
          image_url: {
            url: `data:image/jpeg;base64,${base64Image}`,
          },
        },
      ],
    };

    try {
      const response = await together.chat.completions.create({
        model: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
        messages: [systemMessage, userMessage],
        max_tokens: 512,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1,
      });

      let analysisContent = response?.choices?.[0]?.message?.content;

      if (!analysisContent) {
        throw new Error("No analysis content received from API");
      }

      // Clean up any remaining asterisks or markdown
      analysisContent = analysisContent
        .replace(/\*\*/g, "") // Remove double asterisks
        .replace(/\*/g, "•") // Replace single asterisks with bullets
        .replace(/_{2,}/g, "") // Remove underscores
        .replace(/#{2,}/g, "") // Remove hashtags
        .trim();

      return NextResponse.json({
        analysis: analysisContent,
      });
    } catch (apiError) {
      console.error("Together API Error:", apiError);
      return NextResponse.json(
        { error: "Error calling Together API" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing image" },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
