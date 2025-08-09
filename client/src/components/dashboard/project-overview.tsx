import { Play, Settings, AlertCircle, Clock, Zap, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProjectOverview() {
  const statusCards = [
    {
      title: "Deployment Status",
      value: "Failed",
      description: "404 Error - Configuration needed",
      icon: AlertCircle,
      color: "text-github-error",
      bgColor: "bg-github-error",
      status: "error",
    },
    {
      title: "Build Status",
      value: "Pending",
      description: "Configuration required",
      icon: Clock,
      color: "text-github-warning",
      bgColor: "bg-github-warning",
      status: "warning",
    },
    {
      title: "Performance",
      value: "--",
      description: "Deploy to measure",
      icon: Zap,
      color: "text-github-warning",
      bgColor: "bg-github-warning",
      status: "pending",
    },
    {
      title: "Bundle Size",
      value: "~245KB",
      description: "Estimated gzipped",
      icon: Package,
      color: "text-github-success",
      bgColor: "bg-github-success",
      status: "success",
    },
  ];

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Project Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            React + TypeScript + Vite deployment to GitHub Pages
          </p>
        </div>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button className="bg-github-primary hover:bg-blue-700 text-white">
            <Play className="w-4 h-4 mr-2" />
            Deploy Now
          </Button>
          <Button variant="outline" className="border-gray-300 dark:border-gray-600">
            <Settings className="w-4 h-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Status Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statusCards.map((card) => {
          const IconComponent = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">{card.title}</h3>
                <div className="flex items-center space-x-2">
                  {card.status === "error" && (
                    <div className="w-3 h-3 bg-github-error rounded-full animate-pulse-slow"></div>
                  )}
                  {card.status === "warning" && (
                    <div className="w-3 h-3 bg-github-warning rounded-full"></div>
                  )}
                  {card.status === "success" && (
                    <IconComponent className={`w-5 h-5 ${card.color}`} />
                  )}
                  {card.status === "pending" && (
                    <IconComponent className={`w-5 h-5 ${card.color}`} />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
