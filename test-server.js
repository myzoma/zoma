// Simple test server to verify basic functionality
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Test Server Working</h1><p>Port 5000 is responding correctly.</p>');
});

app.get('/api/test', (req, res) => {
  res.json({ status: 'working', time: new Date().toISOString() });
});

const port = 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Test server running on port ${port}`);
});