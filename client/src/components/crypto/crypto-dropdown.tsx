import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Search, 
  TrendingUp, 
  Star, 
  ChevronDown,
  Hash
} from "lucide-react";
import { 
  top100CryptoList, 
  getTop20Cryptos, 
  getTop50Cryptos, 
  getAllTop100Cryptos,
  findCryptoBySymbol,
  type Top100Crypto 
} from "@/lib/top100CryptoList";

interface CryptoDropdownProps {
  selectedCrypto: string;
  onCryptoSelect: (crypto: string) => void;
}

export function CryptoDropdown({ selectedCrypto, onCryptoSelect }: CryptoDropdownProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"top20" | "top50" | "all">("top20");
  const [isOpen, setIsOpen] = useState(false);

  // الحصول على معلومات العملة المختارة حالياً
  const currentCrypto = findCryptoBySymbol(selectedCrypto);

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
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="w-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between h-12 text-right"
          >
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            <div className="flex items-center gap-2">
              {currentCrypto ? (
                <>
                  <Badge variant="secondary" className="text-xs">
                    #{currentCrypto.rank}
                  </Badge>
                  <div className="flex flex-col items-end">
                    <span className="font-semibold">{currentCrypto.symbol}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {currentCrypto.name}
                    </span>
                  </div>
                </>
              ) : (
                <span>اختر عملة مشفرة...</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-80 p-0" align="start">
          <div className="space-y-4 p-4">
            {/* عنوان */}
            <div className="flex items-center gap-2 text-right">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-semibold">أفضل 100 عملة مشفرة</span>
            </div>

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
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top20">أفضل 20 عملة</SelectItem>
                <SelectItem value="top50">أفضل 50 عملة</SelectItem>
                <SelectItem value="all">جميع الـ 100 عملة</SelectItem>
              </SelectContent>
            </Select>

            {/* قائمة العملات */}
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {cryptosToDisplay.map((crypto) => (
                <Button
                  key={crypto.rank}
                  variant={selectedCrypto === crypto.tradingSymbol ? "default" : "ghost"}
                  onClick={() => handleCryptoClick(crypto)}
                  className="w-full justify-between p-3 h-auto text-right hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      #{crypto.rank}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="font-medium text-sm">{crypto.symbol}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {crypto.name}
                    </span>
                  </div>
                </Button>
              ))}
              
              {cryptosToDisplay.length === 0 && (
                <div className="text-center py-4 text-gray-500 text-sm">
                  لم يتم العثور على عملات مطابقة للبحث
                </div>
              )}
            </div>
            
            {/* معلومات إضافية */}
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-600 dark:text-gray-400 text-right">
                <strong>معروض:</strong> {cryptosToDisplay.length} عملة من أصل {
                  selectedCategory === "top20" ? "20" : 
                  selectedCategory === "top50" ? "50" : "100"
                } عملة
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}