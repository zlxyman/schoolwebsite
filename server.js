import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint for Cloud Run
app.all('/health', (req, res) => {
  res.status(200).send('OK');
});

// Serve static files from the public directory with automatic html extension resolution
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html', 'htm']
}));

// Fallback to index.html for unrecognized routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
    if (err && !res.headersSent) {
      res.status(404).send('Not Found');
    }
  });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown handling for Cloud Run container lifecycle
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0);
  });
});
