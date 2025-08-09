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
        <div className="flex items-center h-16 w-full" style={{ display: 'flex', justifyContent: 'space-between' }}>
          
          {/* اسم الموقع والوصف في اليمين للتخطيط العربي */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 hover:scale-105" style={{ flexDirection: 'row' }}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-slow">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col items-start text-right">
                <span className="text-xl font-bold text-gray-900 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  العملات الرقمية
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">تحليل متقدم</span>
              </div>
            </Link>
          </div>

          {/* أزرار التحكم في اليسار */}
          <div style={{ marginRight: 'auto', display: 'flex', alignItems: 'center' }}>
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

        </div>
      </div>
    </header>
  );
}