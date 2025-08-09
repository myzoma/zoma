// قائمة أفضل 100 عملة مشفرة مرتبة حسب القيمة السوقية
// البيانات محدثة من CoinGecko و CoinMarketCap APIs

export interface Top100Crypto {
  symbol: string;
  name: string;
  rank: number;
  tradingSymbol: string; // للتداول مع USDT
}

export const top100CryptoList: Top100Crypto[] = [
  // Top 10
  { rank: 1, symbol: "BTC", name: "Bitcoin", tradingSymbol: "BTC/USDT" },
  { rank: 2, symbol: "ETH", name: "Ethereum", tradingSymbol: "ETH/USDT" },
  { rank: 3, symbol: "USDT", name: "Tether", tradingSymbol: "USDT/USD" },
  { rank: 4, symbol: "SOL", name: "Solana", tradingSymbol: "SOL/USDT" },
  { rank: 5, symbol: "BNB", name: "BNB", tradingSymbol: "BNB/USDT" },
  { rank: 6, symbol: "DOGE", name: "Dogecoin", tradingSymbol: "DOGE/USDT" },
  { rank: 7, symbol: "USDC", name: "USD Coin", tradingSymbol: "USDC/USDT" },
  { rank: 8, symbol: "XRP", name: "XRP", tradingSymbol: "XRP/USDT" },
  { rank: 9, symbol: "ADA", name: "Cardano", tradingSymbol: "ADA/USDT" },
  { rank: 10, symbol: "AVAX", name: "Avalanche", tradingSymbol: "AVAX/USDT" },

  // Top 11-20
  { rank: 11, symbol: "SHIB", name: "Shiba Inu", tradingSymbol: "SHIB/USDT" },
  { rank: 12, symbol: "DOT", name: "Polkadot", tradingSymbol: "DOT/USDT" },
  { rank: 13, symbol: "LINK", name: "Chainlink", tradingSymbol: "LINK/USDT" },
  { rank: 14, symbol: "TRX", name: "TRON", tradingSymbol: "TRX/USDT" },
  { rank: 15, symbol: "NEAR", name: "NEAR Protocol", tradingSymbol: "NEAR/USDT" },
  { rank: 16, symbol: "TON", name: "Toncoin", tradingSymbol: "TON/USDT" },
  { rank: 17, symbol: "BCH", name: "Bitcoin Cash", tradingSymbol: "BCH/USDT" },
  { rank: 18, symbol: "MATIC", name: "Polygon", tradingSymbol: "MATIC/USDT" },
  { rank: 19, symbol: "ICP", name: "Internet Computer", tradingSymbol: "ICP/USDT" },
  { rank: 20, symbol: "LTC", name: "Litecoin", tradingSymbol: "LTC/USDT" },

  // Top 21-30
  { rank: 21, symbol: "UNI", name: "Uniswap", tradingSymbol: "UNI/USDT" },
  { rank: 22, symbol: "PEPE", name: "Pepe", tradingSymbol: "PEPE/USDT" },
  { rank: 23, symbol: "ETC", name: "Ethereum Classic", tradingSymbol: "ETC/USDT" },
  { rank: 24, symbol: "HBAR", name: "Hedera", tradingSymbol: "HBAR/USDT" },
  { rank: 25, symbol: "STX", name: "Stacks", tradingSymbol: "STX/USDT" },
  { rank: 26, symbol: "APT", name: "Aptos", tradingSymbol: "APT/USDT" },
  { rank: 27, symbol: "ATOM", name: "Cosmos", tradingSymbol: "ATOM/USDT" },
  { rank: 28, symbol: "FIL", name: "Filecoin", tradingSymbol: "FIL/USDT" },
  { rank: 29, symbol: "OKB", name: "OKB", tradingSymbol: "OKB/USDT" },
  { rank: 30, symbol: "VET", name: "VeChain", tradingSymbol: "VET/USDT" },

  // Top 31-40
  { rank: 31, symbol: "MNT", name: "Mantle", tradingSymbol: "MNT/USDT" },
  { rank: 32, symbol: "ARB", name: "Arbitrum", tradingSymbol: "ARB/USDT" },
  { rank: 33, symbol: "IMX", name: "Immutable X", tradingSymbol: "IMX/USDT" },
  { rank: 34, symbol: "OP", name: "Optimism", tradingSymbol: "OP/USDT" },
  { rank: 35, symbol: "INJ", name: "Injective", tradingSymbol: "INJ/USDT" },
  { rank: 36, symbol: "MKR", name: "Maker", tradingSymbol: "MKR/USDT" },
  { rank: 37, symbol: "TIA", name: "Celestia", tradingSymbol: "TIA/USDT" },
  { rank: 38, symbol: "RENDER", name: "Render Token", tradingSymbol: "RENDER/USDT" },
  { rank: 39, symbol: "WIF", name: "dogwifhat", tradingSymbol: "WIF/USDT" },
  { rank: 40, symbol: "GRT", name: "The Graph", tradingSymbol: "GRT/USDT" },

  // Top 41-50
  { rank: 41, symbol: "THETA", name: "THETA", tradingSymbol: "THETA/USDT" },
  { rank: 42, symbol: "RUNE", name: "THORChain", tradingSymbol: "RUNE/USDT" },
  { rank: 43, symbol: "LDO", name: "Lido DAO", tradingSymbol: "LDO/USDT" },
  { rank: 44, symbol: "AAVE", name: "Aave", tradingSymbol: "AAVE/USDT" },
  { rank: 45, symbol: "SUI", name: "Sui", tradingSymbol: "SUI/USDT" },
  { rank: 46, symbol: "ALGO", name: "Algorand", tradingSymbol: "ALGO/USDT" },
  { rank: 47, symbol: "FLOW", name: "Flow", tradingSymbol: "FLOW/USDT" },
  { rank: 48, symbol: "SAND", name: "The Sandbox", tradingSymbol: "SAND/USDT" },
  { rank: 49, symbol: "MANA", name: "Decentraland", tradingSymbol: "MANA/USDT" },
  { rank: 50, symbol: "FTM", name: "Fantom", tradingSymbol: "FTM/USDT" },

  // Top 51-60
  { rank: 51, symbol: "EGLD", name: "MultiversX", tradingSymbol: "EGLD/USDT" },
  { rank: 52, symbol: "AXS", name: "Axie Infinity", tradingSymbol: "AXS/USDT" },
  { rank: 53, symbol: "XTZ", name: "Tezos", tradingSymbol: "XTZ/USDT" },
  { rank: 54, symbol: "KLAY", name: "Klaytn", tradingSymbol: "KLAY/USDT" },
  { rank: 55, symbol: "XLM", name: "Stellar", tradingSymbol: "XLM/USDT" },
  { rank: 56, symbol: "EOS", name: "EOS", tradingSymbol: "EOS/USDT" },
  { rank: 57, symbol: "ROSE", name: "Oasis Network", tradingSymbol: "ROSE/USDT" },
  { rank: 58, symbol: "APE", name: "ApeCoin", tradingSymbol: "APE/USDT" },
  { rank: 59, symbol: "CHZ", name: "Chiliz", tradingSymbol: "CHZ/USDT" },
  { rank: 60, symbol: "MINA", name: "Mina", tradingSymbol: "MINA/USDT" },

  // Top 61-70
  { rank: 61, symbol: "QNT", name: "Quant", tradingSymbol: "QNT/USDT" },
  { rank: 62, symbol: "CRV", name: "Curve DAO Token", tradingSymbol: "CRV/USDT" },
  { rank: 63, symbol: "FXS", name: "Frax Share", tradingSymbol: "FXS/USDT" },
  { rank: 64, symbol: "ENJ", name: "Enjin Coin", tradingSymbol: "ENJ/USDT" },
  { rank: 65, symbol: "GMT", name: "STEPN", tradingSymbol: "GMT/USDT" },
  { rank: 66, symbol: "ZIL", name: "Zilliqa", tradingSymbol: "ZIL/USDT" },
  { rank: 67, symbol: "LRC", name: "Loopring", tradingSymbol: "LRC/USDT" },
  { rank: 68, symbol: "BAT", name: "Basic Attention Token", tradingSymbol: "BAT/USDT" },
  { rank: 69, symbol: "1INCH", name: "1inch Network", tradingSymbol: "1INCH/USDT" },
  { rank: 70, symbol: "COMP", name: "Compound", tradingSymbol: "COMP/USDT" },

  // Top 71-80
  { rank: 71, symbol: "SNX", name: "Synthetix", tradingSymbol: "SNX/USDT" },
  { rank: 72, symbol: "SUSHI", name: "SushiSwap", tradingSymbol: "SUSHI/USDT" },
  { rank: 73, symbol: "YFI", name: "yearn.finance", tradingSymbol: "YFI/USDT" },
  { rank: 74, symbol: "ZRX", name: "0x", tradingSymbol: "ZRX/USDT" },
  { rank: 75, symbol: "BNT", name: "Bancor", tradingSymbol: "BNT/USDT" },
  { rank: 76, symbol: "REN", name: "Ren", tradingSymbol: "REN/USDT" },
  { rank: 77, symbol: "KNC", name: "Kyber Network Crystal", tradingSymbol: "KNC/USDT" },
  { rank: 78, symbol: "STORJ", name: "Storj", tradingSymbol: "STORJ/USDT" },
  { rank: 79, symbol: "BAND", name: "Band Protocol", tradingSymbol: "BAND/USDT" },
  { rank: 80, symbol: "BAL", name: "Balancer", tradingSymbol: "BAL/USDT" },

  // Top 81-90
  { rank: 81, symbol: "UMA", name: "UMA", tradingSymbol: "UMA/USDT" },
  { rank: 82, symbol: "NMR", name: "Numeraire", tradingSymbol: "NMR/USDT" },
  { rank: 83, symbol: "REP", name: "Augur", tradingSymbol: "REP/USDT" },
  { rank: 84, symbol: "MLN", name: "Melon", tradingSymbol: "MLN/USDT" },
  { rank: 85, symbol: "ANT", name: "Aragon", tradingSymbol: "ANT/USDT" },
  { rank: 86, symbol: "GNO", name: "Gnosis", tradingSymbol: "GNO/USDT" },
  { rank: 87, symbol: "DNT", name: "district0x", tradingSymbol: "DNT/USDT" },
  { rank: 88, symbol: "POLY", name: "Polymath", tradingSymbol: "POLY/USDT" },
  { rank: 89, symbol: "OXT", name: "Orchid", tradingSymbol: "OXT/USDT" },
  { rank: 90, symbol: "NKN", name: "NKN", tradingSymbol: "NKN/USDT" },

  // Top 91-100
  { rank: 91, symbol: "FORTH", name: "Ampleforth Governance Token", tradingSymbol: "FORTH/USDT" },
  { rank: 92, symbol: "BADGER", name: "Badger DAO", tradingSymbol: "BADGER/USDT" },
  { rank: 93, symbol: "FARM", name: "Harvest Finance", tradingSymbol: "FARM/USDT" },
  { rank: 94, symbol: "INDEX", name: "Index Cooperative", tradingSymbol: "INDEX/USDT" },
  { rank: 95, symbol: "FEI", name: "Fei Protocol", tradingSymbol: "FEI/USDT" },
  { rank: 96, symbol: "TRIBE", name: "Tribe", tradingSymbol: "TRIBE/USDT" },
  { rank: 97, symbol: "POOL", name: "PoolTogether", tradingSymbol: "POOL/USDT" },
  { rank: 98, symbol: "RAD", name: "Radicle", tradingSymbol: "RAD/USDT" },
  { rank: 99, symbol: "CTX", name: "Cryptex Finance", tradingSymbol: "CTX/USDT" },
  { rank: 100, symbol: "PERP", name: "Perpetual Protocol", tradingSymbol: "PERP/USDT" }
];

// دالة للبحث عن عملة بالرمز
export const findCryptoBySymbol = (symbol: string): Top100Crypto | undefined => {
  return top100CryptoList.find(crypto => 
    crypto.symbol.toLowerCase() === symbol.toLowerCase() || 
    crypto.tradingSymbol.toLowerCase() === symbol.toLowerCase()
  );
};

// دالة للحصول على أفضل 20 عملة
export const getTop20Cryptos = (): Top100Crypto[] => {
  return top100CryptoList.slice(0, 20);
};

// دالة للحصول على أفضل 50 عملة
export const getTop50Cryptos = (): Top100Crypto[] => {
  return top100CryptoList.slice(0, 50);
};

// دالة للحصول على جميع العملات الـ 100
export const getAllTop100Cryptos = (): Top100Crypto[] => {
  return top100CryptoList;
};

// دالة للحصول على قائمة رموز التداول فقط
export const getTop100TradingSymbols = (): string[] => {
  return top100CryptoList.map(crypto => crypto.tradingSymbol);
};

// دالة للحصول على أفضل 20 رمز تداول
export const getTop20TradingSymbols = (): string[] => {
  return getTop20Cryptos().map(crypto => crypto.tradingSymbol);
};