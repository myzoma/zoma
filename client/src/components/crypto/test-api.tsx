import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export function TestAPI() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testCoinGecko = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,cardano,solana&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true'
      );
      const result = await response.json();
      console.log('CoinGecko Data:', result);
      setData(result);
    } catch (error) {
      console.error('خطأ:', error);
      setData({ error: error.message });
    }
    setLoading(false);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>اختبار APIs</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={testCoinGecko} disabled={loading}>
          {loading ? 'جلب...' : 'اختبار CoinGecko'}
        </Button>
        {data && (
          <pre className="mt-4 p-4 bg-gray-100 rounded text-xs overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
}