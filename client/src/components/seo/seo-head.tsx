import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
}

export function SEOHead({ 
  title = "YASER CRYPTO - تحليل العملات المشفرة بنظرية موجات إليوت",
  description = "منصة متخصصة في تحليل العملات المشفرة باستخدام نظرية موجات إليوت المتقدمة. بيانات حقيقية مباشرة من OKX و Binance، إشارات تداول دقيقة، أفضل 100 عملة مشفرة.",
  keywords = "Elliott Wave, موجات إليوت, تحليل العملات المشفرة, Bitcoin, تداول, إشارات تداول, فيبوناتشي, تحليل فني",
  url = "https://yasercrypto.replit.app/"
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="YASER CRYPTO" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Arabic" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="YASER CRYPTO" />
      <meta property="og:locale" content="ar_SA" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
}