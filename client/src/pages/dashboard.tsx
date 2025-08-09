import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CryptoOverview } from "@/components/crypto/crypto-overview";
import { WaveAnalysisPanel } from "@/components/crypto/wave-analysis-panel";
import { MarketData } from "@/components/crypto/market-data";
import { TradingSignals } from "@/components/crypto/trading-signals";
import { WaveDirection } from "@/components/crypto/wave-direction";
import { CryptoSelector } from "@/components/crypto/crypto-selector";
import { useAnalysisState } from "@/hooks/use-analysis-state";


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
        
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* مكون اختيار العملات - أفضل 100 عملة */}
          <div className="xl:col-span-1">
            <CryptoSelector 
              selectedCrypto={selectedCrypto} 
              onCryptoSelect={handleCryptoSelect} 
            />
          </div>
          
          {/* باقي المكونات */}
          <div className="xl:col-span-3">
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
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
