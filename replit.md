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
✓ **Wave Direction Feature**: Added current Elliott Wave direction indicator showing which wave (A, B, C or 1-5) price is heading toward with expected wave length, completion percentage, and next wave prediction
✓ **Dynamic Wave Analysis**: Wave direction component now syncs automatically with selected cryptocurrency in analysis panel
✓ **Daily Trading Signals**: Trading signals exclusively use daily (1D) timeframe instead of 4-hour, updating automatically when cryptocurrency selection changes
✓ **Unified State Management**: Complete synchronization between wave analysis, direction indicator, and trading signals using shared state system
✓ **Arabic Layout Optimization**: Proper right-to-left text alignment for all Arabic interface elements including wave direction title positioning
✓ **NaN% Bug Fix**: Resolved percentage display issues in wave analysis with proper null/undefined checks
✓ **Fibonacci Retracement Levels**: Complete 7-level Fibonacci implementation (0%, 23.6%, 38.2%, 50%, 61.8%, 78.6%, 100%) calculated from real Elliott Wave pattern data
✓ **Analysis Summary Tab**: Added comprehensive summary showing pattern count, average confidence, and strongest pattern details
✓ **Error-Free Operation**: Resolved all runtime errors with proper array validation before reduce operations
✓ **Top 100 Cryptocurrencies Integration**: Complete list of top 100 cryptocurrencies ranked by market cap with real-time data support
✓ **Compact Dropdown Interface**: Converted crypto selector to space-efficient dropdown with search and category filtering
✓ **Developer Support Link**: Added support donation link with animated heart icon positioned next to crypto selector
✓ **Dynamic Market Data**: Market data section now displays top 10 gainers and top 10 losers with interactive tabs for switching between categories
✓ **Real-time Market Movement**: Complete dynamic sorting by highest gains and biggest losses updated every minute with authentic OKX data
✓ **Google AdSense Ready**: Added comprehensive privacy policy, terms of service, about page, sitemap.xml, robots.txt, and SEO optimization
✓ **Professional Legal Pages**: Complete Arabic privacy policy with Google AdSense compliance, terms of service with investment disclaimers
✓ **SEO Optimization**: Full meta tags, Open Graph, Twitter Cards, canonical URLs, and structured data for better search engine visibility
✓ **Footer Navigation**: Professional footer with links to legal pages, support options, and proper copyright notices
✓ **Social Media Integration**: Added social media buttons (Binance, Twitter, Telegram) next to support button with proper branding colors and external link indicators

# User Preferences

Preferred communication style: Simple, everyday language.
RTL Layout Requirement: ALL Arabic websites must follow right-to-left (RTL) layout, opposite of English sites. This is a fundamental rule for Arabic web design.
Site Branding: Site name is "YASER CRYPTO" with "YASER" in golden color and "CRYPTO" in sky blue color, displayed in large English text.

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