import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    const server = await registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      console.error("Server error:", err);
    });

    // Setup Vite in development mode with proper error handling
    if (app.get("env") === "development") {
      console.log("Setting up Vite development server...");
      try {
        // Set a shorter timeout and better error handling
        const setupPromise = setupVite(app, server);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Vite setup timeout after 10s')), 10000)
        );
        
        await Promise.race([setupPromise, timeoutPromise]);
        console.log("Vite setup completed successfully");
        
      } catch (viteError: any) {
        console.error("Vite setup failed, falling back to static serving:", viteError?.message || viteError);
        
        // Fallback to static file serving
        app.use(express.static('client'));
        app.get('*', (req, res) => {
          res.status(200).send(`
            <!DOCTYPE html>
            <html dir="rtl" lang="ar">
              <head>
                <title>يا سر كريبتو - تحليل العملات المشفرة</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body { 
                    font-family: 'Tajawal', Arial, sans-serif; 
                    text-align: center; 
                    padding: 50px; 
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    color: #f1f5f9; 
                    margin: 0;
                  }
                  h1 { 
                    color: #f59e0b; 
                    font-size: 2.5rem; 
                    margin-bottom: 20px;
                    text-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
                  }
                  .subtitle { 
                    color: #06b6d4; 
                    font-size: 1.2rem; 
                    margin-bottom: 30px; 
                  }
                  .notice {
                    background: rgba(245, 158, 11, 0.1);
                    border: 1px solid rgba(245, 158, 11, 0.3);
                    border-radius: 8px;
                    padding: 20px;
                    margin: 30px auto;
                    max-width: 600px;
                  }
                  .btn {
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 6px;
                    font-size: 16px;
                    cursor: pointer;
                    margin: 10px;
                    text-decoration: none;
                    display: inline-block;
                  }
                  .btn:hover {
                    background: linear-gradient(135deg, #d97706, #b45309);
                  }
                </style>
              </head>
              <body>
                <h1>🚀 يا سر كريبتو</h1>
                <p class="subtitle">تطبيق تحليل العملات المشفرة بتقنية موجات إليوت</p>
                
                <div class="notice">
                  <h3>⚠️ الخادم في وضع التطوير المبسط</h3>
                  <p>يعمل التطبيق حالياً بدون Vite للاستقرار. قد تحتاج لإعادة تشغيل التطبيق للحصول على الميزات الكاملة.</p>
                  <p><strong>API جاهز:</strong> ✅ الاتصال مع OKX و Binance يعمل</p>
                  <button class="btn" onclick="window.location.reload()">🔄 إعادة التحميل</button>
                  <a href="/api/health" class="btn">🔍 فحص الخادم</a>
                </div>
                
                <script>
                  // Auto-refresh every 30 seconds to check for full app availability
                  setTimeout(() => {
                    window.location.reload();
                  }, 30000);
                </script>
              </body>
            </html>
          `);
        });
      }
    } else {
      serveStatic(app);
    }

    // ALWAYS serve the app on the port specified in the environment variable PORT
    // Other ports are firewalled. Default to 5000 if not specified.
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = parseInt(process.env.PORT || '5000', 10);
    
    server.on('error', (err) => {
      console.error('Server error:', err);
    });

    server.listen(port, "0.0.0.0", () => {
      log(`serving on port ${port}`);
      console.log(`Server is ready and accepting connections on port ${port}`);
      console.log(`Visit http://localhost:${port} to view the application`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
})();
