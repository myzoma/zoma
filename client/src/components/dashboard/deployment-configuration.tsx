import { Settings2, CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DeploymentConfiguration() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <Settings2 className="w-5 h-5 text-github-primary" />
          <span>Deployment Configuration</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure your GitHub Pages deployment settings
        </p>
      </div>
      <div className="p-6 space-y-6">
        {/* Repository Settings */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Repository Settings</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="repo-name" className="text-sm font-medium mb-2">
                Repository Name
              </Label>
              <Input
                id="repo-name"
                type="text"
                defaultValue="vi2-clean"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="base-path" className="text-sm font-medium mb-2">
                Base Path
              </Label>
              <Input
                id="base-path"
                type="text"
                placeholder="/vi2-clean"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Vite Configuration */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Vite Configuration</h3>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <pre className="text-sm font-mono overflow-x-auto">
              <code className="text-github-primary">
{`// vite.config.ts
export default defineConfig({
  base: '/vi2-clean/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets'
  }
});`}
              </code>
            </pre>
          </div>
          <div className="flex items-center space-x-2 text-sm text-github-success">
            <CheckCircle className="w-4 h-4" />
            <span>Configuration updated automatically</span>
          </div>
        </div>

        {/* GitHub Actions Workflow */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">GitHub Actions Workflow</h3>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <pre className="text-sm font-mono overflow-x-auto">
              <code className="text-github-secondary">
{`# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install && npm run build
      - uses: peaceiris/actions-gh-pages@v3`}
              </code>
            </pre>
          </div>
          <Button className="w-full sm:w-auto bg-github-secondary hover:bg-purple-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Generate Workflow File
          </Button>
        </div>
      </div>
    </div>
  );
}
