import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, RefreshCw, AlertTriangle, Brain, Zap } from "lucide-react";

interface FearGreedData {
  value: number;
  value_classification: string;
  timestamp: number;
  time_until_update?: number;
}

export function FearGreedIndex() {
  const [fearGreedData, setFearGreedData] = useState<FearGreedData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // جلب بيانات مؤشر الخوف والطمع
  const fetchFearGreedIndex = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('جلب بيانات مؤشر الخوف والطمع...');
      
      // استخدام Alternative.me API للحصول على مؤشر الخوف والطمع
      const response = await fetch('https://api.alternative.me/fng/', {
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error(`Fear & Greed API Error: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.data && result.data[0]) {
        const data = result.data[0];
        setFearGreedData({
          value: parseInt(data.value),
          value_classification: data.value_classification,
          timestamp: parseInt(data.timestamp),
          time_until_update: data.time_until_update ? parseInt(data.time_until_update) : undefined
        });
        setLastUpdate(new Date().toLocaleTimeString('ar'));
        console.log('تم جلب مؤشر الخوف والطمع بنجاح:', data.value_classification, data.value);
      } else {
        throw new Error('Invalid Fear & Greed API response');
      }

    } catch (error) {
      console.error('خطأ في جلب مؤشر الخوف والطمع:', error);
      setError(error instanceof Error ? error.message : 'خطأ غير معروف');
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث البيانات عند تحميل المكون
  useEffect(() => {
    fetchFearGreedIndex();
    
    // تحديث البيانات كل 10 دقائق
    const interval = setInterval(fetchFearGreedIndex, 600000);
    
    return () => clearInterval(interval);
  }, []);

  // تحديد اللون والأيقونة بناءً على القيمة
  const getIndexStatus = (value: number, classification: string) => {
    if (value >= 75) {
      return {
        color: "text-red-600",
        bgColor: "bg-red-100 dark:bg-red-900/20",
        borderColor: "border-red-200 dark:border-red-800",
        icon: TrendingUp,
        arabicLabel: "طمع شديد",
        description: "السوق في حالة طمع شديد - قد يكون وقت مناسب للبيع"
      };
    } else if (value >= 55) {
      return {
        color: "text-orange-600",
        bgColor: "bg-orange-100 dark:bg-orange-900/20",
        borderColor: "border-orange-200 dark:border-orange-800",
        icon: TrendingUp,
        arabicLabel: "طمع",
        description: "السوق في حالة طمع - توخي الحذر"
      };
    } else if (value >= 45) {
      return {
        color: "text-yellow-600",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
        borderColor: "border-yellow-200 dark:border-yellow-800",
        icon: Brain,
        arabicLabel: "محايد",
        description: "السوق في حالة متوازنة"
      };
    } else if (value >= 25) {
      return {
        color: "text-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
        borderColor: "border-blue-200 dark:border-blue-800",
        icon: TrendingDown,
        arabicLabel: "خوف",
        description: "السوق في حالة خوف - قد تكون فرصة شراء"
      };
    } else {
      return {
        color: "text-green-600",
        bgColor: "bg-green-100 dark:bg-green-900/20",
        borderColor: "border-green-200 dark:border-green-800",
        icon: TrendingDown,
        arabicLabel: "خوف شديد",
        description: "السوق في حالة خوف شديد - فرصة ذهبية للشراء"
      };
    }
  };

  if (isLoading) {
    return (
      <Card className="shadow-container card-enhanced">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-500" />
            مؤشر الخوف والطمع
          </CardTitle>
          <CardDescription>تحليل المشاعر العامة للسوق</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-24">
            <RefreshCw className="h-6 w-6 animate-spin text-purple-500" />
            <span className="mr-2 text-gray-600 dark:text-gray-400">جاري التحميل...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-container card-enhanced border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            مؤشر الخوف والطمع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchFearGreedIndex}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!fearGreedData) return null;

  const status = getIndexStatus(fearGreedData.value, fearGreedData.value_classification);
  const Icon = status.icon;

  return (
    <Card className={`shadow-container card-enhanced ${status.borderColor}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-500" />
            مؤشر الخوف والطمع
          </div>
          <Badge variant="outline" className={`${status.color} ${status.bgColor}`}>
            {status.arabicLabel}
          </Badge>
        </CardTitle>
        <CardDescription>
          تحليل المشاعر العامة للسوق • آخر تحديث: {lastUpdate}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* عرض القيمة الرئيسية */}
        <div className="flex items-center justify-center">
          <div className={`p-6 rounded-xl ${status.bgColor} ${status.borderColor} border-2`}>
            <div className="flex items-center justify-center space-x-4">
              <Icon className={`h-8 w-8 ${status.color}`} />
              <div className="text-center">
                <div className={`text-4xl font-bold ${status.color}`}>
                  {fearGreedData.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  من 100
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* شريط المؤشر المرئي */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>خوف شديد</span>
            <span>محايد</span>
            <span>طمع شديد</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
              style={{ width: '100%' }}
            />
            <div 
              className="absolute top-0 h-full w-1 bg-white border border-gray-800 rounded-full"
              style={{ left: `${fearGreedData.value}%`, transform: 'translateX(-50%)' }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>0</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>

        {/* الوصف والتفسير */}
        <div className={`p-4 rounded-lg ${status.bgColor}`}>
          <p className={`text-sm ${status.color} font-medium mb-2`}>
            {status.description}
          </p>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3" />
              <span>المؤشر يتراوح من 0 (خوف شديد) إلى 100 (طمع شديد)</span>
            </div>
          </div>
        </div>

        {/* تاريخ آخر تحديث */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400 border-t pt-2">
          تحديث البيانات: {new Date(fearGreedData.timestamp * 1000).toLocaleDateString('ar')}
        </div>
      </CardContent>
    </Card>
  );
}