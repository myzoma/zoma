import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  TrendingUp, 
  Star, 
  Filter,
  ChevronRight,
  Hash
} from "lucide-react";
import { 
  top100CryptoList, 
  getTop20Cryptos, 
  getTop50Cryptos, 
  getAllTop100Cryptos,
  type Top100Crypto 
} from "@/lib/top100CryptoList";

interface CryptoSelectorProps {
  selectedCrypto: string;
  onCryptoSelect: (crypto: string) => void;
}

export function CryptoSelector({ selectedCrypto, onCryptoSelect }: CryptoSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"top20" | "top50" | "all">("top20");

  // فلترة العملات حسب البحث
  const filterCryptos = (cryptos: Top100Crypto[]) => {
    if (!searchTerm) return cryptos;
    
    return cryptos.filter(crypto => 
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.rank.toString().includes(searchTerm)
    );
  };

  // الحصول على العملات حسب الفئة
  const getCryptosByCategory = () => {
    switch (selectedCategory) {
      case "top20":
        return filterCryptos(getTop20Cryptos());
      case "top50":
        return filterCryptos(getTop50Cryptos());
      case "all":
        return filterCryptos(getAllTop100Cryptos());
      default:
        return filterCryptos(getTop20Cryptos());
    }
  };

  const cryptosToDisplay = getCryptosByCategory();

  // معالج النقر على العملة
  const handleCryptoClick = (crypto: Top100Crypto) => {
    onCryptoSelect(crypto.tradingSymbol);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-right">
          <Star className="h-5 w-5 text-yellow-500" />
          أفضل 100 عملة مشفرة
        </CardTitle>
        <CardDescription className="text-right">
          مرتبة حسب القيمة السوقية من البيتكوين نزولاً
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* شريط البحث */}
        <div className="relative">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="ابحث عن عملة مشفرة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10 text-right"
          />
        </div>

        {/* تبويبات الفئات */}
        <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="top20" className="text-sm">
              أفضل 20
            </TabsTrigger>
            <TabsTrigger value="top50" className="text-sm">
              أفضل 50
            </TabsTrigger>
            <TabsTrigger value="all" className="text-sm">
              جميع الـ 100
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-4">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {cryptosToDisplay.map((crypto) => (
                <Button
                  key={crypto.rank}
                  variant={selectedCrypto === crypto.tradingSymbol ? "default" : "outline"}
                  onClick={() => handleCryptoClick(crypto)}
                  className="w-full justify-between p-4 h-auto text-right"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className="h-4 w-4" />
                    <Badge variant="secondary" className="text-xs">
                      #{crypto.rank}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="font-semibold">{crypto.symbol}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {crypto.name}
                    </span>
                  </div>
                </Button>
              ))}
              
              {cryptosToDisplay.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  لم يتم العثور على عملات مطابقة للبحث
                </div>
              )}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200 text-right">
                <strong>معروض:</strong> {cryptosToDisplay.length} عملة من أصل {
                  selectedCategory === "top20" ? "20" : 
                  selectedCategory === "top50" ? "50" : "100"
                } عملة
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}