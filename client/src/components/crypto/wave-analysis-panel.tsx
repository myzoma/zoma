import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, BarChart3, Activity, Target, AlertCircle } from "lucide-react";
// @ts-ignore
import ElliottWaveAnalyzer from "@/lib/elliottWaveAnalyzer.js";

export function WaveAnalysisPanel() {
  const [selectedCrypto, setSelectedCrypto] = useState("BTC/USDT");
  const [timeFrame, setTimeFrame] = useState("4h");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const cryptoPairs = [
    "BTC/USDT", "ETH/USDT", "ADA/USDT", "DOT/USDT", 
    "SOL/USDT", "MATIC/USDT", "AVAX/USDT", "LINK/USDT"
  ];

  const timeFrames = [
    { value: "1h", label: "1 ساعة" },
    { value: "4h", label: "4 ساعات" },
    { value: "1d", label: "يوم واحد" },
    { value: "1w", label: "أسبوع واحد" }
  ];

  // بيانات تجريبية للمثال
  const generateSampleData = () => {
    const data = [];
    const basePrice = 50000;
    let currentPrice = basePrice;
    
    for (let i = 0; i < 100; i++) {
      const change = (Math.random() - 0.5) * 1000;
      currentPrice += change;
      const high = currentPrice + Math.random() * 500;
      const low = currentPrice - Math.random() * 500;
      
      data.push({
        time: Date.now() - (100 - i) * 3600000,
        open: currentPrice - change,
        high: Math.max(high, currentPrice),
        low: Math.min(low, currentPrice),
        close: currentPrice
      });
    }
    return data;
  };

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      const analyzer = new ElliottWaveAnalyzer();
      const sampleData = generateSampleData();
      const result = analyzer.analyze(sampleData);
      setAnalysisResult(result);
    } catch (error) {
      console.error("خطأ في التحليل:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    runAnalysis();
  }, [selectedCrypto, timeFrame]);

  const renderPatternCard = (pattern: any) => {
    const isMotivePattern = pattern.type === 'motive';
    const icon = pattern.direction === 'bullish' ? TrendingUp : TrendingDown;
    const iconColor = pattern.direction === 'bullish' ? 'text-green-600' : 'text-red-600';
    
    return (
      <Card key={pattern.id || Math.random()} className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {React.createElement(icon, { className: `h-5 w-5 ${iconColor}` })}
              <CardTitle className="text-lg">
                نمط {isMotivePattern ? 'دافع' : 'تصحيحي'}
              </CardTitle>
            </div>
            <Badge 
              variant={pattern.direction === 'bullish' ? 'default' : 'destructive'}
              className="text-xs"
            >
              {pattern.direction === 'bullish' ? 'صاعد' : 'هابط'}
            </Badge>
          </div>
          <CardDescription>
            مستوى الثقة: {Math.round(pattern.confidence)}%
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={pattern.confidence} className="h-2" />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">عدد النقاط:</span>
                <span className="ml-2 font-semibold">{pattern.points?.length || 0}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">عدد الموجات:</span>
                <span className="ml-2 font-semibold">
                  {Object.keys(pattern.waves || {}).length}
                </span>
              </div>
            </div>
            
            {pattern.targets && (
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center mb-2">
                  <Target className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="font-medium text-sm">الأهداف المتوقعة</span>
                </div>
                <div className="text-xs space-y-1">
                  {isMotivePattern ? (
                    <>
                      <div>الهدف الأول: ${pattern.targets.wave5_fib618?.toFixed(2) || 'N/A'}</div>
                      <div>الهدف الثاني: ${pattern.targets.wave5_fib1000?.toFixed(2) || 'N/A'}</div>
                      <div>الهدف الثالث: ${pattern.targets.wave5_fib1618?.toFixed(2) || 'N/A'}</div>
                    </>
                  ) : (
                    <>
                      <div>هدف الموجة C: ${pattern.targets.waveC_fib618?.toFixed(2) || 'N/A'}</div>
                      <div>الهدف النهائي: ${pattern.targets.finalTarget?.toFixed(2) || 'N/A'}</div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2" />
          تحليل موجات إليوت
        </CardTitle>
        <CardDescription>
          تحليل متقدم لأنماط موجات إليوت في الأسواق المالية
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* التحكم في المعاملات */}
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">العملة الرقمية</label>
              <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cryptoPairs.map(pair => (
                    <SelectItem key={pair} value={pair}>{pair}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">الإطار الزمني</label>
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeFrames.map(tf => (
                    <SelectItem key={tf.value} value={tf.value}>{tf.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button 
                onClick={runAnalysis} 
                disabled={isAnalyzing}
                className="min-w-[120px]"
              >
                {isAnalyzing ? "يحلل..." : "تحليل جديد"}
              </Button>
            </div>
          </div>

          {/* النتائج */}
          {analysisResult && (
            <Tabs defaultValue="patterns" className="mt-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="patterns">الأنماط</TabsTrigger>
                <TabsTrigger value="summary">الملخص</TabsTrigger>
                <TabsTrigger value="fibonacci">فيبوناتشي</TabsTrigger>
              </TabsList>
              
              <TabsContent value="patterns" className="mt-4">
                {analysisResult.success ? (
                  analysisResult.patterns.length > 0 ? (
                    <div className="space-y-4">
                      {analysisResult.patterns.slice(0, 3).map(renderPatternCard)}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        لم يتم العثور على أنماط موجات إليوت واضحة في البيانات الحالية
                      </p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 mx-auto text-red-400 mb-4" />
                    <p className="text-red-600 dark:text-red-400">
                      خطأ في التحليل: {analysisResult.error}
                    </p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="summary" className="mt-4">
                {analysisResult.summary && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">
                          {analysisResult.summary.totalPatterns}
                        </div>
                        <p className="text-sm text-gray-600">إجمالي الأنماط</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">
                          {analysisResult.summary.motivePatterns}
                        </div>
                        <p className="text-sm text-gray-600">أنماط دافعة</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-orange-600">
                          {analysisResult.summary.correctivePatterns}
                        </div>
                        <p className="text-sm text-gray-600">أنماط تصحيحية</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">
                          {Math.round(analysisResult.summary.averageConfidence)}%
                        </div>
                        <p className="text-sm text-gray-600">متوسط الثقة</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="fibonacci" className="mt-4">
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    تحليل مستويات فيبوناتشي قيد التطوير
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
    </Card>
  );
}