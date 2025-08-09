// خدمة البيانات الحقيقية للعملات الرقمية
export interface CryptoPriceData {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  marketCap?: number;
  lastUpdate: string;
}

export interface APIProvider {
  name: string;
  getPrices: (symbols: string[]) => Promise<CryptoPriceData[]>;
  isAvailable: () => Promise<boolean>;
}

// Binance API Provider
class BinanceProvider implements APIProvider {
  name = 'Binance';
  private baseURL = 'https://api.binance.com/api/v3';

  async getPrices(symbols: string[]): Promise<CryptoPriceData[]> {
    try {
      // تحويل رموز العملات لتنسيق Binance
      const binanceSymbols = symbols.map(s => s.replace('/', '').toUpperCase());
      const symbolsParam = JSON.stringify(binanceSymbols);
      
      const response = await fetch(`${this.baseURL}/ticker/24hr?symbols=${symbolsParam}`);
      
      if (!response.ok) {
        throw new Error(`Binance API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.map((item: any) => ({
        symbol: this.formatSymbol(item.symbol),
        price: parseFloat(item.lastPrice),
        change24h: parseFloat(item.priceChange),
        changePercent24h: parseFloat(item.priceChangePercent),
        high24h: parseFloat(item.highPrice),
        low24h: parseFloat(item.lowPrice),
        volume24h: parseFloat(item.volume),
        lastUpdate: new Date().toISOString()
      }));
    } catch (error) {
      console.error('خطأ في Binance API:', error);
      throw error;
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/ping`);
      return response.ok;
    } catch {
      return false;
    }
  }

  private formatSymbol(binanceSymbol: string): string {
    // تحويل BTCUSDT إلى BTC/USDT
    const commonPairs = ['USDT', 'BTC', 'ETH', 'BNB', 'USDC'];
    for (const pair of commonPairs) {
      if (binanceSymbol.endsWith(pair)) {
        const base = binanceSymbol.slice(0, -pair.length);
        return `${base}/${pair}`;
      }
    }
    return binanceSymbol;
  }
}

// Alternative Free API Provider
class AlternativeProvider implements APIProvider {
  name = 'CoinCap';
  private baseURL = 'https://api.coincap.io/v2';

