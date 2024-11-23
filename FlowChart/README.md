```mermaid
flowchart TD
    Start([Start]) --> Login{User Login}

    %% Authentication Flow
    Login -->|New User| Register[Register Account]
    Register --> SendOTP[Send OTP Email]
    SendOTP --> VerifyOTP{Verify OTP}
    VerifyOTP -->|Invalid| SendOTP
    VerifyOTP -->|Valid| CreateAccount[Create Account]
    CreateAccount --> Dashboard

    Login -->|Existing User| Auth{Authenticate}
    Auth -->|Failed| Login
    Auth -->|Success| Dashboard[Dashboard]

    %% Main Process Flow
    Dashboard --> Upload[Upload X-ray]
    Upload --> Validate{Validate Image}

    Validate -->|Invalid| Error[Show Error]
    Error --> Dashboard

    Validate -->|Valid| Process[Process Image]
    Process --> AIAnalysis[AI Analysis]
    AIAnalysis --> Display[Display Results]
    Display --> Actions{User Actions}

    %% Action Options
    Actions -->|Read| Speech[Text to Speech]
    Actions -->|New Analysis| Dashboard
    Actions -->|Exit| Finish([End])

    %% Styling
    classDef startEnd fill:#f96,stroke:#333,stroke-width:2px
    classDef process fill:#9cf,stroke:#333,stroke-width:2px
    classDef decision fill:#fcf,stroke:#333,stroke-width:2px
    classDef error fill:#f9c,stroke:#c96,stroke-width:2px

    class Start,Finish startEnd
    class Upload,Process,AIAnalysis,Store,Display,Speech,Register,SendOTP,CreateAccount,Save process
    class Login,Auth,Validate,Actions,VerifyOTP decision
    class Error error
```

## 🔄 Process Flow

The X-ray Analysis Portal follows a structured workflow:

### 1. User Authentication

- **New Users**:
  - Register account
  - Verify email with OTP
  - Create account on verification
- **Existing Users**:
  - Direct login
  - Authentication check
  - Dashboard access

### 2. X-ray Analysis Process

- Upload X-ray image
- Validate format and size
- Process through AI model
- Generate detailed analysis

### 3. User Actions

- View analysis results
- Listen to text-to-speech
- Start new analysis
- Exit system

### 4. Error Handling

- Image validation checks
- Authentication verification
- Process monitoring
- Error recovery options

The system ensures a smooth user experience with comprehensive error handling and multiple output options.

---

Built with ❤️ in Timor-Leste 🇹🇱
