# Vi2-Clean - Modern React Deployment Dashboard

A comprehensive React TypeScript application optimized for GitHub Pages deployment, featuring a modern dashboard interface for managing project deployments.

## 🚀 Features

- **Modern UI**: Built with React 18, TypeScript, and Tailwind CSS
- **Dark/Light Theme**: Automatic theme switching with system preference detection
- **Deployment Dashboard**: Complete interface for managing GitHub Pages deployments
- **GitHub Actions Integration**: Automated build and deployment workflows
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Component Library**: Radix UI primitives with shadcn/ui components
- **State Management**: TanStack Query for efficient data fetching and caching

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling
- **Radix UI** + **shadcn/ui** for accessible components
- **Wouter** for lightweight routing
- **TanStack Query** for state management

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** with PostgreSQL
- **Neon Database** for serverless PostgreSQL

### Development Tools
- **ESBuild** for server bundling
- **PostCSS** with Autoprefixer
- **TypeScript** for type safety

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── ui/       # shadcn/ui components
│   │   │   ├── layout/   # Header, Footer components
│   │   │   └── dashboard/ # Dashboard-specific components
│   │   ├── pages/        # Application pages
│   │   ├── lib/          # Utilities and configurations
│   │   └── hooks/        # Custom React hooks
│   └── index.html        # Main HTML template
├── server/               # Backend Express application
├── shared/               # Shared TypeScript schemas
├── .github/workflows/    # GitHub Actions workflows
└── dist/                 # Build output directory
```

## 🚀 Quick Start

### Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/myzoma/vi2-main.git
   cd vi2-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

### GitHub Pages Deployment

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as the source

2. **Configure base path**
   The application is configured for GitHub Pages deployment with base path `/vi2-main/`

3. **Deploy**
   - Push changes to the `main` branch
   - GitHub Actions will automatically build and deploy

## 🔧 Configuration

### Vite Configuration

The project includes two Vite configurations:

- `vite.config.ts`: Development configuration
- `vite.config.github.ts`: Production configuration for GitHub Pages

### Environment Variables

Create a `.env` file for local development:

```env
DATABASE_URL=your_postgres_connection_string
NODE_ENV=development
```

## 📦 Build and Deployment

### Local Build
```bash
npm run build
```

### GitHub Pages Build
```bash
vite build --config vite.config.github.ts
```

## 🎨 Theme System

The application features a comprehensive theme system:

- **Light/Dark modes** with automatic system detection
- **CSS Custom Properties** for consistent theming
- **GitHub-inspired color palette**
- **Smooth transitions** between themes

## 🔗 Key Components

### Dashboard Components
- **ProjectOverview**: Status cards and deployment metrics
- **DeploymentConfiguration**: Vite and GitHub Actions setup
- **DeploymentChecklist**: Step-by-step deployment guide
- **DashboardSidebar**: Quick actions and project information

### Layout Components
- **Header**: Navigation with theme toggle
- **Footer**: Project links and information
- **ThemeProvider**: Context for theme management

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Flexible grid layouts
- Collapsible navigation
- Touch-friendly interactions

## 🚀 Performance

- **Code splitting** with dynamic imports
- **Tree shaking** for optimal bundle size
- **Asset optimization** with Vite
- **Cached dependencies** with React Query

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - Component primitives
- [shadcn/ui](https://ui.shadcn.com/) - Component library

---

Built with ❤️ using modern web technologies