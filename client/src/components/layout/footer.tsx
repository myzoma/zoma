import { Link } from "wouter";
import { Heart, Shield, FileText, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* القسم الرئيسي */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* معلومات الموقع */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-sky-500 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">
                <span className="text-yellow-500">YASER</span>{" "}
                <span className="text-sky-500">CRYPTO</span>
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
              منصة متخصصة في تحليل العملات المشفرة باستخدام نظرية موجات إليوت المتقدمة. 
              نوفر بيانات حقيقية من أفضل المنصات العالمية مع إشارات تداول دقيقة.
            </p>
            
            {/* رابط الدعم */}
            <a 
              href="https://buy.stripe.com/test_aFa00j9CSfHn3NV4an97G03" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition-colors text-sm font-medium"
            >
              <Heart className="h-4 w-4 ml-2 animate-pulse" />
              ادعم المطور
            </a>
          </div>

          {/* روابط سريعة */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors flex items-center">
                  <Info className="h-3 w-3 ml-2" />
                  حول المشروع
                </Link>
              </li>
            </ul>
          </div>

          {/* السياسات والشروط */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">السياسات</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors flex items-center">
                  <Shield className="h-3 w-3 ml-2" />
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-sm transition-colors flex items-center">
                  <FileText className="h-3 w-3 ml-2" />
                  شروط الخدمة
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        {/* القسم السفلي */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <span>© 2025 YASER CRYPTO. جميع الحقوق محفوظة.</span>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <div className="text-xs text-gray-500 dark:text-gray-500 text-center md:text-right">
              <p className="mb-1">
                <strong className="text-amber-600 dark:text-amber-400">تحذير:</strong> التداول ينطوي على مخاطر عالية
              </p>
              <p>
                المحتوى لأغراض تعليمية فقط - ليس نصيحة استثمارية
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}