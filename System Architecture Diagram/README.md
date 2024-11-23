## 🏗️ System Architecture

Below is a detailed architecture diagram of the X-ray Analysis Portal, illustrating how different components interact:

```mermaid
flowchart TB
  subgraph subGraph0["Client Layer"]
        UI["Web Interface"]
  end

  subgraph Authentication["Authentication"]
        AUTH["Auth Service"]
        JWT["JWT Handler"]
        OTP["OTP Service"]
  end

  subgraph subGraph2["Core Services"]
        UPLOAD["Image Upload Service"]
        ANALYSIS["Analysis Service"]
        TTS["Text-to-Speech Service"]
  end

  subgraph subGraph3["Application Layer"]
        NEXT["Next.js Server"]
        Authentication
        subGraph2
  end

  subgraph subGraph4["External Services"]
        TOGETHER["Together AI API"]
        EMAIL["Email Service"]
  end

  subgraph subGraph5["Database Layer"]
        DB[("TiDB Cloud")]
  end

    UI --> NEXT
    NEXT --> AUTH & UPLOAD
    AUTH --> JWT & OTP & DB
    OTP --> EMAIL
    UPLOAD --> ANALYSIS
    ANALYSIS --> TOGETHER & TTS
    UI -- User Input --> NEXT
    NEXT -- Auth Requests --> AUTH
    AUTH -- Verify Token --> JWT
    AUTH -- Generate OTP --> OTP
    OTP -- Send OTP --> EMAIL
    UPLOAD -- "X-ray Image" --> ANALYSIS
    ANALYSIS -- Image Analysis --> TOGETHER
    TOGETHER -- Analysis Results --> ANALYSIS
    TTS -- Convert to Speech --> UI

    classDef default fill:#fff,stroke:#333,stroke-width:2px
    classDef highlight fill:#f8f9fa,stroke:#333,stroke-width:4px
    style UI fill:#e1f5fe,stroke:#01579b
    style NEXT fill:#e8f5e9,stroke:#2e7d32
    style AUTH fill:#fff3e0,stroke:#ff6f00
    style JWT fill:#fff3e0,stroke:#ff6f00
    style OTP fill:#fff3e0,stroke:#ff6f00
    style UPLOAD fill:#f3e5f5,stroke:#7b1fa2
    style ANALYSIS fill:#f3e5f5,stroke:#7b1fa2
    style TTS fill:#f3e5f5,stroke:#7b1fa2
    style TOGETHER fill:#fce4ec,stroke:#c2185b
    style EMAIL fill:#e8eaf6,stroke:#3f51b5
    style DB fill:#efebe9,stroke:#5d4037
```

### Architecture Overview

Our system is structured in layers, each with specific responsibilities:

#### 1. Client Layer

- **Web Interface**: Next.js-based frontend providing user interaction
- Features responsive design and real-time updates
- Implements text-to-speech functionality for accessibility

#### 2. Application Layer

The application layer consists of two main components:

**Authentication System**:

- Auth Service: Manages user authentication and session handling
- JWT Handler: Generates and validates JSON Web Tokens
- OTP Service: Handles one-time password generation and verification

**Core Services**:

- Image Upload Service: Manages X-ray image uploads
- Analysis Service: Coordinates with AI for image analysis
- Text-to-Speech Service: Converts analysis results to speech

#### 3. External Services

- **Together AI API**: Powers X-ray analysis using LLAMA 3.2 model
- **Email Service**: Handles OTP delivery

#### 4. Database Layer

- **TiDB Cloud**: At this moment it Stores user data

### Data Flow

1. **Authentication Flow**:

   - User submits credentials through web interface
   - Auth service validates and generates JWT token
   - OTP verification through email when required

2. **Analysis Flow**:

   - User uploads X-ray image
   - Image processed by upload service
   - Analysis service sends to Together AI
   - Results displayed to user

3. **Text-to-Speech Flow**:
   - Analysis results converted to speech on demand
   - Audio playback through web interface

### Security Measures

- JWT-based authentication
- Secure OTP verification
- HTTP-only cookies
- Rate limiting implementation
- XSS protection
- Database encryption

### Performance Features

- Image optimization
- Response caching
- Lazy loading
- Connection pooling
- Query optimization

### Error Handling

- Graceful error recovery
- Automatic retries for API calls
- Comprehensive error logging
- User-friendly error messages

---

Built with ❤️ in Timor-Leste 🇹🇱
