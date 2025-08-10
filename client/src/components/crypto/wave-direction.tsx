import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target, Zap } from "lucide-react";
// @ts-ignore
import ElliottWaveAnalyzer from "@/lib/elliottWaveAnalyzer.js";
import { useAnalysisState } from "@/hooks/use-analysis-state";

interface WaveDirectionProps {
  currentWave?: {
    currentWave: string;
    direction: string;
    expectedTarget: number;
    expectedLength: number;
    completion: number;
    nextWave: string;
    confidence: number;
  } | null;
  currentPrice?: number;
}

interface WaveDirectionProps {
  currentWave?: {
    currentWave: string;
    direction: string;
    expectedTarget: number;
    expectedLength: number;
    completion: number;
    nextWave: string;
    confidence: number;
  } | null;
  currentPrice?: number;
  selectedCrypto?: string;
  timeFrame?: string;
}

export function WaveDirection({ 
  currentWave: propCurrentWave, 
  currentPrice: propCurrentPrice
}: WaveDirectionProps) {
  const { selectedCrypto, timeFrame } = useAnalysisState();
  const [waveData, setWaveData] = useState<any>(null);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [currentWave, setCurrentWave] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // جلب البيانات الحقيقية من OKX API للعملة المختارة
  const fetchWaveData = async (crypto: string, tf: string) => {
    setIsLoading(true);
    try {
      // تحويل رمز العملة إلى تنسيق OKX
      const okxSymbol = crypto.replace('/', '-');
      
      // تحديد فترة الشموع حسب الإطار الزمني
      const barMap: { [key: string]: string } = {
        '1h': '1H',
        '4h': '4H', 
        '1d': '1D',
        '1w': '1W'
      };
      
      const bar = barMap[tf] || '4H';

      // جلب البيانات التاريخية من OKX
      const response = await fetch(
        `https://www.okx.com/api/v5/market/history-candles?instId=${okxSymbol}&bar=${bar}&limit=100`,
        {
          headers: {
            'Accept': 'application/json',
          }
        }
      );

      if (!response.ok) return;

      const result = await response.json();
      if (result.code !== '0' || !result.data) return;

      // تحويل البيانات إلى التنسيق المطلوب
      const candleData = result.data.map((candle: any) => ({
        time: parseInt(candle[0]),
        open: parseFloat(candle[1]),
        high: parseFloat(candle[2]),
        low: parseFloat(candle[3]),
        close: parseFloat(candle[4]),
        volume: parseFloat(candle[5])
      })).reverse();

      console.log(`تم جلب ${candleData.length} شمعة حقيقية من OKX لـ ${crypto}`);

      // تحليل موجات إليوت
      const analyzer = new ElliottWaveAnalyzer();
      const analysis = analyzer.analyze(candleData);

      if (analysis.success && analysis.patterns && analysis.patterns.length > 0) {
        const latestPattern = analysis.patterns[analysis.patterns.length - 1];
        const price = candleData[candleData.length - 1].close;
        
        setCurrentPrice(price);
        setWaveData(analysis);
        
        // تحديد الموجة الحالية
        const currentWaveInfo = analyzer.getCurrentWaveDirection(analysis.patterns, price);
        setCurrentWave(currentWaveInfo);
      }
    } catch (error) {
      console.error('خطأ في جلب بيانات الموجة:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // جلب البيانات عند تغيير العملة أو الإطار الزمني
    if (selectedCrypto && timeFrame) {
      // تأخير طلب اتجاه الموجة لتجنب التحميل الزائد على البداية
      const timeout = setTimeout(() => {
        fetchWaveData(selectedCrypto, timeFrame);
      }, 4000);
      
      return () => clearTimeout(timeout);
    }
  }, [selectedCrypto, timeFrame]);

  // استخدام البيانات المممررة إذا كانت متوفرة، وإلا استخدام البيانات المحلية
  const finalCurrentWave = propCurrentWave || currentWave;
  const finalCurrentPrice = propCurrentPrice || currentPrice;

  if (!finalCurrentWave) {
    return (
      <Card className="shadow-container card-enhanced">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-left flex items-center justify-start gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            اتجاه الموجة الحالية
          </CardTitle>
          <CardDescription className="text-right text-sm text-gray-500 dark:text-gray-400">
            {selectedCrypto} - {timeFrame}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 dark:text-gray-400 py-4">
            {isLoading ? "جاري تحليل البيانات..." : "لا توجد بيانات موجة متاحة"}
          </div>
        </CardContent>
      </Card>
    );
  }

  const isUpward = finalCurrentWave.direction === 'صاعد';
  const completionColor = finalCurrentWave.completion >= 80 ? 'text-red-500' : 
                         finalCurrentWave.completion >= 50 ? 'text-yellow-500' : 'text-green-500';

  return (
    <Card className="shadow-container card-enhanced">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-left flex items-center justify-start gap-2">
          <Zap className="h-5 w-5 text-blue-500" />
          اتجاه الموجة الحالية
        </CardTitle>
        <CardDescription className="text-right text-sm text-gray-500 dark:text-gray-400">
          {selectedCrypto} - {timeFrame}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* الموجة الحالية */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge 
              variant={finalCurrentWave.currentWave.match(/[ABC]/) ? "secondary" : "default"}
              className="text-lg px-3 py-1"
            >
              موجة {finalCurrentWave.currentWave}
            </Badge>
            {isUpward ? (
              <TrendingUp className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-500" />
            )}
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">الموجة الحالية</div>
          </div>
        </div>

        {/* الاتجاه */}
        <div className="flex items-center justify-between">
          <span className={`font-semibold ${isUpward ? 'text-green-500' : 'text-red-500'}`}>
            {finalCurrentWave.direction}
          </span>
          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            الاتجاه المتوقع
          </div>
        </div>

        {/* الهدف المتوقع */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-blue-500" />
            <span className="font-mono text-sm">
              ${finalCurrentWave.expectedTarget.toLocaleString()}
            </span>
          </div>
          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            الهدف المتوقع
          </div>
        </div>

        {/* المسافة المتبقية */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm">
            ${finalCurrentWave.expectedLength.toLocaleString()}
          </span>
          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            المسافة المتبقية
          </div>
        </div>

        {/* نسبة الاكتمال */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className={`font-semibold ${completionColor}`}>
              {finalCurrentWave.completion.toFixed(1)}%
            </span>
            <div className="text-right text-sm text-gray-500 dark:text-gray-400">
              نسبة اكتمال الموجة
            </div>
          </div>
          <Progress 
            value={finalCurrentWave.completion} 
            className="h-2 bg-gray-200 dark:bg-gray-700"
          />
        </div>

        {/* الموجة التالية */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="px-2 py-1">
            {finalCurrentWave.nextWave}
          </Badge>
          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            الموجة التالية
          </div>
        </div>

        {/* مستوى الثقة */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full mr-1 ${
                    i < Math.round(finalCurrentWave.confidence / 20)
                      ? 'bg-yellow-500'
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">
              {finalCurrentWave.confidence.toFixed(0)}%
            </span>
          </div>
          <div className="text-right text-sm text-gray-500 dark:text-gray-400">
            مستوى الثقة
          </div>
        </div>

        {/* السعر الحالي */}
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="font-mono text-lg font-semibold text-blue-600 dark:text-blue-400">
              ${finalCurrentPrice.toLocaleString()}
            </span>
            <div className="text-right text-sm text-gray-500 dark:text-gray-400">
              السعر الحالي
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}