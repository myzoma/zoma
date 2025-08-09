import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, RefreshCw, DollarSign, Volume2 } from "lucide-react";

export function MarketData() {
  const cryptoData = [
    {
      symbol: "BTC/USDT",
      name: "Bitcoin",
      price: 43567.89,
      change24h: 2.34,
      volume: "1.2B",
      marketCap: "854B",
      elliott: { pattern: "دافعة", confidence: 87, direction: "صاعدة" }
    },
    {
      symbol: "ETH/USDT", 
      name: "Ethereum",
      price: 2634.52,
      change24h: -1.23,
      volume: "890M",
      marketCap: "317B",
      elliott: { pattern: "تصحيحية", confidence: 72, direction: "هابطة" }
    },
    {
      symbol: "ADA/USDT",
      name: "Cardano", 
      price: 0.4789,
      change24h: 4.67,
      volume: "234M",
      marketCap: "16.8B",
      elliott: { pattern: "دافعة", confidence: 91, direction: "صاعدة" }
    },
    {
      symbol: "SOL/USDT",
      name: "Solana",
      price: 98.45,
      change24h: -2.91,
      volume: "456M", 
      marketCap: "43.2B",
      elliott: { pattern: "تصحيحية", confidence: 65, direction: "هابطة" }
    }
  ];

  const renderCryptoRow = (crypto: any) => {
    const isPositive = crypto.change24h > 0;
    const Icon = isPositive ? TrendingUp : TrendingDown;
    const changeColor = isPositive ? "text-green-600" : "text-red-600";
    const bgColor = isPositive ? "bg-green-50 dark:bg-green-950" : "bg-red-50 dark:bg-red-950";

    return (
      <div key={crypto.symbol} className={`p-4 rounded-lg border ${bgColor} border-gray-200 dark:border-gray-700`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div>
              <h3 className="font-semibold text-lg">{crypto.symbol}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{crypto.name}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">${crypto.price.toLocaleString()}</span>
              <Icon className={`h-5 w-5 ${changeColor}`} />
            </div>
            <div className={`text-sm ${changeColor} font-medium`}>
              {isPositive ? '+' : ''}{crypto.change24h.toFixed(2)}%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
          <div>
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-1">
              <Volume2 className="h-3 w-3 mr-1" />
              الحجم 24س
            </div>
            <div className="font-semibold">{crypto.volume}</div>
          </div>
          
          <div>
            <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-1">
              <DollarSign className="h-3 w-3 mr-1" />
              القيمة السوقية
            </div>
            <div className="font-semibold">{crypto.marketCap}</div>
          </div>
          
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">نمط إليوت</div>
            <Badge variant="outline" className="text-xs">
              {crypto.elliott.pattern}
            </Badge>
          </div>
          
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">مستوى الثقة</div>
            <div className="font-semibold text-blue-600">
              {crypto.elliott.confidence}%
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge 
            variant={crypto.elliott.direction === 'صاعدة' ? 'default' : 'destructive'}
            className="text-xs"
          >
            توقع {crypto.elliott.direction}
          </Badge>
          
          <Button variant="outline" size="sm" className="text-xs">
            تفاصيل التحليل
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2" />
              بيانات السوق المباشرة
            </CardTitle>
            <CardDescription>
              أسعار العملات الرقمية مع تحليل موجات إليوت
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cryptoData.map(renderCryptoRow)}
        </div>
      </CardContent>
    </Card>
  );
}