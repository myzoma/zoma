import express from 'express';
import path from 'path';

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(express.static('client'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'client', 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Visit http://localhost:${port} to view the application`);
});