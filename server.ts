import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { vite } from './vite-middleware.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// --- Global Shared State ---
let globalState = {
  tasks: [
    { id: '1', title: 'Estudiar Bio C5', completed: false, priority: 'high', subject: 'Biología' },
    { id: '2', title: 'Plan Historial', completed: true, priority: 'medium', subject: 'Historia' },
    { id: '3', title: 'Revisar Notas', completed: false, priority: 'low', subject: 'Matemáticas' },
  ],
  subjects: [
    { id: '1', name: 'Biología', color: 'bg-emerald-500', grade: 92, schedule: 'Lun, Mié 10:00', tasks: 4 },
    { id: '2', name: 'Historia', color: 'bg-orange-500', grade: 88, schedule: 'Mar, Jue 12:00', tasks: 2 },
    { id: '3', name: 'Matemáticas', color: 'bg-blue-500', grade: 95, schedule: 'Vie 08:00', tasks: 5 },
  ],
  notes: [
    { id: 'n1', title: 'Resumen de Bioquímica', folder: 'Resúmenes', color: 'text-emerald-500' },
    { id: 'n2', title: 'Lectura Histórica', folder: 'Lecturas', color: 'text-orange-500' },
  ],
  sleepHours: 7,
  focusHours: 4,
  vibe: 'vibrant',
  accentColor: '#10b981',
  activeUsers: 0
};

// --- Socket Logic ---
io.on('connection', (socket) => {
  globalState.activeUsers++;
  socket.emit('state:sync', globalState);
  io.emit('users:count', globalState.activeUsers);

  socket.on('state:update', (newState) => {
    globalState = { ...globalState, ...newState };
    io.emit('state:sync', globalState);
  });

  socket.on('task:toggle', (id) => {
    globalState.tasks = globalState.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    io.emit('state:sync', globalState);
  });

  socket.on('task:add', (task) => {
    globalState.tasks.unshift(task);
    io.emit('state:sync', globalState);
  });

  socket.on('task:delete', (id) => {
    globalState.tasks = globalState.tasks.filter(t => t.id !== id);
    io.emit('state:sync', globalState);
  });

  socket.on('subject:add', (subject) => {
    globalState.subjects.push(subject);
    io.emit('state:sync', globalState);
  });

  socket.on('subject:delete', (id) => {
    globalState.subjects = globalState.subjects.filter(s => s.id !== id);
    io.emit('state:sync', globalState);
  });

  socket.on('note:add', (note) => {
    globalState.notes.unshift(note);
    io.emit('state:sync', globalState);
  });

  socket.on('note:delete', (id) => {
    globalState.notes = globalState.notes.filter(n => n.id !== id);
    io.emit('state:sync', globalState);
  });

  socket.on('disconnect', () => {
    globalState.activeUsers--;
    io.emit('users:count', globalState.activeUsers);
  });
});

app.use(vite.middlewares);

app.get('*', async (req, res, next) => {
  const url = req.originalUrl;
  try {
    let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
    template = await vite.transformIndexHtml(url, template);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
  } catch (e) {
    vite.ssrFixStacktrace(e as Error);
    next(e);
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
