// نظام مصادر متعددة للعملات الرقمية مع آلية تبديل تلقائي
import { localCryptoDataService, type LocalCryptoPriceData } from "@/lib/localCryptoData";

export interface CryptoProvider {
  name: string;
  isAvailable(): Promise<boolean>;
  getPrices(symbols: string[]): Promise<LocalCryptoPriceData[]>;
  priority: number; // أولوية المصدر (أقل رقم = أولوية أعلى)
}

// مصدر البيانات المحلية (احتياطي دائماً متوفر)
class LocalDataProvider implements CryptoProvider {
  name = "البيانات المحلية";
  priority = 100; // أولوية منخفضة (احتياطي)

  async isAvailable(): Promise<boolean> {
    return true; // دائماً متاح
  }

  async getPrices(symbols: string[]): Promise<LocalCryptoPriceData[]> {
    return localCryptoDataService.getPrices(symbols);
  }
}

// مصدر CoinCap API
class CoinCapProvider implements CryptoProvider {
  name = "CoinCap";
  priority = 1;
  private baseURL = 'https://api.coincap.io/v2';

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/assets?limit=1`, {
        signal: AbortSignal.timeout(5000) // 5 ثوان timeout
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async getPrices(symbols: string[]): Promise<LocalCryptoPriceData[]> {
    const coinCapIds = {
      'BTC/USDT': 'bitcoin',
      'ETH/USDT': 'ethereum', 
      'ADA/USDT': 'cardano',
      'SOL/USDT': 'solana',
      'MATIC/USDT': 'polygon',
      'DOT/USDT': 'polkadot',
      'AVAX/USDT': 'avalanche',
      'LINK/USDT': 'chainlink'
    };

    const ids = symbols.map(symbol => coinCapIds[symbol]).filter(Boolean);
    const response = await fetch(
      `${this.baseURL}/assets?ids=${ids.join(',')}`
    );

    if (!response.ok) {
      throw new Error(`CoinCap API Error: ${response.status}`);
    }

    const result = await response.json();
    
    return result.data.map((asset: any) => {
      const symbol = Object.keys(coinCapIds).find(
        key => coinCapIds[key] === asset.id
      ) || asset.symbol + '/USDT';

      return {
        symbol,
        price: parseFloat(asset.priceUsd),
        change24h: parseFloat(asset.changePercent24Hr || 0),
        changePercent24h: parseFloat(asset.changePercent24Hr || 0),
        high24h: parseFloat(asset.priceUsd) * 1.05,
        low24h: parseFloat(asset.priceUsd) * 0.95,
        volume24h: parseFloat(asset.volumeUsd24Hr || 0),
        marketCap: parseFloat(asset.marketCapUsd || 0),
        lastUpdate: new Date().toISOString()
      };
    });
  }
}

// مصدر CryptoCompare API
class CryptoCompareProvider implements CryptoProvider {
  name = "CryptoCompare";
  priority = 2;
  private baseURL = 'https://min-api.cryptocompare.com/data';

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/price?fsym=BTC&tsyms=USD`, {
        signal: AbortSignal.timeout(5000)
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async getPrices(symbols: string[]): Promise<LocalCryptoPriceData[]> {
    const cryptoSymbols = symbols.map(s => s.split('/')[0]);
    const response = await fetch(
      `${this.baseURL}/pricemultifull?fsyms=${cryptoSymbols.join(',')}&tsyms=USD`
    );

    if (!response.ok) {
      throw new Error(`CryptoCompare API Error: ${response.status}`);
    }

    const result = await response.json();
    
    return cryptoSymbols.map((crypto, index) => {
      const data = result.RAW?.[crypto]?.USD || {};
      const display = result.DISPLAY?.[crypto]?.USD || {};

      return {
        symbol: symbols[index],
        price: data.PRICE || 0,
        change24h: data.CHANGE24HOUR || 0,
        changePercent24h: data.CHANGEPCT24HOUR || 0,
        high24h: data.HIGH24HOUR || 0,
        low24h: data.LOW24HOUR || 0,
        volume24h: data.VOLUME24HOURTO || 0,
        marketCap: data.MKTCAP || 0,
        lastUpdate: new Date().toISOString()
      };
    });
  }
}

// مصدر Binance API (بديل)
class BinanceProvider implements CryptoProvider {
  name = "Binance";
  priority = 3;
  private baseURL = 'https://api.binance.com/api/v3';

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/ping`, {
        signal: AbortSignal.timeout(5000)
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  async getPrices(symbols: string[]): Promise<LocalCryptoPriceData[]> {
    const binanceSymbols = symbols.map(s => s.replace('/', ''));
    const response = await fetch(
      `${this.baseURL}/ticker/24hr?symbols=${JSON.stringify(binanceSymbols)}`
    );

    if (!response.ok) {
      throw new Error(`Binance API Error: ${response.status}`);
    }

    const result = await response.json();
    
    return result.map((ticker: any, index: number) => ({
      symbol: symbols[index],
      price: parseFloat(ticker.lastPrice),
      change24h: parseFloat(ticker.priceChange),
      changePercent24h: parseFloat(ticker.priceChangePercent),
      high24h: parseFloat(ticker.highPrice),
      low24h: parseFloat(ticker.lowPrice),
      volume24h: parseFloat(ticker.volume),
      marketCap: 0, // Binance لا يوفر market cap
      lastUpdate: new Date().toISOString()
    }));
  }
}

// خدمة المصادر المتعددة
export class MultiSourceCryptoDataService {
  private providers: CryptoProvider[];
  private lastWorkingProvider: string | null = null;
  private providerStatus: Map<string, { available: boolean, lastCheck: number }> = new Map();

  constructor() {
    this.providers = [
      new CoinCapProvider(),
      new CryptoCompareProvider(), 
      new BinanceProvider(),
      new LocalDataProvider() // احتياطي أخير
    ].sort((a, b) => a.priority - b.priority);
  }

  // فحص توفر المصادر
  private async checkProviderAvailability(provider: CryptoProvider): Promise<boolean> {
    const now = Date.now();
    const cached = this.providerStatus.get(provider.name);
    
    // استخدام الكاش لمدة دقيقة واحدة
    if (cached && now - cached.lastCheck < 60000) {
      return cached.available;
    }

    try {
      const available = await provider.isAvailable();
      this.providerStatus.set(provider.name, { available, lastCheck: now });
      return available;
    } catch {
      this.providerStatus.set(provider.name, { available: false, lastCheck: now });
      return false;
    }
  }

  // الحصول على البيانات من أول مصدر متاح
  async getPrices(symbols: string[]): Promise<{
    data: LocalCryptoPriceData[],
    source: string,
    availableSources: string[]
  }> {
    const availableSources: string[] = [];
    
    for (const provider of this.providers) {
      const isAvailable = await this.checkProviderAvailability(provider);
      
      if (isAvailable) {
        availableSources.push(provider.name);
        
        try {
          console.log(`جاري جلب البيانات من: ${provider.name}`);
          const data = await provider.getPrices(symbols);
          
          // تحديث آخر مصدر عمل بنجاح
          this.lastWorkingProvider = provider.name;
          
          return {
            data,
            source: provider.name,
            availableSources
          };
        } catch (error) {
          console.warn(`فشل جلب البيانات من ${provider.name}:`, error);
          // تحديث حالة المصدر إلى غير متاح
          this.providerStatus.set(provider.name, { 
            available: false, 
            lastCheck: Date.now() 
          });
          continue;
        }
      }
    }

    throw new Error('جميع مصادر البيانات غير متاحة حالياً');
  }

  // الحصول على قائمة المصادر المتاحة
  async getAvailableProviders(): Promise<string[]> {
    const available: string[] = [];
    
    for (const provider of this.providers) {
      const isAvailable = await this.checkProviderAvailability(provider);
      if (isAvailable) {
        available.push(provider.name);
      }
    }
    
    return available;
  }

  // الحصول على حالة المصادر
  getProviderStatus(): { name: string, available: boolean, priority: number }[] {
    return this.providers.map(provider => ({
      name: provider.name,
      available: this.providerStatus.get(provider.name)?.available || false,
      priority: provider.priority
    }));
  }

  // إعادة تعيين حالة المصادر
  resetProviderStatus() {
    this.providerStatus.clear();
  }

  // الحصول على آخر مصدر عمل بنجاح
  getLastWorkingProvider(): string | null {
    return this.lastWorkingProvider;
  }
}

// تصدير نسخة واحدة من الخدمة
export const multiSourceCryptoService = new MultiSourceCryptoDataService();