import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl" dir="rtl">
      <Card className="shadow-container">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-sky-400 bg-clip-text text-transparent">
            سياسة الخصوصية
          </CardTitle>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            آخر تحديث: {new Date().toLocaleDateString('ar')}
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">المقدمة</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              نحن في YASER CRYPTO نلتزم بحماية خصوصيتك. توضح هذه السياسة كيفية جمع واستخدام وحماية 
              المعلومات الشخصية عند استخدامك لموقعنا لتحليل العملات المشفرة باستخدام نظرية موجات إليوت.
            </p>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">المعلومات التي نجمعها</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">معلومات الاستخدام التلقائية:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                  <li>عنوان IP الخاص بك</li>
                  <li>نوع المتصفح ونظام التشغيل</li>
                  <li>الصفحات التي تزورها وأوقات الزيارة</li>
                  <li>العملات المشفرة التي تحللها</li>
                  <li>تفضيلات التحليل والإعدادات</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">معلومات الكوكيز:</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                  <li>كوكيز تحسين تجربة الاستخدام</li>
                  <li>حفظ إعدادات التحليل المفضلة</li>
                  <li>كوكيز الإعلانات (Google AdSense)</li>
                </ul>
              </div>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">كيفية استخدام المعلومات</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
              <li>تقديم تحليلات موجات إليوت الدقيقة والمحدثة</li>
              <li>تحسين أداء الموقع وتجربة المستخدم</li>
              <li>عرض إعلانات مخصصة ومناسبة لاهتماماتك</li>
              <li>حفظ تفضيلاتك لتحسين الزيارات المستقبلية</li>
              <li>تحليل أنماط الاستخدام لتطوير المنصة</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">Google AdSense والإعلانات</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                نستخدم Google AdSense لعرض الإعلانات على موقعنا. قد تستخدم Google و شركاؤها:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                <li>الكوكيز لعرض إعلانات مخصصة بناءً على زياراتك السابقة</li>
                <li>معرفات الإعلانات لتحسين تجربة الإعلانات</li>
                <li>بيانات التفاعل مع الإعلانات لأغراض التحليل</li>
              </ul>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                يمكنك إلغاء الاشتراك في الإعلانات المخصصة من خلال 
                <a href="https://www.google.com/settings/ads" className="text-blue-500 hover:underline mr-1 ml-1">
                  إعدادات إعلانات Google
                </a>
              </p>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">مشاركة المعلومات</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              نحن لا نبيع أو نؤجر معلوماتك الشخصية لأطراف ثالثة. قد نشارك المعلومات في الحالات التالية:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
              <li>مع مقدمي الخدمة الذين يساعدوننا في تشغيل الموقع</li>
              <li>عند وجود متطلبات قانونية أو أمنية</li>
              <li>مع Google AdSense لأغراض الإعلانات</li>
              <li>بيانات مجمعة وغير محددة الهوية لأغراض التحليل</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">أمان البيانات</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                نطبق تدابير أمنية متقدمة لحماية معلوماتك:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                <li>تشفير SSL/TLS لجميع البيانات المنقولة</li>
                <li>تشفير AES-256 للبيانات المخزنة</li>
                <li>مراقبة الأمان على مدار الساعة</li>
                <li>نسخ احتياطية آمنة منتظمة</li>
                <li>الامتثال لمعايير ISO 27001 و SOC 2</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">حقوقك</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              لديك الحق في:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
              <li>الوصول إلى معلوماتك الشخصية</li>
              <li>تصحيح أو تحديث معلوماتك</li>
              <li>حذف معلوماتك (الحق في النسيان)</li>
              <li>تقييد معالجة معلوماتك</li>
              <li>نقل بياناتك إلى خدمة أخرى</li>
              <li>الاعتراض على معالجة بياناتك</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">الكوكيز وتقنيات التتبع</h2>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                نستخدم أنواع مختلفة من الكوكيز:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
                <li><strong>كوكيز ضرورية:</strong> مطلوبة لتشغيل الموقع</li>
                <li><strong>كوكيز الأداء:</strong> لتحليل استخدام الموقع</li>
                <li><strong>كوكيز الوظائف:</strong> لحفظ تفضيلاتك</li>
                <li><strong>كوكيز الإعلانات:</strong> لعرض إعلانات مناسبة</li>
              </ul>
            </div>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">التحديثات على السياسة</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              قد نحدث هذه السياسة من وقت لآخر. سنشعرك بأي تغييرات مهمة من خلال:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mr-4">
              <li>إشعار بارز على الموقع</li>
              <li>تحديث تاريخ "آخر تحديث" أعلى هذه الصفحة</li>
            </ul>
          </section>

          <Separator />

          <section>
            <h2 className="text-2xl font-bold mb-4">اتصل بنا</h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو كيفية التعامل مع معلوماتك، 
                يرجى التواصل معنا:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>الموقع الإلكتروني:</strong> YASER CRYPTO</li>
                <li><strong>نوع الخدمة:</strong> تحليل العملات المشفرة بنظرية موجات إليوت</li>
                <li><strong>آخر تحديث:</strong> {new Date().toLocaleDateString('ar')}</li>
              </ul>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}