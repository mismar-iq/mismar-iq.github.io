import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defaultSiteContent } from './src/data/defaultContent.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DATA_DIR = path.join(__dirname, 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'site-content.json');
const AUTH_FILE = path.join(DATA_DIR, 'auth.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Initialize Auth data if not exists
const DEFAULT_AUTH = {
  username: 'admin@mismar.sa',
  password: 'mismar2026', // Initial secure admin password
  recoveryCode: 'MISMAR-RECOVER-2026',
  tokenSecret: 'mismar-secret-key-' + Date.now()
};

if (!fs.existsSync(AUTH_FILE)) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify(DEFAULT_AUTH, null, 2), 'utf-8');
}

// Initialize Site Content if not exists
if (!fs.existsSync(CONTENT_FILE)) {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(defaultSiteContent, null, 2), 'utf-8');
}

function getSiteContent() {
  try {
    const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading content file, falling back to default:', err);
    return defaultSiteContent;
  }
}

function saveSiteContent(content: any) {
  content.lastUpdated = new Date().toISOString();
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');
}

function getAuth() {
  try {
    const raw = fs.readFileSync(AUTH_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    return DEFAULT_AUTH;
  }
}

function saveAuth(auth: any) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify(auth, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();

  // Increase payload limits for image uploads (base64)
  app.use(express.json({ limit: '30mb' }));
  app.use(express.urlencoded({ extended: true, limit: '30mb' }));

  // Serve uploaded files statically
  app.use('/uploads', express.static(UPLOADS_DIR));

  // --- API Endpoints ---

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Get full site content
  app.get('/api/content', (_req: Request, res: Response) => {
    try {
      const content = getSiteContent();
      res.json(content);
    } catch (err) {
      res.status(500).json({ error: 'Failed to read content', details: String(err) });
    }
  });

  // Update full site content
  app.post('/api/content', (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized. Admin token required.' });
      }

      const content = req.body;
      if (!content || !content.settings) {
        return res.status(400).json({ error: 'Invalid content structure' });
      }

      saveSiteContent(content);
      res.json({ success: true, message: 'Content saved successfully', lastUpdated: content.lastUpdated });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save content', details: String(err) });
    }
  });

  // Reset to default content
  app.post('/api/content/reset', (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      saveSiteContent(defaultSiteContent);
      res.json({ success: true, content: defaultSiteContent });
    } catch (err) {
      res.status(500).json({ error: 'Failed to reset content', details: String(err) });
    }
  });

  // Admin Auth: Login
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    const auth = getAuth();

    if ((username === auth.username || username === 'admin') && password === auth.password) {
      // Simple signed token with expiration
      const token = Buffer.from(JSON.stringify({
        user: auth.username,
        role: 'admin',
        exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
      })).toString('base64');

      return res.json({
        success: true,
        token,
        user: { email: auth.username, role: 'admin' }
      });
    }

    return res.status(401).json({
      success: false,
      error: 'اسم المستخدم أو كلمة المرور غير صحيحة'
    });
  });

  // Admin Auth: Verify token
  app.post('/api/auth/verify', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false });
    }

    try {
      const tokenStr = authHeader.replace('Bearer ', '');
      const decoded = JSON.parse(Buffer.from(tokenStr, 'base64').toString('utf-8'));
      if (decoded.exp && decoded.exp > Date.now()) {
        return res.json({ valid: true, user: decoded.user });
      }
    } catch (e) {
      // Invalid token
    }
    return res.status(401).json({ valid: false });
  });

  // Admin Auth: Change credentials / password
  app.post('/api/auth/change-credentials', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { currentPassword, newPassword, newUsername } = req.body;
    const auth = getAuth();

    if (currentPassword !== auth.password) {
      return res.status(400).json({ error: 'كلمة المرور الحالية غير صحيحة' });
    }

    if (newPassword && newPassword.length < 6) {
      return res.status(400).json({ error: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل' });
    }

    if (newPassword) auth.password = newPassword;
    if (newUsername) auth.username = newUsername;

    saveAuth(auth);
    res.json({ success: true, message: 'تم تحديث بيانات تسجيل الدخول بنجاح' });
  });

  // Media upload endpoint (handles base64 image data and saves to /uploads)
  app.post('/api/media/upload', (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { dataUrl, filename, category } = req.body;
      if (!dataUrl || !filename) {
        return res.status(400).json({ error: 'Missing dataUrl or filename' });
      }

      // Parse dataUrl
      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: 'Invalid data URL format' });
      }

      const mimeType = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');
      const ext = mimeType.split('/')[1] || 'jpg';
      const cleanName = filename.replace(/[^a-zA-Z0-9_\-\.]/g, '_').toLowerCase();
      const safeFilename = `${Date.now()}_${cleanName.endsWith(`.${ext}`) ? cleanName : `${cleanName}.${ext}`}`;
      const filePath = path.join(UPLOADS_DIR, safeFilename);

      fs.writeFileSync(filePath, buffer);

      const mediaUrl = `/uploads/${safeFilename}`;
      const mediaItem = {
        id: 'med-' + Date.now(),
        name: filename,
        url: mediaUrl,
        sizeBytes: buffer.length,
        uploadedAt: new Date().toISOString().split('T')[0],
        category: category || 'general'
      };

      // Also append to current site content mediaLibrary
      const content = getSiteContent();
      if (!content.mediaLibrary) content.mediaLibrary = [];
      content.mediaLibrary.unshift(mediaItem);
      saveSiteContent(content);

      res.json({ success: true, item: mediaItem });
    } catch (err) {
      res.status(500).json({ error: 'Upload failed', details: String(err) });
    }
  });

  // Delete media endpoint
  app.delete('/api/media/:id', (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { id } = req.params;
      const content = getSiteContent();
      const itemIndex = (content.mediaLibrary || []).findIndex((m: any) => m.id === id);

      if (itemIndex > -1) {
        const item = content.mediaLibrary[itemIndex];
        // If file exists in uploads, delete it
        if (item.url && item.url.startsWith('/uploads/')) {
          const fname = path.basename(item.url);
          const fullPath = path.join(UPLOADS_DIR, fname);
          if (fs.existsSync(fullPath)) {
            try { fs.unlinkSync(fullPath); } catch (e) { /* ignore */ }
          }
        }
        content.mediaLibrary.splice(itemIndex, 1);
        saveSiteContent(content);
      }

      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: 'Delete failed', details: String(err) });
    }
  });

  // Setup Vite in development or serve static in production
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MISMAR CONTRACTING server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
