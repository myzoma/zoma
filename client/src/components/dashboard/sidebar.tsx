import { RefreshCw, ExternalLink, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardSidebar() {
  const quickActions = [
    { label: "Fix Configuration", icon: RefreshCw, variant: "default" as const },
    { label: "View Repository", icon: ExternalLink, variant: "outline" as const },
    { label: "View Documentation", icon: BookOpen, variant: "outline" as const },
  ];

  const projectInfo = [
    { label: "Framework", value: "React + TypeScript + Vite" },
    { label: "UI Library", value: "Tailwind CSS + Radix UI" },
    { label: "Deployment", value: "GitHub Pages" },
    { label: "Last Modified", value: "2 hours ago" },
  ];

  const recentActivity = [
    { text: "Deployment failed", timestamp: "2 hours ago", status: "error" },
    { text: "Configuration updated", timestamp: "3 hours ago", status: "info" },
    { text: "Project initialized", timestamp: "1 day ago", status: "success" },
  ];

  const getActivityColor = (status: string) => {
    switch (status) {
      case "error":
        return "bg-github-error";
      case "info":
        return "bg-blue-500";
      case "success":
        return "bg-github-success";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
        </div>
        <div className="p-6 space-y-3">
          {quickActions.map((action) => {
            const IconComponent = action.icon;
            return (
              <Button
                key={action.label}
                variant={action.variant}
                className={`w-full justify-center ${
                  action.variant === "default"
                    ? "bg-github-primary hover:bg-blue-700 text-white"
                    : ""
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {action.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Project Information</h2>
        </div>
        <div className="p-6 space-y-4">
          {projectInfo.map((info) => (
            <div key={info.label}>
              <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {info.label}
              </dt>
              <dd className="text-sm text-gray-900 dark:text-white mt-1">{info.value}</dd>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="p-6 space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div
                className={`flex-shrink-0 w-2 h-2 ${getActivityColor(
                  activity.status
                )} rounded-full mt-2`}
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">{activity.text}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {activity.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