  async getPrices(symbols: string[]): Promise<CryptoPriceData[]> {
    try {
      // تحويل رموز العملات إلى معرفات CoinGecko
      const coinIds = symbols.map(s => this.symbolToCoinId(s)).join(',');
      
      const response = await fetch(
        `${this.baseURL}/simple/price?ids=${coinIds}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`
      );
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return Object.entries(data).map(([coinId, priceData]: [string, any]) => ({
        symbol: this.coinIdToSymbol(coinId),
        price: priceData.usd || 0,
        change24h: 0, // CoinGecko doesn't provide absolute change
        changePercent24h: priceData.usd_24h_change || 0,
        high24h: 0, // Not available in simple API
        low24h: 0, // Not available in simple API
        volume24h: priceData.usd_24h_vol || 0,
        marketCap: priceData.usd_market_cap || 0,
        lastUpdate: new Date().toISOString()
      }));
    } catch (error) {
      console.error('خطأ في CoinGecko API:', error);
      throw error;
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/ping`);
      return response.ok;
    } catch {
      return false;
    }
  }

  private symbolToCoinId(symbol: string): string {
    const mapping: { [key: string]: string } = {
      'BTC/USDT': 'bitcoin',
      'ETH/USDT': 'ethereum',
      'ADA/USDT': 'cardano',
      'SOL/USDT': 'solana',
      'MATIC/USDT': 'matic-network',
      'DOT/USDT': 'polkadot',
      'AVAX/USDT': 'avalanche-2',
      'LINK/USDT': 'chainlink',
      'UNI/USDT': 'uniswap',
      'LTC/USDT': 'litecoin'
    };
    return mapping[symbol] || symbol.split('/')[0].toLowerCase();
  }

  private coinIdToSymbol(coinId: string): string {
    const mapping: { [key: string]: string } = {
      'bitcoin': 'BTC/USDT',
      'ethereum': 'ETH/USDT',
      'cardano': 'ADA/USDT',
      'solana': 'SOL/USDT',
      'matic-network': 'MATIC/USDT',
      'polkadot': 'DOT/USDT',
      'avalanche-2': 'AVAX/USDT',
      'chainlink': 'LINK/USDT',
      'uniswap': 'UNI/USDT',
      'litecoin': 'LTC/USDT'
    };
    return mapping[coinId] || coinId.toUpperCase() + '/USDT';
  }
}

// CoinMarketCap API Provider (يتطلب API Key)
class CoinMarketCapProvider implements APIProvider {
  name = 'CoinMarketCap';
  private baseURL = 'https://pro-api.coinmarketcap.com/v1';
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || import.meta.env.VITE_COINMARKETCAP_API_KEY || '';
  }

  async getPrices(symbols: string[]): Promise<CryptoPriceData[]> {
    if (!this.apiKey) {
      throw new Error('CoinMarketCap API Key مطلوب');
    }

    try {
      const symbolsParam = symbols.map(s => s.split('/')[0]).join(',');
      
      const response = await fetch(
        `${this.baseURL}/cryptocurrency/quotes/latest?symbol=${symbolsParam}&convert=USD`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': this.apiKey,
            'Accept': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`CoinMarketCap API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return Object.values(data.data).map((item: any) => ({
        symbol: `${item.symbol}/USDT`,
        price: item.quote.USD.price,
        change24h: item.quote.USD.price * (item.quote.USD.percent_change_24h / 100),
        changePercent24h: item.quote.USD.percent_change_24h,
        high24h: 0, // Not available
        low24h: 0, // Not available
        volume24h: item.quote.USD.volume_24h,
        marketCap: item.quote.USD.market_cap,
        lastUpdate: item.quote.USD.last_updated
      }));
    } catch (error) {
      console.error('خطأ في CoinMarketCap API:', error);
      throw error;
    }
  }

  async isAvailable(): Promise<boolean> {
    return !!this.apiKey;
  }
}

// خدمة موحدة لجلب البيانات
export class CryptoDataService {
  private providers: APIProvider[] = [];
  private cache = new Map<string, { data: CryptoPriceData[], timestamp: number }>();
  private cacheTimeout = 30000; // 30 ثانية

  constructor() {
    // ترتيب الأولوية: CoinGecko أولاً (لأنه مجاني ومتاح عالمياً)
    this.providers = [
      new CoinGeckoProvider(),
      new BinanceProvider(),
      new CoinMarketCapProvider()
    ];
  }

  async getPrices(symbols: string[]): Promise<CryptoPriceData[]> {
    const cacheKey = symbols.join(',');
    const cached = this.cache.get(cacheKey);
    
    // استخدام البيانات المحفوظة إذا كانت حديثة
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    // جرب كل مزود حتى تحصل على البيانات
    for (const provider of this.providers) {
      try {
        if (await provider.isAvailable()) {
          console.log(`جلب البيانات من ${provider.name}...`);
          const data = await provider.getPrices(symbols);
          
          // حفظ البيانات في الكاش
          this.cache.set(cacheKey, {
            data,
            timestamp: Date.now()
          });
          
          return data;
        }
      } catch (error) {
        console.warn(`فشل في جلب البيانات من ${provider.name}:`, error);
        continue;
      }
    }

    throw new Error('فشل في جلب البيانات من جميع المزودين');
  }

  async getPrice(symbol: string): Promise<CryptoPriceData | null> {
    try {
      const prices = await this.getPrices([symbol]);
      return prices[0] || null;
    } catch (error) {
      console.error('خطأ في جلب سعر العملة:', error);
      return null;
    }
  }

  // مسح الكاش
  clearCache(): void {
    this.cache.clear();
  }

  // الحصول على قائمة المزودين المتاحين
  async getAvailableProviders(): Promise<string[]> {
    const available = [];
    for (const provider of this.providers) {
      if (await provider.isAvailable()) {
        available.push(provider.name);
      }
    }
    return available;
  }
}

// تصدير نسخة واحدة من الخدمة
export const cryptoDataService = new CryptoDataService();