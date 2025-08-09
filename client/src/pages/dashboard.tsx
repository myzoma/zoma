import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProjectOverview } from "@/components/dashboard/project-overview";
import { DeploymentConfiguration } from "@/components/dashboard/deployment-configuration";
import { DeploymentChecklist } from "@/components/dashboard/deployment-checklist";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProjectOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <DeploymentConfiguration />
            <DeploymentChecklist />
          </div>
          
          <div>
            <DashboardSidebar />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
