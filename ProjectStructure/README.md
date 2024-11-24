## 📁 Project Structure

```
personal-x-ray/
├── app/                       # Next.js 14 app directory
│   ├── api/                   # API routes
│   │   ├── analyze/           # X-ray analysis endpoints
│   │   └── auth/              # Authentication endpoints
│   │       ├── login/         # Login handling
│   │       ├── logout/        # Logout handling
│   │       ├── register/      # User registration
│   │       ├── user/          # User data management
│   │       └── verify-otp/    # OTP verification
│   └── components/            # React components
│       |── ui/                # UI components
│       |   ├── button.tsx     # Button component
│       |   ├── input.tsx      # Input component
│       |  └── progress.tsx   # Progress bar component
│       |── Footer.tsx         # Footer components
│       └── Navbar.tsx         # Navbar components
├── lib/                       # Utility libraries
│   ├── auth.ts               # Authentication utilities
│   ├── db.ts                 # Database configuration
│   ├── email.ts              # Email service setup
│   └── utils.ts              # General utilities
├── public/                   # Static files
│   ├── images/              # Image assets
│   │   ├── logo.png        # Site logo
│   │   └── ajito.jpg       # Additional images
│   └── screenshots/        # Application screenshots
├── types/                   # TypeScript type definitions
│   ├── auth.ts             # Authentication types
│   ├── database.ts         # Database types
│   └── user.ts             # User-related types
├── database_setup/         # Database configuration
│   └── database_setup.sql  # SQL schema
├── System Architecture Diagram/ # Architecture documentation
│   └── README.md           # Architecture details
└── Flow Chart/             # Process flow documentation
    └── README.md           # Flow chart details
└── ProjectStructure/       # Project Structure documentation
    └── README.md           # Project Structure details
```

### 📂 Key Directories

#### `/app`

Next.js 14 application directory using the App Router:

- `api/`: Backend API routes
- `components/`: Reusable React components
- Pages:
  - `contact/`: Contact page
  - `features/`: Features showcase
  - `login/`: Authentication pages

#### `/lib`

Core utilities and configurations:

- `auth.ts`: JWT and authentication logic
- `db.ts`: Database connection setup
- `email.ts`: Email service configuration
- `utils.ts`: Helper functions

#### `/public`

Static assets and resources:

- `images/`: Image assets
- `screenshots/`: Application screenshots

#### `/types`

TypeScript type definitions:

- `auth.ts`: Authentication types
- `database.ts`: Database models
- `user.ts`: User interfaces

### 🔧 Configuration Files

- `.env.local`: Environment variables
- `next.config.ts`: Next.js configuration
- `tailwind.config.ts`: Tailwind CSS settings
- `tsconfig.json`: TypeScript configuration

### 📚 Documentation

- `System Architecture Diagram/`: System design documentation
- `Flow Chart/`: Process flow documentation
- `database_setup/`: Database schema and setup

### 🎯 Key Features Organization

1. **Authentication Module**

   ```
   app/api/auth/
   ├── login/
   ├── register/
   └── verify-otp/
   ```

2. **Core Components**

   ```
   app/components/ui/
   ├── button.tsx
   ├── input.tsx
   └── progress.tsx
   ```

3. **Utility Libraries**
   ```
   lib/
   ├── auth.ts
   ├── db.ts
   └── email.ts
   ```

### 🔐 Security Structure

- JWT authentication handling
- OTP verification system
- Secure API routes
- Protected middleware
- TypeScript type safety

### 📱 Frontend Organization

- Modular component structure
- Shared UI components
- Page-specific components
- Type-safe props and state

### 🗃️ Backend Organization

- API route separation
- Authentication middleware
- Database utilities
- Email services
