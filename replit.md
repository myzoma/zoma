# Overview

This is a comprehensive cryptocurrency market analysis application built with React TypeScript and Vite, specializing in Elliott Wave Analysis theory for digital asset trading. The application provides advanced technical analysis tools for cryptocurrency markets using Elliott Wave patterns to generate trading insights and market predictions. It features real-time market data, wave pattern recognition, trading signals, and detailed Elliott Wave analysis with Fibonacci retracements.

## Recent Changes (August 2025)

✓ **Complete Application Restructure**: Rebuilt entire application as cryptocurrency Elliott Wave analyzer
✓ **Elliott Wave Integration**: Implemented complete Elliott Wave Analyzer with 292+ lines of sophisticated analysis logic
✓ **Real Data Integration**: All components now use authentic data from OKX and Binance APIs only
✓ **Historical Data Analysis**: Elliott Wave analysis runs on real historical candlestick data from OKX API
✓ **Authentic Trading Signals**: Trading signals generated from actual Elliott Wave pattern analysis (not simulated)
✓ **Wave Pattern Recognition**: Advanced pattern detection for motive (1-2-3-4-5) and corrective (A-B-C) waves
✓ **Arabic Interface**: Localized interface with Arabic language support for Middle Eastern users
✓ **Auto-Update System**: Data refreshes automatically every 3 minutes without manual intervention
✓ **Clean UI Design**: Neutral design with no colored backgrounds, professional appearance
✓ **Pattern Confidence Scoring**: Real confidence scoring from actual market pattern analysis
✓ **Mobile Responsive Design**: Fully responsive layout optimized for crypto trading on all devices
✓ **Dark Mode Default**: Dark theme set as default for professional crypto trading appearance
✓ **Security Enhancement**: Hidden admin navigation links to prevent content theft
✓ **Arabic Typography**: Clear Tajawal font implementation for optimal Arabic text readability
✓ **Magical UI Effects**: Enhanced visual experience with gradient colors and glowing animations
✓ **RTL Layout Implementation**: Complete right-to-left layout implementation following Arabic web design standards
✓ **Arabic Layout Rule**: Applied fundamental rule that ALL Arabic websites must follow RTL layout, opposite of English sites

# User Preferences

Preferred communication style: Simple, everyday language.
RTL Layout Requirement: ALL Arabic websites must follow right-to-left (RTL) layout, opposite of English sites. This is a fundamental rule for Arabic web design.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with CSS variables for theming and responsive design
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible interface
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Theme System**: Custom theme provider supporting light/dark modes with system preference detection

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Storage**: Dual storage interface with in-memory implementation (MemStorage) and database schema
- **Development**: Hot module replacement with Vite middleware integration
- **Session Management**: Express sessions with PostgreSQL store support

## Database Design
- **Database**: PostgreSQL with Neon serverless connection
- **Schema Management**: Drizzle Kit for migrations and schema management
- **User Schema**: Simple user table with UUID primary keys, username, and password fields
- **Validation**: Zod integration for runtime type validation and schema inference

## Development Workflow
- **Development Server**: Integrated Vite dev server with Express backend proxy
- **Build Process**: Separate client (Vite) and server (esbuild) build configurations
- **TypeScript**: Shared types between client and server via shared schema
- **Path Mapping**: Convenient imports with @ aliases for client code organization

## UI Architecture
- **Component Structure**: Modular dashboard components (project overview, deployment config, checklist, sidebar)
- **Layout System**: Responsive grid layouts with mobile-first design
- **Navigation**: Header with theme toggle and mobile-responsive navigation
- **Design System**: Consistent spacing, typography, and color schemes via CSS custom properties

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection for Neon database
- **drizzle-orm** and **drizzle-zod**: Type-safe database ORM with Zod validation
- **express** and **connect-pg-simple**: Web server framework with PostgreSQL session store

## Frontend UI Libraries
- **@radix-ui/***: Comprehensive set of accessible UI primitives (dialog, dropdown, toast, etc.)
- **@tanstack/react-query**: Server state management and data fetching
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Utility for managing component variants
- **lucide-react**: Icon library for consistent iconography

## Development Tools
- **vite**: Modern build tool with HMR and optimized bundling
- **typescript**: Static type checking and enhanced developer experience
- **wouter**: Lightweight routing library for single-page applications
- **date-fns**: Date manipulation and formatting utilities

## Build and Deployment
- **esbuild**: Fast bundler for server-side code compilation
- **postcss** and **autoprefixer**: CSS processing and vendor prefixing
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit environment