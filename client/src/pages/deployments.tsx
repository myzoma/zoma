import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, Clock, CheckCircle, XCircle, GitBranch } from "lucide-react";

export default function Deployments() {
  const deployments = [
    {
      id: 1,
      commit: "feat: Add deployment dashboard",
      hash: "a1b2c3d",
      branch: "main",
      status: "success",
      timestamp: "2 hours ago",
      duration: "2m 34s",
      url: "https://myzoma.github.io/vi2-main/",
    },
    {
      id: 2,
      commit: "fix: Update vite configuration",
      hash: "e4f5g6h",
      branch: "main", 
      status: "failed",
      timestamp: "4 hours ago",
      duration: "1m 12s",
      url: null,
    },
    {
      id: 3,
      commit: "docs: Update README with instructions",
      hash: "i7j8k9l",
      branch: "main",
      status: "building",
      timestamp: "6 hours ago",
      duration: "1m 45s",
      url: null,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-github-success" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-github-error" />;
      case "building":
        return <Clock className="w-5 h-5 text-github-warning animate-pulse" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-github-success text-white">Success</Badge>;
      case "failed":
        return <Badge className="bg-github-error text-white">Failed</Badge>;
      case "building":
        return <Badge className="bg-github-warning text-white">Building</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Deployments</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your GitHub Pages deployment history and status
            </p>
          </div>
          <Button className="bg-github-primary hover:bg-blue-700 text-white mt-4 sm:mt-0">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">Deployment History</h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {deployments.map((deployment) => (
              <div key={deployment.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {getStatusIcon(deployment.status)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {deployment.commit}
                        </h3>
                        {getStatusBadge(deployment.status)}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <GitBranch className="w-4 h-4" />
                          <span>{deployment.branch}</span>
                        </div>
                        <span>#{deployment.hash}</span>
                        <span>{deployment.timestamp}</span>
                        <span>Duration: {deployment.duration}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {deployment.url && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open(deployment.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}