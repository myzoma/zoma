import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings2, Save, RefreshCw, Github, ExternalLink } from "lucide-react";

export default function Settings() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Configure your deployment and project settings
          </p>
        </div>

        <div className="space-y-6">
          {/* GitHub Repository Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Github className="w-5 h-5 text-github-primary" />
                <span>GitHub Repository</span>
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">GitHub Username</Label>
                  <Input 
                    id="username" 
                    defaultValue="myzoma" 
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="repository">Repository Name</Label>
                  <Input 
                    id="repository" 
                    defaultValue="vi2-main" 
                    className="mt-2"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="branch">Default Branch</Label>
                <Select defaultValue="main">
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">main</SelectItem>
                    <SelectItem value="master">master</SelectItem>
                    <SelectItem value="develop">develop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Build Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold flex items-center space-x-2">
                <Settings2 className="w-5 h-5 text-github-success" />
                <span>Build Configuration</span>
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <Label htmlFor="base-path">Base Path</Label>
                <Input 
                  id="base-path" 
                  defaultValue="/vi2-main/" 
                  placeholder="/repository-name/"
                  className="mt-2"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  The base path for your GitHub Pages deployment
                </p>
              </div>
              
              <div>
                <Label htmlFor="build-command">Build Command</Label>
                <Input 
                  id="build-command" 
                  defaultValue="vite build --config vite.config.github.ts" 
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="output-dir">Output Directory</Label>
                <Input 
                  id="output-dir" 
                  defaultValue="dist/public" 
                  className="mt-2"
                />
              </div>
            </div>
          </div>

          {/* Deployment Settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold">Deployment Options</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-deploy">Auto Deploy</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically deploy when changes are pushed to main branch
                  </p>
                </div>
                <Switch id="auto-deploy" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pr-previews">PR Previews</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Generate preview deployments for pull requests
                  </p>
                </div>
                <Switch id="pr-previews" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Build Notifications</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive notifications for deployment status
                  </p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
            </div>
          </div>

          {/* Environment Variables */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold">Environment Variables</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="env-key">Variable Name</Label>
                    <Input 
                      id="env-key" 
                      placeholder="REACT_APP_API_URL" 
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="env-value">Value</Label>
                    <Input 
                      id="env-value" 
                      placeholder="https://api.example.com" 
                      className="mt-2"
                    />
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Add Variable
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> Environment variables must be prefixed with REACT_APP_ to be accessible in the browser.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-github-primary hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://github.com/myzoma/vi2-main/settings', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              GitHub Settings
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}