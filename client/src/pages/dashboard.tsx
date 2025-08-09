import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CryptoOverview } from "@/components/crypto/crypto-overview";
import { WaveAnalysisPanel } from "@/components/crypto/wave-analysis-panel";
import { MarketData } from "@/components/crypto/market-data";
import { TradingSignals } from "@/components/crypto/trading-signals";
import { WaveDirection } from "@/components/crypto/wave-direction";
import { CryptoDropdown } from "@/components/crypto/crypto-dropdown";
import { useAnalysisState } from "@/hooks/use-analysis-state";
import { Button } from "@/components/ui/button";
import { Heart, ExternalLink } from "lucide-react";


export default function Dashboard() {
  const { selectedCrypto, updateAnalysisState } = useAnalysisState();

  const handleCryptoSelect = (crypto: string) => {
    updateAnalysisState({ selectedCrypto: crypto });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <CryptoOverview />
        
        {/* قائمة منسدلة لاختيار العملات مع رابط الدعم */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="max-w-md flex-1">
            <CryptoDropdown 
              selectedCrypto={selectedCrypto} 
              onCryptoSelect={handleCryptoSelect} 
            />
          </div>
          
          {/* رابط الدعم */}
          <Button
            asChild
            variant="outline"
            size="default"
            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a 
              href="https://buy.stripe.com/test_aFa00j9CSfHn3NV4an97G03" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Heart className="h-4 w-4 text-white animate-pulse" />
              <span className="font-medium">دعم المطور</span>
              <ExternalLink className="h-3 w-3 text-white/80" />
            </a>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WaveAnalysisPanel />
            <MarketData />
          </div>
          
          <div className="space-y-6">
            <WaveDirection />
            <TradingSignals />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
