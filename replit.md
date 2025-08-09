# Overview

This is a modern React web application built with TypeScript and Vite, designed as a deployment dashboard for GitHub Pages. The application features a clean, professional interface for managing project deployments with real-time status monitoring and configuration management. It uses a full-stack architecture with Express.js backend and comprehensive UI components for a polished user experience.

# User Preferences

Preferred communication style: Simple, everyday language.

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