import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Shield, TrendingUp } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl" dir="rtl">
      <Card className="shadow-container">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-sky-400 bg-clip-text text-transparent">
            شروط الخدمة
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            آخر تحديث: {new Date().toLocaleDateString('ar')}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">مقدمة</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              أهلاً بك في YASER CRYPTO، منصة متخصصة في تحليل العملات المشفرة باستخدام نظرية موجات إليوت. 
              باستخدام هذا الموقع، فإنك توافق على الالتزام بهذه الشروط والأحكام. يرجى قراءتها بعناية قبل استخدام خدماتنا.
            </p>
          </section>

          <Separator />

          <section>
            <div className="flex items-center mb-4">
              <TrendingUp className="h-6 w-6 text-green-500 ml-2" />
              <h2 className="text-2xl font-bold">طبيعة الخدمة</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                YASER CRYPTO يقدم:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                <li>تحليل العملات المشفرة باستخدام نظرية موجات إليوت</li>
                <li>بيانات السوق المباشرة من مصادر موثقة (OKX، Binance)</li>
                <li>مستويات فيبوناتشي والنماذج الفنية</li>
                <li>إشارات التداول المستندة للتحليل الفني</li>
                <li>تتبع أفضل 100 عملة مشفرة مرتبة حسب القيمة السوقية</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <div className="flex items-center mb-4">
              <AlertTriangle className="h-6 w-6 text-amber-500 ml-2" />
              <h2 className="text-2xl font-bold">تحذير مهم - مخاطر الاستثمار</h2>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg p-6 space-y-4">
              <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200">إخلاء مسؤولية:</h3>
              <ul className="list-disc list-inside space-y-2 text-amber-700 dark:text-amber-300 mr-4">
                <li><strong>ليس نصيحة استثمارية:</strong> المحتوى المقدم لأغراض تعليمية ومعلوماتية فقط</li>
                <li><strong>مخاطر عالية:</strong> تداول العملات المشفرة ينطوي على مخاطر كبيرة قد تؤدي لخسارة كامل رأس المال</li>
                <li><strong>تقلبات شديدة:</strong> أسعار العملات المشفرة شديدة التقلب وغير متوقعة</li>
                <li><strong>لا ضمانات:</strong> لا نضمن دقة التحليلات أو الأرباح</li>
                <li><strong>مسؤوليتك الشخصية:</strong> أي قرارات استثمارية تتخذها هي مسؤوليتك الكاملة</li>
              </ul>
              <p className="text-amber-800 dark:text-amber-200 font-semibold">
                استشر مستشار مالي مؤهل قبل اتخاذ أي قرارات استثمارية.
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">الاستخدام المسموح</h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">يمكنك:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                <li>استخدام الموقع للأغراض التعليمية والبحثية</li>
                <li>الاطلاع على تحليلات موجات إليوت</li>
                <li>تتبع أداء العملات المشفرة</li>
                <li>مشاركة المحتوى مع ذكر المصدر</li>
              </ul>

              <h3 className="text-xl font-semibold mb-2 mt-6">ممنوع عليك:</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                <li>نسخ أو سرقة المحتوى دون إذن</li>
                <li>استخدام الموقع لأنشطة غير قانونية</li>
                <li>محاولة اختراق أو إتلاف الموقع</li>
                <li>إرسال محتوى مسيء أو ضار</li>
                <li>استخدام أدوات أو برامج آلية للوصول للموقع</li>
                <li>إعادة بيع أو توزيع المحتوى تجارياً</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">دقة البيانات</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                نسعى لتقديم بيانات دقيقة ومحدثة، لكننا لا نضمن:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                <li>الدقة الكاملة للبيانات في كل الأوقات</li>
                <li>استمرارية الخدمة دون انقطاع</li>
                <li>صحة جميع التحليلات المقدمة</li>
                <li>عدم وجود أخطاء في البرمجيات</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                البيانات مستمدة من مصادر خارجية (OKX، Binance) وقد تختلف عن مصادر أخرى.
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">الملكية الفكرية</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                جميع المحتويات على YASER CRYPTO محمية بحقوق الطبع والنشر:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                <li>خوارزميات التحليل المطورة خصيصاً</li>
                <li>واجهة المستخدم والتصميم</li>
                <li>النصوص والتحليلات</li>
                <li>الشعار والهوية البصرية</li>
              </ul>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                "YASER CRYPTO" هو علامة تجارية مسجلة ولا يجوز استخدامها دون إذن مكتوب.
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <div className="flex items-center mb-4">
              <Shield className="h-6 w-6 text-blue-500 ml-2" />
              <h2 className="text-2xl font-bold">إخلاء المسؤولية</h2>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                YASER CRYPTO وفريق العمل غير مسؤولين عن:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                <li>أي خسائر مالية نتيجة استخدام المعلومات المقدمة</li>
                <li>قرارات الاستثمار المتخذة بناءً على التحليلات</li>
                <li>انقطاع الخدمة أو الأخطاء التقنية</li>
                <li>تغييرات السوق المفاجئة أو غير المتوقعة</li>
                <li>أضرار مباشرة أو غير مباشرة من استخدام الموقع</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">سياسة الاسترداد</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              الموقع مجاني حالياً ولا توجد رسوم. في حال إضافة خدمات مدفوعة مستقبلاً، 
              سيتم إشعاركم بسياسة الاسترداد المطبقة.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">الإعلانات</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                نستخدم Google AdSense لعرض إعلانات تمول الموقع:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                <li>الإعلانات قد تكون مخصصة بناءً على اهتماماتك</li>
                <li>لا نتحكم في محتوى الإعلانات الخارجية</li>
                <li>النقر على الإعلانات خاضع لشروط المعلنين</li>
                <li>يمكنك إلغاء الإعلانات المخصصة من إعدادات Google</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">تعديل الشروط</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إشعاركم بالتغييرات المهمة من خلال:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4 mt-4">
              <li>إشعار بارز على الموقع</li>
              <li>تحديث تاريخ "آخر تحديث" في أعلى الصفحة</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
              استمرار استخدامك للموقع يعني موافقتك على الشروط المحدثة.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">القانون المطبق</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              هذه الشروط محكومة بالقوانين المحلية المعمول بها. أي نزاعات ستحل عبر الطرق الودية أولاً، 
              وفي حال تعذر ذلك، ستُحال للجهات القضائية المختصة.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">معلومات الاتصال</h2>
            <div className="bg-gradient-to-r from-amber-50 to-sky-50 dark:from-amber-950/30 dark:to-sky-950/30 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                لأي استفسارات حول شروط الخدمة أو الموقع:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>اسم الموقع:</strong> <span className="font-bold bg-gradient-to-r from-amber-500 to-sky-500 bg-clip-text text-transparent">YASER CRYPTO</span></li>
                <li><strong>التخصص:</strong> تحليل العملات المشفرة بنظرية موجات إليوت المتقدمة</li>
                <li><strong>نوع الخدمة:</strong> تحليل فني مجاني مع بيانات حقيقية</li>
                <li><strong>آخر تحديث:</strong> {new Date().toLocaleDateString('ar')}</li>
              </ul>
            </div>
          </section>

          <section className="text-center pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              شكراً لاستخدام YASER CRYPTO - منصتك المتخصصة في تحليل العملات المشفرة
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}