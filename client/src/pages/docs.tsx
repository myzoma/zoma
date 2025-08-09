import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink, Copy, Check, Terminal, Code2 } from "lucide-react";
import { useState } from "react";

export default function Documentation() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Terminal,
      content: [
        {
          title: "Quick Setup",
          description: "Get your project running in minutes",
          code: `# Clone the repository
git clone https://github.com/myzoma/vi2-main.git
cd vi2-main

# Install dependencies
npm install

# Start development server
npm run dev`,
          language: "bash"
        }
      ]
    },
    {
      id: "deployment",
      title: "Deployment",
      icon: Code2,
      content: [
        {
          title: "GitHub Pages Setup",
          description: "Configure automatic deployment to GitHub Pages",
          code: `# 1. Enable GitHub Pages in repository settings
# 2. Set source to "GitHub Actions"
# 3. Push to main branch to trigger deployment

# Manual build for GitHub Pages
vite build --config vite.config.github.ts`,
          language: "bash"
        },
        {
          title: "Vite Configuration",
          description: "Base path configuration for GitHub Pages",
          code: `// vite.config.github.ts
export default defineConfig({
  base: "/vi2-main/",
  plugins: [react()],
  build: {
    outDir: "dist/public",
    assetsDir: "assets"
  }
});`,
          language: "typescript"
        }
      ]
    }
  ];

  const features = [
    {
      title: "Modern React Stack",
      description: "Built with React 18, TypeScript, and Vite for optimal development experience",
      badge: "Frontend"
    },
    {
      title: "GitHub Actions CI/CD",
      description: "Automated deployment pipeline with GitHub Actions workflows",
      badge: "DevOps"
    },
    {
      title: "Responsive Design",
      description: "Mobile-first approach with Tailwind CSS and Radix UI components",
      badge: "UI/UX"
    },
    {
      title: "Theme System",
      description: "Light/dark mode with automatic system preference detection",
      badge: "Feature"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-3">
            <BookOpen className="w-8 h-8 text-github-primary" />
            <span>Documentation</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Complete guide to deploying and managing your React application
          </p>
        </div>

        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => window.open('https://github.com/myzoma/vi2-main', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                GitHub Repository
              </Button>
              <Button 
                variant="outline" 
                className="justify-start"
                onClick={() => window.open('https://myzoma.github.io/vi2-main/', '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Features Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Key Features</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-white">{feature.title}</h3>
                    <Badge variant="outline">{feature.badge}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documentation Sections */}
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <div key={section.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 mb-8">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold flex items-center space-x-2">
                  <IconComponent className="w-5 h-5 text-github-primary" />
                  <span>{section.title}</span>
                </h2>
              </div>
              <div className="p-6">
                {section.content.map((item, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                    
                    <div className="relative">
                      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm font-mono">
                          <code className={`language-${item.language}`}>{item.code}</code>
                        </pre>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 p-2"
                        onClick={() => copyToClipboard(item.code, `${section.id}-${index}`)}
                      >
                        {copiedCode === `${section.id}-${index}` ? (
                          <Check className="w-4 h-4 text-github-success" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Additional Resources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Additional Resources</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {["React 18", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "Express.js", "Drizzle ORM"].map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Useful Links</h3>
                <div className="space-y-2 text-sm">
                  <a href="https://vitejs.dev/guide/static-deploy.html#github-pages" className="text-github-primary hover:underline block">
                    Vite GitHub Pages Deployment Guide
                  </a>
                  <a href="https://docs.github.com/en/pages" className="text-github-primary hover:underline block">
                    GitHub Pages Documentation
                  </a>
                  <a href="https://tailwindcss.com/docs" className="text-github-primary hover:underline block">
                    Tailwind CSS Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}