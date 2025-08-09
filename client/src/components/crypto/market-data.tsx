import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, RefreshCw, DollarSign, Volume2, Wifi, WifiOff, AlertCircle } from "lucide-react";
import { realCryptoDataService, type RealCryptoPriceData as CryptoPriceData } from "@/lib/realCryptoAPI";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export function MarketData() {
  const [cryptoData, setCryptoData] = useState<CryptoPriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSource, setCurrentSource] = useState<string>("");
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);
  const { toast } = useToast();
  
  // قائمة العملات المراد تتبعها
  const watchedSymbols = [
    "BTC/USDT", "ETH/USDT", "ADA/USDT", "SOL/USDT", 
    "MATIC/USDT", "DOT/USDT", "AVAX/USDT", "LINK/USDT"
  ];

  // جلب البيانات الحقيقية من APIs متعددة
  const fetchRealData = async (showToast = false) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('جلب البيانات الحقيقية من APIs الخارجية...');
      const data = await realCryptoDataService.getPrices(watchedSymbols);
      
      setCryptoData(data);
      setCurrentSource("OKX Exchange");
      setAvailableProviders(["OKX", "Binance", "Kraken", "Coinbase"]);
      
      if (showToast && data.length > 0) {
        toast({
          title: "تم تحديث البيانات",
          description: `تم جلب ${data.length} عملة من مصادر حقيقية`,
        });
      }
      
    } catch (error) {
      console.error('خطأ في جلب البيانات:', error);
      const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف';
      setError(errorMessage);
      
      toast({
        title: "خطأ في البيانات",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // تحديث البيانات عند تحميل المكون
  useEffect(() => {
    fetchRealData();
    
    // تحديث البيانات كل دقيقة
    const interval = setInterval(() => {
      fetchRealData();
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // تنسيق القيم
  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (price >= 1) return price.toFixed(4);
    return price.toFixed(6);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1e9) return `${(volume / 1e9).toFixed(1)}B`;
    if (volume >= 1e6) return `${(volume / 1e6).toFixed(1)}M`;
    if (volume >= 1e3) return `${(volume / 1e3).toFixed(1)}K`;
    return volume.toString();
  };

  const formatMarketCap = (marketCap: number | undefined) => {
    if (!marketCap) return 'غير محدد';
    if (marketCap >= 1e12) return `${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `${(marketCap / 1e9).toFixed(1)}B`;
    if (marketCap >= 1e6) return `${(marketCap / 1e6).toFixed(1)}M`;
    return formatVolume(marketCap);
  };

  const renderCryptoRow = (crypto: CryptoPriceData) => {
    const changePercent = isNaN(crypto.changePercent24h) ? 0 : crypto.changePercent24h;
    const isPositive = changePercent > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const changeColor = isPositive ? "text-green-600" : "text-red-600";

    return (
      <div key={crypto.symbol} className="p-4 rounded-lg border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-soft">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="font-semibold text-lg">{crypto.symbol}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {crypto.symbol.split('/')[0]}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">${formatPrice(crypto.price)}</span>
              <Icon className={`h-5 w-5 ${changeColor}`} />
            </div>
            <div className={`text-sm ${changeColor} font-medium`}>
              {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">الحجم 24س</div>
            <div className="font-semibold">{formatVolume(crypto.volume24h)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">أعلى 24س</div>
            <div className="font-semibold text-green-600">${formatPrice(crypto.high24h)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">أقل 24س</div>
            <div className="font-semibold text-red-600">${formatPrice(crypto.low24h)}</div>
          </div>
        </div>

        {crypto.marketCap && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              القيمة السوقية: ${formatMarketCap(crypto.marketCap)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">
              آخر تحديث: {new Date(crypto.lastUpdate).toLocaleTimeString('ar')}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="shadow-container card-enhanced">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              بيانات السوق المباشرة
            </CardTitle>
            <CardDescription>
              {currentSource ? `البيانات الحالية من: ${currentSource}` : 'أسعار العملات الرقمية الحقيقية'}
              {availableProviders.length > 1 && (
                <span className="text-xs text-gray-500 block">
                  مصادر متاحة: {availableProviders.join(', ')}
                </span>
              )}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            {availableProviders.length > 0 ? (
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Wifi className="h-3 w-3" />
                <span>متصل</span>
              </Badge>
            ) : (
              <Badge variant="destructive" className="flex items-center space-x-1">
                <WifiOff className="h-3 w-3" />
                <span>غير متصل</span>
              </Badge>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => fetchRealData(true)}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              تحديث
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="flex items-center p-4 mb-4 text-sm text-red-800 bg-red-50 rounded-lg dark:bg-red-950 dark:text-red-200">
            <AlertCircle className="h-4 w-4 mr-2" />
            خطأ: {error}
          </div>
        )}
        
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center justify-between p-4 bg-gray-200 dark:bg-gray-700 rounded-lg">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                  </div>
                  <div className="space-y-2 text-right">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : cryptoData.length > 0 ? (
          <div className="space-y-4">
            {cryptoData.map(renderCryptoRow)}
          </div>
        ) : (
          <div className="text-center py-8">
            <WifiOff className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد بيانات متاحة
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              تعذر الحصول على البيانات من مصادر البيانات الخارجية
            </p>
            <Button onClick={() => fetchRealData(true)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              إعادة المحاولة
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}