import { ListChecks, X, Clock, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DeploymentChecklist() {
  const deploymentSteps = [
    {
      id: 1,
      title: "Configure Vite Base Path",
      description: "Update vite.config.ts with correct base path for GitHub Pages",
      status: "error",
      badge: { text: "Required", variant: "destructive" as const },
    },
    {
      id: 2,
      title: "Setup GitHub Actions",
      description: "Create deployment workflow for automated builds",
      status: "warning",
      badge: { text: "In Progress", variant: "secondary" as const },
    },
    {
      id: 3,
      title: "Configure GitHub Pages",
      description: "Enable GitHub Pages and select deployment source",
      status: "pending",
      badge: { text: "Pending", variant: "outline" as const },
    },
    {
      id: 4,
      title: "Test Deployment",
      description: "Verify application works correctly on GitHub Pages",
      status: "pending",
      badge: { text: "Pending", variant: "outline" as const },
    },
  ];

  const getStepIcon = (status: string) => {
    switch (status) {
      case "error":
        return <X className="w-4 h-4 text-white" />;
      case "warning":
        return <Clock className="w-4 h-4 text-white" />;
      default:
        return <Circle className="w-4 h-4 text-white" />;
    }
  };

  const getStepIconColor = (status: string) => {
    switch (status) {
      case "error":
        return "bg-github-error";
      case "warning":
        return "bg-github-warning";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold flex items-center space-x-2">
          <ListChecks className="w-5 h-5 text-github-success" />
          <span>Deployment Checklist</span>
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {deploymentSteps.map((step) => (
            <div
              key={step.id}
              className={`flex items-start space-x-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 ${
                step.status === "pending" ? "opacity-60" : ""
              }`}
            >
              <div
                className={`flex-shrink-0 w-6 h-6 ${getStepIconColor(
                  step.status
                )} rounded-full flex items-center justify-center mt-0.5`}
              >
                {getStepIcon(step.status)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 dark:text-white">{step.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {step.description}
                </p>
                <div className="mt-2">
                  <Badge variant={step.badge.variant}>{step.badge.text}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
