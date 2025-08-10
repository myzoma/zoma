// Simple working server to get the app running
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static('client'));

// API routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'Crypto Dashboard Server Running'
  });
});

// Serve the React app for all other routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'client', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(500).send(`
        <!DOCTYPE html>
        <html dir="rtl" lang="ar">
          <head>
            <title>يا سر كريبتو - Dashboard</title>
            <meta charset="utf-8">
            <style>
              body { 
                font-family: 'Tajawal', Arial, sans-serif; 
                text-align: center; 
                padding: 50px; 
                background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
                color: #fff; 
                margin: 0;
              }
              h1 { color: #f59e0b; font-size: 2.5rem; margin-bottom: 20px; }
              .subtitle { color: #06b6d4; font-size: 1.2rem; margin-bottom: 30px; }
              .status { color: #10b981; font-size: 1rem; }
              .loading {
                display: inline-block;
                width: 20px;
                height: 20px;
                border: 3px solid #f59e0b;
                border-radius: 50%;
                border-top-color: transparent;
                animation: spin 1s ease-in-out infinite;
              }
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            </style>
          </head>
          <body>
            <h1>🚀 يا سر كريبتو</h1>
            <p class="subtitle">تطبيق تحليل العملات المشفرة بتقنية موجات إليوت</p>
            <div class="loading"></div>
            <p class="status">يتم تحضير التطبيق...</p>
            <script>
              setTimeout(() => window.location.reload(), 3000);
            </script>
          </body>
        </html>
      `);
    }
  });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`);
  console.log(`📱 Visit http://localhost:${port} to view the crypto dashboard`);
  console.log(`🔥 يا سر كريبتو - Crypto Dashboard Ready!`);
});

// Handle errors
app.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});