import { TrendingUp, Sun, Moon } from "lucide-react";
import { useTheme } from "../theme-provider";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50" style={{ fontFamily: 'Tajawal, Arial, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* أزرار التحكم في اليسار */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "light" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* اسم الموقع والوصف في اليمين للتخطيط العربي */}
          <div className="flex items-center space-x-4 text-right">
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-600 dark:text-gray-400">تحليل العملات الرقمية المتقدم</span>
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <span className="text-xl font-bold text-gray-900 dark:text-white">محلل موجات إليوت</span>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}