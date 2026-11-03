import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  CheckCircle2, 
  Circle, 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  FolderSearch, 
  Plus, 
  Moon as Sleep,
  Brain,
  ChevronRight,
  Clock,
  Star,
  Zap,
  TrendingUp,
  Trash2,
  X,
  Users,
  FileText,
  AlertCircle,
  Share2,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { io } from 'socket.io-client';

const socket = io();

// --- Types ---
type View = 'login' | 'onboarding' | 'preferences' | 'dashboard' | 'tasks' | 'subjects' | 'notes';
type Theme = 'light' | 'dark';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  subject: string;
}

interface Subject {
  id: string;
  name: string;
  color: string;
  grade: number;
  schedule: string;
  tasks: number;
}

interface Note {
  id: string;
  title: string;
  folder: string;
  color: string;
}

// --- Backgrounds ---
const VIBRANT_BG = "/src/assets/images/vibrant_abstract_bg_1793677544588.jpg";
const RELAXING_BG = "/src/assets/images/relaxing_minimal_bg_1793677558175.jpg";

// --- Sub-Components ---

const LoginView = ({ setView, activeUsers }: { setView: (v: View) => void, activeUsers: number }) => (
  <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
    <div className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000" style={{ backgroundImage: `url(${RELAXING_BG})` }} />
    <div className="absolute inset-0 z-0 bg-white/30 backdrop-blur-md" />
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50 dark:border-slate-700/50">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Zap className="text-white" size={32} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2 font-display tracking-tight">LYNKED</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Tu semestre simplificado, en un solo lugar</p>
      </div>
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Correo Institucional</label>
          <input type="email" placeholder="nombre@universidad.edu" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-400 outline-none transition-all dark:text-white font-medium" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
          <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-400 outline-none transition-all dark:text-white font-medium" />
        </div>
      </div>
      <div className="mt-10 space-y-4">
        <button onClick={() => setView('onboarding')} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]">INICIAR SESIÓN</button>
        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4">
          <Users size={14} className="text-emerald-500" />
          <span>{activeUsers} Usuarios Activos</span>
        </div>
      </div>
    </motion.div>
  </div>
);

const OnboardingView = ({ setView, user, setUser }: { setView: (v: View) => void, user: any, setUser: (u: any) => void }) => (
  <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
    <div className="absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000" style={{ backgroundImage: `url(${RELAXING_BG})` }} />
    <div className="absolute inset-0 z-0 bg-white/30 backdrop-blur-md" />
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-white/50 dark:border-slate-700/50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 font-display tracking-tight">Completa tu Perfil</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Personaliza tu experiencia académica</p>
      </div>
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">¿Cómo te llamas?</label>
          <input type="text" placeholder="Ej. Sandy Oropeza" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-400 outline-none transition-all dark:text-white font-medium" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Institución</label>
          <input type="text" placeholder="Ej. UAQ" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-400 outline-none transition-all dark:text-white font-medium" value={user.institution} onChange={(e) => setUser({...user, institution: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Semestre</label>
          <input type="text" placeholder="Ej. 8vo" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-emerald-400 outline-none transition-all dark:text-white font-medium" value={user.semester} onChange={(e) => setUser({...user, semester: e.target.value})} />
        </div>
      </div>
      <button onClick={() => setView('preferences')} className="w-full mt-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
        ¡SIGUIENTE!
        <ChevronRight size={20} />
      </button>
    </motion.div>
  </div>
);

