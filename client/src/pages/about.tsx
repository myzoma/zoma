import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, Target, Shield, Zap, Globe, Heart, BarChart3, Bot } from "lucide-react";

export default function About() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl" dir="rtl">
      <Card className="shadow-container">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">YASER</span>
            {" "}
            <span className="bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">CRYPTO</span>
          </CardTitle>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            تحليل متقدم يعتمد على نظرية موجات أليوت
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              تحليل فني متقدم
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              بيانات حقيقية مباشرة
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Bot className="h-3 w-3" />
              ذكاء اصطناعي
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <section>
            <div className="flex items-center mb-6">
              <Target className="h-6 w-6 text-amber-500 ml-2" />
              <h2 className="text-2xl font-bold">مهمتنا</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              نهدف إلى توفير منصة عربية متخصصة في تحليل العملات المشفرة باستخدام نظرية موجات إليوت، 
              مع تقديم بيانات حقيقية ومباشرة من أفضل منصات التداول العالمية. نساعد المتداولين والمستثمرين 
              العرب على اتخاذ قرارات مدروسة من خلال تحليلات فنية متقدمة وإشارات تداول دقيقة.
            </p>
          </section>

          <Separator />

          <section>
            <div className="flex items-center mb-6">
              <BarChart3 className="h-6 w-6 text-sky-500 ml-2" />
              <h2 className="text-2xl font-bold">ما يميز YASER CRYPTO؟</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">نظرية موجات إليوت المتقدمة</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      خوارزمية متطورة تحلل أنماط الموجات الخمسة التصحيحية والثلاث التصحيحية 
                      لتحديد نقاط الدخول والخروج المثلى.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">بيانات حقيقية من المصادر المؤثقة</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      نستقي البيانات مباشرة من منصات OKX و Binance لضمان الدقة والمصداقية، 
                      مع تحديث كل دقيقة.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">إشارات تداول لحظية</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      إشارات شراء وبيع مبنية على التحليل الفني الحقيقي مع مستويات فيبوناتشي 
                      ومؤشرات الثقة.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">أفضل 100 عملة مشفرة</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      تغطية شاملة لأهم العملات المشفرة مرتبة حسب القيمة السوقية 
                      مع إمكانية البحث والفلترة.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">واجهة عربية محسّنة</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      تصميم RTL مثالي مع ألوان هوية مميزة وتجربة مستخدم سلسة 
                      للمتحدثين بالعربية.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg">
                    <Bot className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">ذكاء اصطناعي متطور</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      خوارزميات تعلم آلي تحسن من دقة التنبؤات وتتكيف مع تقلبات السوق.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-6">المميزات التقنية</h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-2 text-center">292+ خط من الكود</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  خوارزمية Elliott Wave Analyzer المتطورة
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-2 text-center">7 مستويات فيبوناتشي</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  من 0% إلى 100% مع جميع النسب الذهبية
                </p>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-2 text-center">تحديث كل دقيقة</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  بيانات مباشرة من OKX و Binance APIs
                </p>
              </Card>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-6">التقنيات المستخدمة</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Frontend</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">React TypeScript</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Shadcn/ui</Badge>
                  <Badge variant="outline">Lucide Icons</Badge>
                  <Badge variant="outline">Vite</Badge>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Backend & APIs</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Node.js Express</Badge>
                  <Badge variant="outline">OKX API</Badge>
                  <Badge variant="outline">Binance API</Badge>
                  <Badge variant="outline">Real-time Data</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                </div>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-6">إخلاء مسؤولية</h2>
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
              <p className="text-amber-800 dark:text-amber-200 leading-relaxed">
                <strong>تحذير:</strong> جميع التحليلات والإشارات المقدمة هي لأغراض تعليمية فقط وليست نصائح استثمارية. 
                تداول العملات المشفرة ينطوي على مخاطر عالية وقد تخسر كامل رأس مالك. 
                يُنصح بشدة بالاستعانة بمستشار مالي مؤهل قبل اتخاذ أي قرارات استثمارية.
              </p>
            </div>
          </section>

          <Separator />

          <section className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-red-500 ml-2" />
              <h2 className="text-2xl font-bold">دعم المطور</h2>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              إذا استفدت من YASER CRYPTO وأعجبك العمل المبذول، يمكنك دعم استمرارية المشروع وتطويره
            </p>
            <a 
              href="https://buy.stripe.com/test_aFa00j9CSfHn3NV4an97G03" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg hover:from-pink-600 hover:to-red-600 transition-colors font-semibold"
            >
              <Heart className="h-5 w-5 ml-2 animate-pulse" />
              ادعم المشروع
            </a>
          </section>

          <section className="text-center pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              تم تطوير YASER CRYPTO بـ <Heart className="h-4 w-4 text-red-500 inline mx-1" /> في عام 2025
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}