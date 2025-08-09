import { TrendingUp, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  const resources = [
    { name: "تحليل موجات إليوت", href: "#" },
    { name: "استراتيجيات التداول", href: "#" },
    { name: "إدارة المخاطر", href: "#" },
    { name: "التحليل الفني", href: "#" },
  ];

  const support = [
    { name: "المجتمع", href: "#" },
    { name: "الدعم الفني", href: "#" },
    { name: "الأسئلة الشائعة", href: "#" },
    { name: "اتصل بنا", href: "#" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16" style={{ fontFamily: 'Tajawal, Arial, sans-serif' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-yellow-500">ياسر</span>{" "}
                <span className="text-sky-500">كريبتو</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              منصة تحليل العملات الرقمية المتقدمة باستخدام نظرية موجات إليوت والبيانات الحقيقية من أسواق التداول العالمية.
            </p>
            <div className="flex flex-row-reverse gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">موارد التعلم</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {resources.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">الدعم والمساعدة</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="hover:text-blue-500 transition-colors"
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
            © 2025 محلل العملات الرقمية. جميع الحقوق محفوظة. مبني بتقنيات حديثة ❤️
          </p>
          <div className="flex flex-row-reverse gap-6 text-sm text-gray-600 dark:text-gray-400 mt-4 sm:mt-0">
            <a href="#" className="hover:text-blue-500 transition-colors">
              سياسة الخصوصية
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              شروط الاستخدام
            </a>
            <a href="#" className="hover:text-blue-500 transition-colors">
              ملفات تعريف الارتباط
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
