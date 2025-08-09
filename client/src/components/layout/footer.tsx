import { Rocket, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const resources = [
    { name: "Documentation", href: "#" },
    { name: "GitHub Pages Guide", href: "#" },
    { name: "Vite Configuration", href: "#" },
    { name: "Deployment Tips", href: "#" },
  ];

  const support = [
    { name: "Community", href: "#" },
    { name: "Issues", href: "#" },
    { name: "Contributing", href: "#" },
    { name: "Changelog", href: "#" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-github-primary to-github-secondary rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Vi2-Clean</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              A modern React application with TypeScript, Vite, and Tailwind CSS, optimized for GitHub Pages deployment.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-github-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-github-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-github-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-github-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-github-primary transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 Vi2-Clean. Built with ❤️ and modern web technologies.
          </p>
          <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400 mt-4 sm:mt-0">
            <a href="#" className="hover:text-github-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-github-primary transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-github-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
