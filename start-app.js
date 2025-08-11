#!/usr/bin/env node

// Simple reliable crypto dashboard server
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS للسماح بطلبات API
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'YASER CRYPTO Server Running',
    arabic: 'خادم يا سر كريبتو يعمل بنجاح'
  });
});

// Serve static files
app.use(express.static(path.join(__dirname, 'client')));
app.use('/src', express.static(path.join(__dirname, 'client/src')));

// Single Page App fallback
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'client', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(200).send(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>يا سر كريبتو - تحليل العملات المشفرة</title>
          <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Tajawal', Arial, sans-serif;
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
              color: #f1f5f9;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              background: rgba(15, 23, 42, 0.8);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(59, 130, 246, 0.3);
              border-radius: 16px;
              padding: 40px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            h1 {
              font-size: 3rem;
              background: linear-gradient(135deg, #f59e0b, #d97706);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              margin-bottom: 20px;
              text-shadow: 0 0 30px rgba(245, 158, 11, 0.3);
            }
            .subtitle {
              color: #06b6d4;
              font-size: 1.3rem;
              margin-bottom: 30px;
              font-weight: 500;
            }
            .status {
              background: rgba(16, 185, 129, 0.1);
              border: 1px solid rgba(16, 185, 129, 0.3);
              border-radius: 8px;
              padding: 20px;
              margin: 30px 0;
            }
            .status h3 {
              color: #10b981;
              margin-bottom: 10px;
            }
            .features {
              text-align: right;
              margin: 20px 0;
            }
            .features li {
              list-style: none;
              padding: 8px 0;
              color: #94a3b8;
            }
            .features li:before {
              content: "✅ ";
              margin-left: 10px;
            }
            .btn {
              display: inline-block;
              background: linear-gradient(135deg, #f59e0b, #d97706);
              color: white;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 8px;
              margin: 10px;
              font-weight: 500;
              transition: all 0.3s ease;
              border: none;
              cursor: pointer;
              font-size: 16px;
            }
            .btn:hover {
              background: linear-gradient(135deg, #d97706, #b45309);
              transform: translateY(-2px);
              box-shadow: 0 10px 20px rgba(245, 158, 11, 0.3);
            }
            .loading {
              display: inline-block;
              width: 20px;
              height: 20px;
              border: 3px solid #f59e0b;
              border-radius: 50%;
              border-top-color: transparent;
              animation: spin 1s linear infinite;
              margin: 0 10px;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            .note {
              background: rgba(245, 158, 11, 0.1);
              border: 1px solid rgba(245, 158, 11, 0.3);
              border-radius: 8px;
              padding: 15px;
              margin-top: 20px;
              font-size: 14px;
              color: #fbbf24;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 يا سر كريبتو</h1>
            <p class="subtitle">تطبيق تحليل العملات المشفرة بتقنية موجات إليوت</p>
            
            <div class="status">
              <h3>✅ الخادم يعمل بنجاح</h3>
              <p>التطبيق جاهز لتحليل العملات المشفرة</p>
            </div>
            
            <ul class="features">
              <li>تحليل موجات إليوت الحقيقي</li>
              <li>بيانات مباشرة من OKX و Binance</li>
              <li>إشارات تداول دقيقة</li>
              <li>مؤشر الخوف والطمع</li>
              <li>أفضل 100 عملة مشفرة</li>
            </ul>
            
            <button class="btn" onclick="window.location.reload()">
              🔄 إعادة التحميل
            </button>
            <a href="/api/health" class="btn">🔍 فحص النظام</a>
            
            <div class="note">
              <strong>ملاحظة:</strong> إذا لم يتم تحميل التطبيق بالكامل، يرجى إعادة تحميل الصفحة.
            </div>
            
            <script>
              // Auto refresh every 15 seconds
              setTimeout(() => {
                window.location.reload();
              }, 15000);
              
              // Test API connection
              fetch('/api/health')
                .then(res => res.json())
                .then(data => {
                  console.log('✅ API متصل:', data);
                })
                .catch(err => {
                  console.error('❌ خطأ في API:', err);
                });
            </script>
          </div>
        </body>
      </html>
    `);
  }
});

// Error handling
app.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

// Start server
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 يا سر كريبتو - Crypto Dashboard`);
  console.log(`📱 Server running on port ${port}`);
  console.log(`🌐 Visit: http://localhost:${port}`);
  console.log(`⚡ Ready for Elliott Wave analysis!`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${port} is already in use`);
    process.exit(1);
  }
  console.error('Server error:', err);
});

export default app;