const PreferencesView = ({ setView, accentColor, updateSharedState }: { setView: (v: View) => void, accentColor: string, updateSharedState: (u: any) => void }) => (
  <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
    <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${RELAXING_BG})` }} />
    <div className="absolute inset-0 z-0 bg-white/30 backdrop-blur-md" />
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 w-full max-w-md bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Configura tu espacio</h2>
      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Color Global (Compartido)</h3>
          <div className="flex flex-wrap gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
            {['#10b981', '#6366f1', '#f43f5e', '#f59e0b', '#8b5cf6', '#06b6d4'].map((color) => (
              <button key={color} onClick={() => updateSharedState({ accentColor: color })} className={`w-10 h-10 rounded-xl transition-all border-2 ${accentColor === color ? 'border-slate-900 dark:border-white scale-110 shadow-lg' : 'border-transparent opacity-70 hover:opacity-100'}`} style={{ backgroundColor: color }} />
            ))}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-transparent group">
              <input type="color" value={accentColor} onChange={(e) => updateSharedState({ accentColor: e.target.value })} className="absolute inset-[-4px] w-[200%] h-[200%] cursor-pointer" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-white/20">
                <Plus size={16} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => setView('dashboard')} className="w-full mt-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
        ¡CREAR MI ESPACIO!
        <Plus size={20} />
      </button>
    </motion.div>
  </div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('login');
  const [theme, setTheme] = useState<Theme>('light');
  
  // Shared State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [sleepHours, setSleepHours] = useState(7);
  const [focusHours, setFocusHours] = useState(4);
  const [vibe, setVibe] = useState<'vibrant' | 'relaxing'>('vibrant');
  const [accentColor, setAccentColor] = useState('#10b981');
  const [activeUsers, setActiveUsers] = useState(1);

  // Local User Profile
  const [user, setUser] = useState({ name: '', institution: '', semester: '' });

  // Modals state
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showAddNote, setShowAddNote] = useState(false);

  // New item forms
  const [newSubject, setNewSubject] = useState({ name: '', schedule: '', color: 'bg-emerald-500' });
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium' as Task['priority'], subject: '' });
  const [newNote, setNewNote] = useState({ title: '', folder: 'Resúmenes' });

  // Socket Sync
  useEffect(() => {
    socket.on('state:sync', (state) => {
      setTasks(state.tasks || []);
      setSubjects(state.subjects || []);
      setNotes(state.notes || []);
      setSleepHours(state.sleepHours);
      setFocusHours(state.focusHours);
      setVibe(state.vibe);
      setAccentColor(state.accentColor);
    });

    socket.on('users:count', (count) => setActiveUsers(count));

    return () => {
      socket.off('state:sync');
      socket.off('users:count');
    };
  }, []);

  const updateSharedState = (update: any) => {
    socket.emit('state:update', update);
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // --- Handlers ---
  const handleTaskToggle = (id: string) => socket.emit('task:toggle', id);
  const handleAddTask = () => {
    if (!newTask.title) return;
    socket.emit('task:add', { id: Date.now().toString(), ...newTask, completed: false });
    setNewTask({ title: '', priority: 'medium', subject: '' });
    setShowAddTask(false);
  };
  const handleDeleteTask = (id: string) => socket.emit('task:delete', id);

  const handleAddSubject = () => {
    if (!newSubject.name) return;
    socket.emit('subject:add', { id: Date.now().toString(), ...newSubject, grade: 0, tasks: 0 });
    setNewSubject({ name: '', schedule: '', color: 'bg-emerald-500' });
    setShowAddSubject(false);
  };
  const handleDeleteSubject = (id: string) => socket.emit('subject:delete', id);

  const handleAddNote = () => {
    if (!newNote.title) return;
    socket.emit('note:add', { id: Date.now().toString(), ...newNote, color: 'text-emerald-500' });
    setNewNote({ title: '', folder: 'Resúmenes' });
    setShowAddNote(false);
  };
  const handleDeleteNote = (id: string) => socket.emit('note:delete', id);

  const progress = tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0;

  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // If copy fails, we just show the modal anyway so they can see the link
    }
    setShowShareModal(true);
  };

  const ShareModal = () => (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative border border-white/20">
        <button onClick={() => setShowShareModal(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
          <X size={20} />
        </button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-3xl mx-auto mb-4 flex items-center justify-center">
            <Share2 className="text-indigo-500" size={32} />
          </div>
          <h2 className="text-2xl font-bold dark:text-white mb-2">¡Comparte LYNKED!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Copia el link de abajo y envíalo a tus compañeros para que se unan en tiempo real.</p>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl break-all font-mono text-xs text-slate-600 dark:text-slate-300">
            {window.location.href}
          </div>
          
          <button 
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'}`}
          >
            {copied ? <Check size={20} /> : <Plus size={20} />}
            {copied ? '¡COPIADO CON ÉXITO!' : 'COPIAR LINK'}
          </button>
        </div>
        
        <p className="mt-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cualquier persona con el link podrá editar</p>
      </motion.div>
    </div>
  );

  // --- Render Sections ---

  const DashboardSection = () => (
    <div className="pb-24">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Hola, {user.name || 'Estudiante'}</h2>
          <p className="text-slate-500 dark:text-slate-400">{user.semester || '8vo'} Semestre · {user.institution || 'UAQ'}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleShare}
            className={`p-3 rounded-2xl shadow-sm border transition-all flex items-center gap-2 ${copied ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}
          >
            {copied ? <Check size={20} /> : <Share2 size={20} />}
            <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">{copied ? 'Copiado' : 'Compartir'}</span>
          </button>
          <button onClick={() => updateSharedState({ vibe: vibe === 'vibrant' ? 'relaxing' : 'vibrant' })} className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-xs font-bold uppercase tracking-wider dark:text-white">{vibe === 'vibrant' ? 'Energía' : 'Relax'}</button>
          <button onClick={toggleTheme} className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">{theme === 'light' ? <Moon size={20} className="text-slate-600" /> : <Sun size={20} className="text-yellow-400" />}</button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-full w-fit"><Users size={14} className="text-emerald-500" /><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{activeUsers} Compañeros en línea</span></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4 text-indigo-500"><div className="flex items-center gap-3"><Clock size={20} /><span className="font-bold">Sueño</span></div><span className="text-xl font-mono font-bold dark:text-white">{sleepHours}h / 8h</span></div>
          <div className="h-3 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden"><motion.div animate={{ width: `${(sleepHours / 8) * 100}%` }} className="h-full bg-indigo-500 rounded-full" /></div>
          <div className="flex justify-between mt-4"><button onClick={() => updateSharedState({ sleepHours: Math.max(0, sleepHours - 1) })} className="p-1 px-3 bg-slate-50 rounded-lg text-xs font-bold">-</button><button onClick={() => updateSharedState({ sleepHours: Math.min(12, sleepHours + 1) })} className="p-1 px-3 bg-slate-50 rounded-lg text-xs font-bold">+</button></div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4 text-orange-500"><div className="flex items-center gap-3"><Brain size={20} /><span className="font-bold">Enfoque</span></div><span className="text-xl font-mono font-bold dark:text-white">{focusHours}h</span></div>
          <div className="flex items-center gap-2">{[1, 2, 3, 4, 5, 6].map(i => (<div key={i} className={`flex-1 h-3 rounded-full ${i <= focusHours ? 'bg-orange-500' : 'bg-slate-100 dark:bg-slate-700'}`} />))}</div>
          <div className="flex justify-between mt-4"><button onClick={() => updateSharedState({ focusHours: Math.max(0, focusHours - 1) })} className="p-1 px-3 bg-slate-50 rounded-lg text-xs font-bold">-</button><button onClick={() => updateSharedState({ focusHours: Math.min(6, focusHours + 1) })} className="p-1 px-3 bg-slate-50 rounded-lg text-xs font-bold">+</button></div>
        </div>
      </div>

      <div className="p-6 rounded-3xl shadow-lg text-white mb-8 transition-colors duration-500" style={{ backgroundColor: accentColor }}>
        <div className="flex justify-between items-center mb-2"><span className="text-sm font-bold opacity-90 uppercase tracking-widest">Semestre</span><span className="text-2xl font-black">{Math.round(progress)}%</span></div>
        <div className="h-3 w-full bg-white/30 rounded-full overflow-hidden"><motion.div animate={{ width: `${progress}%` }} className="h-full bg-white rounded-full shadow-sm" /></div>
      </div>
    </div>
  );

  const TasksSection = () => (
    <div className="pb-24 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold dark:text-white">Tareas</h2>
        <div className="flex gap-2">
          <button onClick={() => updateSharedState({ tasks: tasks.filter(t => !t.completed) })} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:underline px-2">Limpiar Completadas</button>
          <button onClick={() => setShowAddTask(true)} className="p-3 text-white rounded-2xl shadow-lg" style={{ backgroundColor: accentColor }}><Plus size={24} /></button>
        </div>
      </div>
      <div className="grid gap-3">
        {tasks.map(task => (
          <motion.div key={task.id} layout className={`flex items-center gap-4 p-4 rounded-2xl border group transition-all ${task.completed ? 'bg-slate-50 dark:bg-slate-800/50 opacity-60' : 'bg-white dark:bg-slate-800 shadow-sm'}`}>
            <div className="cursor-pointer" onClick={() => handleTaskToggle(task.id)}>
              {task.completed ? <CheckCircle2 size={24} style={{ color: accentColor }} /> : <Circle size={24} className="text-slate-300" />}
            </div>
            <div className="flex-1" onClick={() => handleTaskToggle(task.id)}>
              <p className={`font-bold ${task.completed ? 'line-through text-slate-400' : 'dark:text-white'}`}>{task.title}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{task.subject}</p>
            </div>
            <button onClick={() => handleDeleteTask(task.id)} className="p-3 text-red-400 opacity-60 hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all" title="Eliminar tarea">
              <Trash2 size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const SubjectsSection = () => (
    <div className="pb-24 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold dark:text-white">Materias</h2>
        <div className="flex gap-2">
          <button onClick={() => updateSharedState({ subjects: [] })} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:underline px-2">Borrar Todas</button>
          <button onClick={() => setShowAddSubject(true)} className="p-3 text-white rounded-2xl shadow-lg" style={{ backgroundColor: accentColor }}><Plus size={24} /></button>
        </div>
      </div>
      <div className="grid gap-4">
        {subjects.map(s => (
          <motion.div key={s.id} layout className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm relative group">
            <div className={`absolute left-0 top-0 w-2 h-full ${s.color}`} />
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold dark:text-white">{s.name}</h3>
                <p className="text-sm text-slate-500">{s.schedule}</p>
              </div>
              <button onClick={() => handleDeleteSubject(s.id)} className="p-3 text-red-400 opacity-60 hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all" title="Eliminar materia">
                <Trash2 size={24} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const NotesSection = () => (
    <div className="pb-24 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-extrabold dark:text-white">Apuntes</h2>
        <div className="flex gap-2">
          <button onClick={() => updateSharedState({ notes: [] })} className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:underline px-2">Borrar Todos</button>
          <button onClick={() => setShowAddNote(true)} className="p-3 text-white rounded-2xl shadow-lg" style={{ backgroundColor: accentColor }}><Plus size={24} /></button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map(note => (
          <motion.div key={note.id} layout className="bg-white dark:bg-slate-800 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm group">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center"><FileText size={20} style={{ color: accentColor }} /></div>
                <div>
                  <h4 className="font-bold dark:text-white">{note.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{note.folder}</p>
                </div>
              </div>
              <button onClick={() => handleDeleteNote(note.id)} className="p-3 text-red-400 opacity-60 hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all">
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`font-body min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'dark bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <AnimatePresence mode="wait">
        {view === 'login' && <LoginView key="l" setView={setView} activeUsers={activeUsers} />}
        {view === 'onboarding' && <OnboardingView key="o" setView={setView} user={user} setUser={setUser} />}
        {view === 'preferences' && <PreferencesView key="p" setView={setView} accentColor={accentColor} updateSharedState={updateSharedState} />}
        {(view !== 'login' && view !== 'onboarding' && view !== 'preferences') && (
          <div key="m" className="relative min-h-screen">
            <motion.div key={vibe} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${vibe === 'vibrant' ? VIBRANT_BG : RELAXING_BG})` }} />
            <div className={`fixed inset-0 z-0 backdrop-blur-[100px] ${vibe === 'vibrant' ? 'bg-white/90 dark:bg-slate-950/95' : 'bg-slate-50/80 dark:bg-slate-950/90'}`} />
            <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]" style={{ backgroundColor: accentColor }} />

            <div className="relative z-10 container mx-auto px-6 pt-10 pb-32 max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                  {view === 'dashboard' && <DashboardSection />}
                  {view === 'tasks' && <TasksSection />}
                  {view === 'subjects' && <SubjectsSection />}
                  {view === 'notes' && <NotesSection />}
                </motion.div>
              </AnimatePresence>
            </div>

            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 px-6 py-4">
              <div className="flex justify-between items-center max-w-md mx-auto">
                {[{ id: 'dashboard', icon: LayoutDashboard, label: 'Inicio' }, { id: 'tasks', icon: Calendar, label: 'Tareas' }, { id: 'subjects', icon: BookOpen, label: 'Materias' }, { id: 'notes', icon: FolderSearch, label: 'Apuntes' }].map((item) => (
                  <button key={item.id} onClick={() => setView(item.id as View)} className={`flex flex-col items-center gap-1 transition-all ${view === item.id ? 'scale-110' : 'text-slate-400 opacity-60'}`} style={{ color: view === item.id ? accentColor : undefined }}>
                    <item.icon size={24} />
                    <span className="text-[10px] font-bold uppercase">{item.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            {/* Modals */}
            {showAddTask && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl relative">
                  <button onClick={() => setShowAddTask(false)} className="absolute top-6 right-6 p-2"><X size={20} /></button>
                  <h2 className="text-2xl font-bold mb-6 dark:text-white">Nueva Tarea</h2>
                  <div className="space-y-4">
                    <input type="text" placeholder="¿Qué hay que hacer?" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} />
                    <select className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none appearance-none" value={newTask.subject} onChange={(e) => setNewTask({...newTask, subject: e.target.value})}>
                      <option value="">Selecciona materia</option>
                      {subjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                    <button onClick={handleAddTask} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl">AGREGAR TAREA</button>
                  </div>
                </motion.div>
              </div>
            )}

            {showAddSubject && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl relative">
                  <button onClick={() => setShowAddSubject(false)} className="absolute top-6 right-6 p-2"><X size={20} /></button>
                  <h2 className="text-2xl font-bold mb-6 dark:text-white">Nueva Materia</h2>
                  <div className="space-y-4">
                    <input type="text" placeholder="Nombre de la materia" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none" value={newSubject.name} onChange={(e) => setNewSubject({...newSubject, name: e.target.value})} />
                    <input type="text" placeholder="Horario" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none" value={newSubject.schedule} onChange={(e) => setNewSubject({...newSubject, schedule: e.target.value})} />
                    <div className="flex gap-2">{['bg-emerald-500', 'bg-blue-500', 'bg-orange-500', 'bg-purple-500'].map(c => (<button key={c} onClick={() => setNewSubject({...newSubject, color: c})} className={`w-8 h-8 rounded-lg ${c} ${newSubject.color === c ? 'ring-2 ring-slate-900 dark:ring-white' : ''}`} />))}</div>
                    <button onClick={handleAddSubject} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl">AGREGAR MATERIA</button>
                  </div>
                </motion.div>
              </div>
            )}

            {showAddNote && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-2xl relative">
                  <button onClick={() => setShowAddNote(false)} className="absolute top-6 right-6 p-2"><X size={20} /></button>
                  <h2 className="text-2xl font-bold mb-6 dark:text-white">Nuevo Apunte</h2>
                  <div className="space-y-4">
                    <input type="text" placeholder="Título del apunte" className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none" value={newNote.title} onChange={(e) => setNewNote({...newNote, title: e.target.value})} />
                    <select className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none appearance-none" value={newNote.folder} onChange={(e) => setNewNote({...newNote, folder: e.target.value})}>
                      {['Lecturas', 'Resúmenes', 'Exámenes', 'Proyectos'].map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <button onClick={handleAddNote} className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl">AGREGAR APUNTE</button>
                  </div>
                </motion.div>
              </div>
            )}
            {showShareModal && <ShareModal />}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
