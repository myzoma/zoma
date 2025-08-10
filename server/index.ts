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

    // temporarily bypass vite to fix hanging issue
    console.log("Setting up static file serving...");
    
    // Serve static files from client directory
    app.use(express.static('client'));
    
    // Fallback route for React Router
    app.get('*', (req, res) => {
      try {
        res.sendFile(path.join(process.cwd(), 'client', 'index.html'));
      } catch (error) {
        console.error('Error serving index.html:', error);
        res.status(500).send(`
          <!DOCTYPE html>
          <html dir="rtl" lang="ar">
            <head>
              <title>يا سر كريبتو - لوحة التحكم</title>
              <meta charset="utf-8">
              <style>
                body { 
                  font-family: Arial; 
                  text-align: center; 
                  padding: 50px; 
                  background: #111; 
                  color: #fff; 
                }
                .loading { color: #fbbf24; }
              </style>
            </head>
            <body>
              <h1>🚀 يا سر كريبتو</h1>
              <p class="loading">تطبيق تحليل العملات المشفرة بتقنية موجات إليوت</p>
              <p>يتم تحضير التطبيق...</p>
              <script>
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
              </script>
            </body>
          </html>
        `);
      }
    });

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
