import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CryptoOverview } from "@/components/crypto/crypto-overview";
import { WaveAnalysisPanel } from "@/components/crypto/wave-analysis-panel";
import { MarketData } from "@/components/crypto/market-data";
import { TradingSignals } from "@/components/crypto/trading-signals";


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <CryptoOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WaveAnalysisPanel />
            <MarketData />
          </div>
          
          <div className="space-y-6">
            <TradingSignals />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
