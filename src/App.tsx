import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  DollarSign, 
  Users, 
  LayoutDashboard, 
  Package, 
  Settings, 
  LogOut,
  ChevronRight,
  ChevronLeft,
  PlusCircle,
  TrendingUp,
  Droplets,
  Hammer,
  BarChart3,
  UserCog,
  Globe,
  FileText,
  CalendarRange,
  Users2,
  ReceiptText,
  ListChecks,
  Key,
  ClipboardList,
  ShoppingCart,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

// --- Types ---

type AdminTab = 'resumen' | 'finanzas' | 'usuarios' | 'configuracion' | 'reportes';
type CoordinatorTab = 'calendario' | 'crmprospectos' | 'cotizaciones' | 'checklist';
type StaffTab = 'checkinout' | 'inventario' | 'puntodeventa';
type ClientTab = 'inicio' | 'servicios' | 'reservar';

type UserRole = 'admin' | 'coordinator' | 'staff' | 'client' | null;

type EventType = 'Graduación' | 'Cumpleaños' | 'Pool Party' | 'Boda' | 'Evento Social';

interface Reservation {
  id: string;
  clientName: string;
  date: string;
  type: EventType;
  status: 'Confirmado' | 'Pendiente' | 'Completado';
}

interface InventoryAlert {
  id: string;
  item: string;
  issue: string;
  priority: 'low' | 'medium' | 'high';
  icon: any;
}

// --- Mock Data ---

const MONTHLY_FINANCE_DATA = [
  { name: 'Ene', ingresos: 45000, utilidades: 22000, proyeccion: 42000 },
  { name: 'Feb', ingresos: 52000, utilidades: 26000, proyeccion: 48000 },
  { name: 'Mar', ingresos: 38000, utilidades: 18000, proyeccion: 40000 },
  { name: 'Abr', ingresos: 65000, utilidades: 32000, proyeccion: 58000 },
  { name: 'May', ingresos: 48000, utilidades: 24000, proyeccion: 60000 },
  { name: 'Jun', ingresos: 72000, utilidades: 36000, proyeccion: 75000 },
];

const STAFF_ACCOUNTS = [
  { id: 'u1', name: 'Alvaro Mendoza', role: 'Staff Operativo', status: 'Activo', email: 'alvaro@lacasadelrancho.com' },
  { id: 'u2', name: 'Elena García', role: 'Coordinadora', status: 'Activo', email: 'elena@lacasadelrancho.com' },
  { id: 'u3', name: 'Roberto Pozos', role: 'Staff Operativo', status: 'Inactivo', email: 'roberto@lacasadelrancho.com' },
];

const MOCK_RESERVATIONS: Reservation[] = [
  { id: '1', clientName: 'María Rodríguez', date: '15 de Mayo, 2024', type: 'Graduación', status: 'Confirmado' },
  { id: '2', clientName: 'Juan Carlos Ortiz', date: '22 de Mayo, 2024', type: 'Cumpleaños', status: 'Pendiente' },
  { id: '3', clientName: 'Familia Sánchez', date: '05 de Junio, 2024', type: 'Pool Party', status: 'Confirmado' },
];

const MOCK_ALERTS: InventoryAlert[] = [
  { id: 'a1', item: 'Cloro para alberca bajo', issue: 'Quedan solo 2 bidones en bodega.', priority: 'high', icon: Droplets },
  { id: 'a2', item: 'Mantenimiento de mobiliario', issue: '15 sillas plegables requieren reparación estructural.', priority: 'medium', icon: Hammer },
];

// --- Role Configs ---

const ROLE_CONFIGS = {
  admin: {
    title: 'Gerente General',
    menu: [
      { icon: LayoutDashboard, label: 'Resumen' },
      { icon: BarChart3, label: 'Finanzas' },
      { icon: UserCog, label: 'Usuarios' },
      { icon: Globe, label: 'Configuración' },
      { icon: FileText, label: 'Reportes' },
    ]
  },
  coordinator: {
    title: 'Coordinador de Eventos',
    menu: [
      { icon: CalendarRange, label: 'Calendario' },
      { icon: Users2, label: 'CRM / Prospectos' },
      { icon: ReceiptText, label: 'Cotizaciones' },
      { icon: ListChecks, label: 'Checklist' },
    ]
  },
  staff: {
    title: 'Staff Operativo',
    menu: [
      { icon: Key, label: 'Check-in/Out' },
      { icon: ClipboardList, label: 'Inventario' },
      { icon: ShoppingCart, label: 'Punto de Venta' },
    ]
  },
  client: {
    title: 'Invitado Especial',
    menu: [
      { icon: Globe, label: 'Inicio' },
      { icon: ShoppingCart, label: 'Servicios' },
      { icon: CalendarRange, label: 'Reservar' },
    ]
  }
};

// --- Sub-Components: Admin Módulos ---

function FinancialDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5">
          <h4 className="text-xl font-serif font-bold mb-8 text-text-dark">Ingresos vs Utilidades</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONTHLY_FINANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="ingresos" fill="#6b21a8" radius={[6, 6, 0, 0]} name="Ingresos" />
                <Bar dataKey="utilidades" fill="#d946ef" radius={[6, 6, 0, 0]} name="Utilidades" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5">
          <h4 className="text-xl font-serif font-bold mb-8 text-text-dark">Proyección de Ventas</h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_FINANCE_DATA}>
                <defs>
                  <linearGradient id="colorProy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6b21a8" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6b21a8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: 'none', borderRadius: '16px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="proyeccion" stroke="#6b21a8" strokeWidth={3} fillOpacity={1} fill="url(#colorProy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border border-primary-purple/10 rounded-[2rem] shadow-sm">
          <p className="text-text-muted text-[10px] uppercase tracking-widest mb-1 font-black">Margen Operativo</p>
          <p className="text-2xl font-bold text-text-dark tabular-nums">38.5%</p>
          <div className="h-1.5 w-full bg-gray-100 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-primary-purple w-[38.5%]" />
          </div>
        </div>
        <div className="p-6 bg-white border border-primary-purple/10 rounded-[2rem] shadow-sm">
          <p className="text-text-muted text-[10px] uppercase tracking-widest mb-1 font-black">Crecimiento Anual</p>
          <p className="text-2xl font-bold text-primary-purple tabular-nums">+12.4%</p>
        </div>
        <div className="p-6 bg-white border border-primary-purple/10 rounded-[2rem] shadow-sm">
          <p className="text-text-muted text-[10px] uppercase tracking-widest mb-1 font-black">Ticket Promedio</p>
          <p className="text-2xl font-bold text-text-dark tabular-nums">$18,450</p>
        </div>
      </div>
    </div>
  );
}

function UserManagement() {
  const [users, setUsers] = useState(STAFF_ACCOUNTS);

  const handleAddUser = () => {
    const names = ['Carlos Santana', 'Patricia Luna', 'Andrés Villarreal', 'Sofía Castro'];
    const roles = ['Staff Operativo', 'Coordinador', 'Seguridad'];
    
    const newUser = {
      id: `u${Date.now()}`,
      name: names[Math.floor(Math.random() * names.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      status: 'Activo',
      email: 'nuevo@lacasadelrancho.com'
    };
    
    setUsers([...users, newUser]);
    alert(`Se ha creado el usuario ${newUser.name} exitosamente.`);
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5 overflow-hidden">
      <div className="p-8 border-b border-gray-100 flex justify-between items-center">
        <h4 className="text-xl font-serif font-bold text-text-dark">Cuentas de Empleados</h4>
        <button 
          onClick={handleAddUser}
          className="bg-primary-purple text-white px-6 py-2.5 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-md shadow-primary-purple/20"
        >
          Nuevo Usuario
        </button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50/50 text-text-muted text-[10px] font-black uppercase tracking-[0.2em]">
            <th className="px-8 py-5">Usuario</th>
            <th className="px-8 py-5">Rol</th>
            <th className="px-8 py-5">Estado</th>
            <th className="px-8 py-5 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
              <td className="px-8 py-6">
                <p className="font-bold text-text-dark">{user.name}</p>
                <p className="text-xs text-text-muted">{user.email}</p>
              </td>
              <td className="px-8 py-6 text-sm text-text-muted font-medium">{user.role}</td>
              <td className="px-8 py-6">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${user.status === 'Activo' ? 'bg-primary-purple/10 text-primary-purple' : 'bg-gray-100 text-text-muted'}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-8 py-6 text-right">
                <button className="text-xs font-black text-text-muted hover:text-primary-purple transition-colors mr-4 uppercase tracking-widest">Editar</button>
                <button 
                  onClick={() => setUsers(users.filter(u => u.id !== user.id))}
                  className="text-xs font-black text-brand-red/60 hover:text-brand-red transition-colors uppercase tracking-widest"
                >
                  Baja
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GlobalConfig() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5">
        <h4 className="text-xl font-serif font-bold mb-8 flex items-center gap-2 text-text-dark"><Globe className="text-primary-purple" /> Precios por Temporada</h4>
        <div className="space-y-6">
          {[
            { tag: 'Temporada Alta', desc: 'Vacaciones de Verano / Diciembre', increase: '+25%' },
            { tag: 'Semana Santa', desc: 'Precios especiales festivos', increase: '+15%' },
            { tag: 'Evento Social', desc: 'Ajuste base por persona', base: '$450' },
          ].map((item, i) => (
            <div key={i} className="p-5 bg-gray-50/50 rounded-2xl flex items-center justify-between border border-gray-100 border-l-4 border-l-primary-purple">
              <div>
                <p className="font-bold text-sm text-text-dark">{item.tag}</p>
                <p className="text-xs text-text-muted">{item.desc}</p>
              </div>
              <input 
                type="text" 
                defaultValue={item.increase || item.base} 
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm w-20 text-right outline-none focus:border-primary-purple/50 transition-colors font-bold text-primary-purple"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5">
        <h4 className="text-xl font-serif font-bold mb-8 flex items-center gap-2 text-text-dark"><FileText className="text-accent-pink" /> Reglas y Contratos</h4>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50/50 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-primary-purple/5 transition-all border border-transparent hover:border-primary-purple/10">
            <span className="text-sm font-medium text-text-dark">Contrato de Arrendamiento 2024</span>
            <button className="text-text-muted hover:text-primary-purple"><ArrowRight size={16} /></button>
          </div>
          <div className="p-4 bg-gray-50/50 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-primary-purple/5 transition-all border border-transparent hover:border-primary-purple/10">
            <span className="text-sm font-medium text-text-dark">Políticas de Cancelación (Strict)</span>
            <button className="text-text-muted hover:text-primary-purple"><ArrowRight size={16} /></button>
          </div>
          <div className="mt-8 space-y-4">
            <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-black">Regla de Cancelación Default</p>
            <select className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-text-dark outline-none focus:border-primary-purple/50 transition-all font-medium italic">
              <option>Reembolso 50% antes de 30 días</option>
              <option>Sin reembolso en temporada alta</option>
              <option>Crédito para futuro evento</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvancedReports() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleExport = (type: string, format: string) => {
    setLoading(`${type}-${format}`);
    setTimeout(() => {
      setLoading(null);
      alert(`Éxito: Se ha generado y descargado el ${type} en formato ${format.toUpperCase()}.`);
    }, 1500);
  };

  return (
    <div className="bg-white p-12 rounded-[3.5rem] shadow-[0_25px_70px_-15px_rgba(107,33,168,0.15)] border border-primary-purple/5">
      <div className="max-w-2xl">
        <h4 className="text-3xl font-serif font-bold mb-4 italic text-text-dark">Reportes Avanzados</h4>
        <p className="text-text-muted text-sm mb-12 italic">Exportaciones certificadas para contabilidad y auditorías operativas en formatos digitales.</p>
        
        <div className="space-y-8">
          <div className="p-8 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-primary-purple/30 transition-all shadow-sm">
            <div>
              <p className="font-bold text-xl text-text-dark">Reporte de Ingresos Mensual</p>
              <p className="text-sm text-text-muted italic">Facturación, depósitos y saldos operativos.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => handleExport('Reporte de Ingresos', 'pdf')}
                disabled={loading !== null}
                className="bg-primary-purple text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <FileText size={16} /> {loading === 'Reporte de Ingresos-pdf' ? '...' : 'PDF'}
              </button>
              <button 
                onClick={() => handleExport('Reporte de Ingresos', 'excel')}
                disabled={loading !== null}
                className="bg-accent-pink text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <BarChart3 size={16} /> {loading === 'Reporte de Ingresos-excel' ? '...' : 'EXCEL'}
              </button>
            </div>
          </div>

          <div className="p-8 bg-gray-50/50 border border-gray-100 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-primary-purple/30 transition-all shadow-sm">
            <div>
              <p className="font-bold text-xl text-text-dark">Inventario y Consumos</p>
              <p className="text-sm text-text-muted italic">Auditoría de insumos y reporte de daños.</p>
            </div>
            <button 
              onClick={() => handleExport('Reporte de Inventario', 'pdf')}
              disabled={loading !== null}
              className="bg-white text-primary-purple border border-primary-purple/20 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary-purple hover:text-white transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <FileText size={16} /> {loading === 'Reporte de Inventario-pdf' ? '...' : 'DESCARGAR PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Components ---

function BottomNav({ role, activeTab, onTabChange, onLogout }: { 
  role: Exclude<UserRole, null>, 
  activeTab: string, 
  onTabChange: (tab: any) => void,
  onLogout: () => void
}) {
  const config = ROLE_CONFIGS[role];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
      <div className="bg-white/80 backdrop-blur-3xl p-3 rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(107,33,168,0.2)] flex items-center justify-between gap-2 border border-white/40 ring-1 ring-primary-purple/5">
        <div className="flex items-center gap-2 flex-1 overflow-x-auto no-scrollbar px-2">
          {config.menu.map((item, idx) => {
            const tabId = item.label.toLowerCase().replace(/\s+/g, '').normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '');
            const isActive = activeTab === tabId;
            
            return (
              <button
                key={idx}
                onClick={() => onTabChange(tabId)}
                className={`flex-1 min-w-[70px] py-3.5 rounded-[1.8rem] flex flex-col items-center gap-1 transition-all duration-500 group relative overflow-hidden ${
                  isActive 
                    ? 'text-primary-purple' 
                    : 'text-text-muted hover:text-primary-purple'
                }`}
              >
                <div className={`relative z-10 transition-transform duration-500 ${isActive ? 'scale-110 mb-0.5' : 'group-hover:scale-110'}`}>
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] relative z-10 hidden md:block transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="absolute inset-x-1 inset-y-1 bg-primary-purple/10 rounded-[1.4rem] shadow-inner"
                    transition={{ type: 'spring', bounce: 0.25, duration: 0.8 }}
                  />
                )}
              </button>
            );
          })}
        </div>
        
        <div className="w-px h-10 bg-gray-100 mx-2" />
        
        <button 
          onClick={onLogout}
          className="p-5 rounded-[1.8rem] text-text-muted hover:text-accent-pink hover:bg-accent-pink/5 transition-all group"
          title="Salir"
        >
          <LogOut size={22} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, subValue, trend, icon: Icon, colorClass }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(107,33,168,0.15)] border border-primary-purple/5 flex flex-col gap-4 group hover:-translate-y-1 transition-all duration-500"
    >
      <div className="flex justify-between items-start">
        <div className={`p-4 rounded-2xl bg-primary-purple px-4 py-4 text-white transition-transform duration-500 group-hover:scale-110 shadow-lg`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-primary-purple font-bold text-[10px] bg-primary-purple/10 px-3 py-1.5 rounded-full border border-primary-purple/15 tracking-wider">
            <TrendingUp size={12} />
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-1 leading-none">{label}</p>
        <h3 className="text-4xl font-serif font-bold text-text-dark tracking-tighter tabular-nums">{value}</h3>
        {subValue && <p className="text-text-muted text-xs mt-2 font-medium leading-relaxed italic">{subValue}</p>}
      </div>
    </motion.div>
  );
}

// --- Role Dashboards ---

function AdminDashboard({ activeTab }: { activeTab: AdminTab }) {
  const [reservations] = useState(MOCK_RESERVATIONS);
  const [alerts] = useState(MOCK_ALERTS);

  if (activeTab === 'finanzas') return <FinancialDashboard />;
  if (activeTab === 'usuarios') return <UserManagement />;
  if (activeTab === 'configuracion') return <GlobalConfig />;
  if (activeTab === 'reportes') return <AdvancedReports />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard label="Ingresos" value="$42,850" subValue="Semana Actual" trend="+8%" icon={DollarSign} />
        <StatCard label="Utilidad" value="$18,200" subValue="Proyectado mensual" icon={TrendingUp} />
        <StatCard label="Usuarios Activos" value="12" subValue="Staff en turno" icon={Users} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-serif font-bold text-text-dark italic">Próximas Reservas</h3>
            <button className="text-primary-purple text-[10px] font-black uppercase tracking-widest flex items-center gap-1 hover:brightness-75 transition-all">
              Ver historial <ChevronRight size={14} />
            </button>
          </div>
          <div className="bg-white rounded-[2.5rem] shadow-[0_15px_50px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">Cliente</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">Fecha</th>
                  <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest text-right">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reservations.map((res) => (
                  <tr key={res.id} className="hover:bg-primary-purple/5 transition-colors group">
                    <td className="px-8 py-6">
                      <span className="font-bold text-text-dark block group-hover:text-primary-purple transition-colors">{res.clientName}</span>
                      <span className="text-[10px] text-text-muted uppercase tracking-widest font-black italic">{res.type}</span>
                    </td>
                    <td className="px-8 py-6 text-text-muted text-sm font-medium">{res.date}</td>
                    <td className="px-8 py-6 text-right">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${res.status === 'Confirmado' ? 'bg-primary-purple/10 text-primary-purple' : 'bg-accent-pink/10 text-accent-pink'}`}>{res.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h3 className="text-2xl font-serif font-bold text-text-dark italic mb-8">Alertas de Inventario</h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="bg-white p-6 rounded-[2rem] shadow-md border border-primary-purple/5 hover:-translate-x-1 transition-transform duration-500 group">
                <div className="flex gap-4 items-center">
                  <div className={`p-4 rounded-2xl shrink-0 transition-colors group-hover:bg-primary-purple group-hover:text-white ${alert.priority === 'high' ? 'bg-accent-pink/20 text-accent-pink' : 'bg-primary-purple/10 text-primary-purple'}`}>
                    <alert.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-text-dark uppercase text-[10px] tracking-widest mb-1">{alert.item}</h4>
                    <p className="text-text-muted text-xs font-medium italic">{alert.issue}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function MasterCalendar() {
  const [events, setEvents] = useState([
    { day: 12, label: 'Boda Gomez', status: 'Confirmada', color: 'bg-primary-purple text-white shadow-lg' },
    { day: 20, label: 'Graduación Tec', status: 'Tentativa', color: 'bg-accent-pink text-white shadow-lg' }
  ]);

  const handleAddEvent = (day: number) => {
    if (events.find(e => e.day === day)) return;
    
    const newEvent = {
      day,
      label: 'Nueva Reserva',
      status: 'Proceso...',
      color: 'bg-primary-purple/40 text-primary-purple border border-primary-purple/20'
    };
    setEvents([...events, newEvent]);
    alert(`Se ha iniciado una nueva reserva para el día ${day + 1}.`);
  };

  return (
    <div className="bg-white rounded-[3.5rem] border border-primary-purple/5 p-12 shadow-[0_25px_70px_-15px_rgba(107,33,168,0.1)]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
        <div>
          <h3 className="text-3xl font-serif font-bold text-text-dark italic">Calendario Maestro</h3>
          <p className="text-text-muted text-sm italic mt-1 font-medium">Gestiona fechas con Drag & Drop intuitivo.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => handleAddEvent(Math.floor(Math.random() * 28))}
            className="flex items-center gap-3 bg-primary-purple text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 opacity-100 transition-all shadow-xl shadow-primary-purple/30"
          >
            <PlusCircle size={18} /> Nueva Reserva
          </button>
          <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl">
            <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest bg-white text-primary-purple rounded-xl shadow-sm">Mes</button>
            <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-text-muted hover:text-text-dark transition-colors">Semana</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-6">
        {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map(day => (
          <div key={day} className="text-center text-[10px] font-black uppercase tracking-[0.2em] text-text-muted pb-6">{day}</div>
        ))}
        {Array.from({ length: 35 }).map((_, i) => {
          const event = events.find(e => e.day === i);
          return (
            <div 
              key={i} 
              onClick={() => handleAddEvent(i)}
              className="aspect-square bg-gray-50/50 border border-gray-100 rounded-3xl p-3 relative group hover:border-primary-purple/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <span className="text-[10px] font-black text-text-muted/50 group-hover:text-primary-purple transition-colors">{i + 1}</span>
              {event && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`absolute inset-2 ${event.color} rounded-xl p-2 shadow-lg flex flex-col justify-between overflow-hidden`}
                >
                  <span className="text-[8px] font-black uppercase leading-none">{event.label}</span>
                  <span className="text-[8px] text-white/60">{event.status}</span>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CRMTracker() {
  const [prospects, setProspects] = useState([
    { id: 1, name: 'Clara Domínguez', event: 'XV Años', date: 'Oct 2024', status: 'Seguimiento', priority: 'alta' },
    { id: 2, name: 'Empresa Logistics', event: 'Corporativo', date: 'Dic 2024', status: 'Cotizado', priority: 'media' },
    { id: 3, name: 'Jorge Valdéz', event: 'Boda', date: 'Jun 2025', status: 'Primer Contacto', priority: 'baja' },
  ]);

  const handleAddProspect = () => {
    const names = ['Roberto Carlos', 'Fernanda Ruiz', 'Lucía Méndez', 'Sistemas Integrales'];
    const events = ['Boda', 'XV Años', 'Empresarial', 'Pool Party'];
    
    const newP = {
      id: Date.now(),
      name: names[Math.floor(Math.random() * names.length)],
      event: events[Math.floor(Math.random() * events.length)],
      date: 'Ene 2025',
      status: 'Nuevo',
      priority: Math.random() > 0.5 ? 'alta' : 'media' as any
    };
    
    setProspects([newP, ...prospects]);
    alert(`Se ha dado de alta al prospecto ${newP.name} correctamente.`);
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5 overflow-hidden">
      <div className="p-8 flex justify-between items-center border-b border-gray-100">
        <h3 className="text-2xl font-serif font-bold text-text-dark italic">Embudo de Ventas (CRM)</h3>
        <button 
          onClick={handleAddProspect}
          className="bg-primary-purple text-white px-8 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-md shadow-primary-purple/20"
        >
          + Nuevo Prospecto
        </button>
      </div>
      <div className="p-8 space-y-6">
        {prospects.map(p => (
          <div key={p.id} className="p-6 bg-gray-50/50 rounded-[2.2rem] flex items-center justify-between group hover:bg-primary-purple/5 transition-all border border-gray-100 hover:border-primary-purple/20 shadow-sm">
            <div className="flex gap-6 items-center">
              <div className={`w-3 h-3 rounded-full shadow-lg ${p.priority === 'alta' ? 'bg-accent-pink' : p.priority === 'media' ? 'bg-brand-orange' : 'bg-primary-purple'}`} />
              <div>
                <p className="font-bold text-xl text-text-dark transition-colors group-hover:text-primary-purple">{p.name}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-widest font-black italic">{p.event} • Estimado: {p.date}</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-[10px] font-black px-4 py-1.5 rounded-full bg-white border border-gray-200 text-text-muted uppercase tracking-widest">{p.status}</span>
              <button className="p-4 rounded-full bg-primary-purple text-white opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-primary-purple/20"><ArrowRight size={20} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuoteGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert('Se ha generado el PDF de la cotización con el logotipo oficial de La Casa del Rancho.');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 bg-white p-12 rounded-[3.5rem] shadow-[0_25px_70px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5">
        <h3 className="text-3xl font-serif font-bold mb-10 text-text-dark italic">Generador de Cotización</h3>
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-black text-text-muted tracking-[0.2em] ml-2">Cliente / Prospecto</label>
              <input type="text" placeholder="Ej. Familia González" className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm focus:border-primary-purple/50 focus:bg-white transition-all outline-none" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-black text-text-muted tracking-[0.2em] ml-2">Tipo de Evento</label>
              <select className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm focus:border-primary-purple/50 focus:bg-white transition-all outline-none italic font-medium">
                <option>Boda Especial</option>
                <option>Graduación Premium</option>
                <option>Corporativo Ejecutivo</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-100/50 p-8 rounded-[2.5rem] border border-gray-100">
            <p className="text-[10px] font-black text-text-muted mb-6 uppercase tracking-widest italic">Conceptos Sugeridos</p>
            <div className="space-y-4">
              {[
                { label: 'Renta de Jardín (24h)', price: '$15,000' },
                { label: 'Servicio de Meseros (10)', price: '$4,500' },
                { label: 'Seguridad Privada', price: '$2,800' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm border-b border-gray-200 pb-3">
                  <span className="text-text-muted font-medium italic">{item.label}</span>
                  <span className="font-bold text-primary-purple tabular-nums">{item.price}</span>
                </div>
              ))}
              <div className="pt-6 flex justify-between items-center text-3xl font-serif font-bold">
                <span className="text-text-dark">Total Estimado</span>
                <span className="text-primary-purple">$22,300.00</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-primary-purple to-accent-pink text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-primary-purple/20 flex items-center justify-center gap-4 hover:brightness-110 transition-all disabled:opacity-50 text-xs uppercase tracking-[0.2em]"
          >
            <FileText size={24} /> {isGenerating ? 'GENERANDO...' : 'Exportar Cotización Oficial PDF'}
          </button>
        </div>
      </div>
      <div className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-primary-purple/5">
        <h4 className="font-serif font-bold text-xl mb-8 text-text-dark italic underline underline-offset-8 decoration-accent-pink/30">Historial</h4>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-5 bg-gray-50 rounded-2xl flex items-center justify-between group hover:bg-primary-purple/5 transition-all cursor-pointer">
              <div>
                <p className="font-bold text-text-dark mb-1">#PRO{i}04 - Boda Smith</p>
                <p className="text-[10px] text-text-muted uppercase tracking-widest font-black italic">Hoy, 10:45 AM</p>
              </div>
              <button className="p-3 bg-white border border-gray-200 rounded-xl text-primary-purple shadow-sm group-hover:scale-110 transition-transform"><LogOut className="rotate-90" size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OperationsChecklist() {
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Limpieza profunda de alberca', category: 'Mantenimiento', done: true },
    { id: 2, label: 'Revisión estructural de carpas', category: 'Seguridad', done: false },
    { id: 3, label: 'Inventario de cristalería', category: 'Operación', done: false },
    { id: 4, label: 'Prueba de sonido (Altavoces Terraza)', category: 'Técnico', done: true },
    { id: 5, label: 'Entrega de llaves a cliente', category: 'Logística', done: false },
  ]);

  return (
    <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h3 className="text-3xl font-serif font-bold mb-1 text-text-dark italic">Operación del Rancho</h3>
          <p className="text-text-muted text-sm font-medium italic">Asegura la calidad del servicio en cada detalle.</p>
        </div>
        <div className="text-right p-4 bg-primary-purple/5 rounded-2xl border border-primary-purple/10">
          <p className="text-3xl font-bold text-primary-purple tabular-nums">{tasks.filter(t => t.done).length}/{tasks.length}</p>
          <p className="text-[10px] text-text-muted uppercase font-black tracking-widest leading-none">Completado</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tasks.map(task => (
          <div 
            key={task.id} 
            onClick={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}
            className={`p-6 rounded-[2rem] border transition-all cursor-pointer flex items-center justify-between group shadow-sm ${task.done ? 'bg-primary-purple/10 border-primary-purple/20' : 'bg-gray-50 border-gray-100 hover:border-primary-purple/30'}`}
          >
            <div className="flex items-center gap-5">
              <div className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${task.done ? 'bg-primary-purple border-primary-purple text-white' : 'border-gray-200 group-hover:border-primary-purple/40 bg-white'}`}>
                {task.done && <ChevronRight className="rotate-90" size={18} />}
              </div>
              <div>
                <p className={`font-bold text-lg ${task.done ? 'text-primary-purple/60 line-through' : 'text-text-dark'}`}>{task.label}</p>
                <span className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-black italic">{task.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function POSSystem() {
  const [items] = useState([
    { name: 'Cerveza Artesanal', price: 85, stock: 45, category: 'Bebidas' },
    { name: 'Refresco 355ml', price: 35, stock: 120, category: 'Bebidas' },
    { name: 'Botana Mixta', price: 120, stock: 15, category: 'Snacks' },
    { name: 'Hielo (Bolsa)', price: 40, stock: 8, category: 'Extras' },
  ]);

  const [cart, setCart] = useState<{name: string, price: number, qty: number}[]>([]);
  const [isCharging, setIsCharging] = useState(false);

  const addToCart = (item: any) => {
    const existing = cart.find(i => i.name === item.name);
    if (existing) {
      setCart(cart.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { name: item.name, price: item.price, qty: 1 }]);
    }
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleCharge = () => {
    if (cart.length === 0) return;
    setIsCharging(true);
    setTimeout(() => {
      setIsCharging(false);
      setCart([]);
      alert(`Se ha procesado el pago de $${total.toFixed(2)} exitosamente.`);
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5">
        <h3 className="text-3xl font-serif font-bold mb-10 text-text-dark italic">Punto de Venta (POS)</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <button 
              key={i} 
              onClick={() => addToCart(item)}
              className="p-8 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 hover:border-primary-purple/30 transition-all flex flex-col items-center gap-5 group shadow-sm hover:shadow-md"
            >
              <div className="p-5 rounded-2xl bg-white text-primary-purple shadow-sm group-hover:scale-110 group-hover:bg-primary-purple group-hover:text-white transition-all duration-500">
                <ShoppingCart size={28} />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm uppercase tracking-widest text-text-dark italic">{item.name}</p>
                <p className="text-primary-purple font-black mt-2 text-2xl tabular-nums">${item.price}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-black mt-2">Stock: {item.stock}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5 flex flex-col min-h-[500px]">
        <h4 className="font-serif font-bold text-2xl mb-8 text-text-dark underline underline-offset-8 decoration-accent-pink/30 italic">Llevar Cuenta</h4>
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 no-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
               <div className="opacity-10 mb-4 scale-150 text-text-muted"><ShoppingCart size={40} /></div>
               <p className="text-sm italic text-text-muted font-medium">Agregue items para comenzar...</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group">
                <div>
                  <p className="font-bold text-sm text-text-dark italic">{item.name}</p>
                  <p className="text-[10px] text-text-muted font-black uppercase tracking-widest">{item.qty} x ${item.price}</p>
                </div>
                <p className="font-black text-sm text-primary-purple">${item.price * item.qty}</p>
              </div>
            ))
          )}
        </div>
        <div className="pt-10 border-t border-gray-100 mt-8">
          <div className="flex justify-between text-3xl font-serif font-black mb-10 text-text-dark">
            <span>Total</span>
            <span className="tabular-nums font-sans">${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleCharge}
            disabled={cart.length === 0 || isCharging}
            className={`w-full py-5 rounded-[1.5rem] font-black tracking-[0.2em] text-[10px] uppercase shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3 ${isCharging ? 'bg-gray-200 text-text-muted' : 'bg-gradient-to-r from-primary-purple to-accent-pink text-white shadow-primary-purple/30'}`}
          >
            {isCharging ? 'PROCESANDO...' : 'Cobrar en Caja'}
          </button>
        </div>
      </div>
    </div>
  );
}

function StaffCheckInOut() {
  return (
    <div className="bg-white rounded-[3.5rem] border border-primary-purple/5 p-12 shadow-[0_25px_70px_-15px_rgba(107,33,168,0.1)]">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-3xl font-serif font-bold italic text-text-dark underline decoration-primary-purple/30 underline-offset-8">Control de Accesos</h3>
        <span className="text-[10px] font-black uppercase text-primary-purple bg-primary-purple/5 px-4 py-1.5 rounded-full border border-primary-purple/10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary-purple animate-pulse" />
          En Vivo
        </span>
      </div>
      <div className="space-y-6">
        {[
          { client: 'Familia Ortega', event: 'Pool Party', status: 'Esperando', action: 'Check-in' },
          { client: 'Boda Velasco', event: 'Montaje', status: 'En Recinto', action: 'Check-out' },
          { client: 'Graduación Anahuac', event: 'Desmontaje', status: 'Finalizado', action: 'Historial', done: true },
        ].map((event, i) => (
          <div key={i} className={`p-8 rounded-[2.5rem] border flex items-center justify-between group transition-all shadow-sm ${event.done ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-100 hover:border-primary-purple/30 hover:shadow-md hover:-translate-y-1'}`}>
            <div className="flex gap-8 items-center">
               <div className={`p-5 rounded-2xl transition-all group-hover:scale-110 ${event.done ? 'bg-gray-200 text-text-muted' : 'bg-primary-purple text-white shadow-lg'}`}>
                  <Key size={24} />
               </div>
               <div>
                  <p className="font-bold text-2xl text-text-dark italic">{event.client}</p>
                  <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-black italic">{event.event} • Status: {event.status}</p>
               </div>
            </div>
            {!event.done && (
              <button className="bg-primary-purple text-white px-10 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary-purple/30 transition-all hover:brightness-110">
                {event.action}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuickInventory() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5">
        <h3 className="text-2xl font-serif font-bold mb-8 text-text-dark italic">Reporte de Incidencias</h3>
        <div className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-black text-text-muted tracking-[0.2em] ml-2 font-serif">Artículo o Área Afectada</label>
            <input type="text" placeholder="Ej. Sillas Tiffany, Baño Damas..." className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm focus:border-primary-purple/50 focus:bg-white transition-all outline-none" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] uppercase font-black text-text-muted tracking-[0.2em] ml-2 font-serif">Descripción del Daño</label>
            <textarea placeholder="Detalle lo sucedido con exactitud..." className="w-full bg-gray-50 border border-gray-100 rounded-[1.5rem] px-6 py-4 text-sm min-h-[150px] focus:border-primary-purple/50 focus:bg-white transition-all outline-none italic" />
          </div>
          <div className="flex gap-4">
             <button className="flex-1 bg-accent-pink text-white py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-accent-pink/20">Registrar Reporte Crítico</button>
             <button className="px-8 bg-white border border-gray-200 rounded-[1.5rem] text-text-muted hover:border-primary-purple hover:text-primary-purple transition-all shadow-sm"><Hammer size={24} /></button>
          </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(107,33,168,0.1)] border border-primary-purple/5">
        <h3 className="text-2xl font-serif font-bold mb-8 italic text-text-dark">Consumo de Insumos</h3>
        <div className="space-y-6">
          {[
            { item: 'Garrafones de Agua', current: 12, need: 5 },
            { item: 'Toallas de Mano', current: 45, need: 100 },
            { item: 'Papel Higiénico', current: 8, need: 24 },
          ].map((item, i) => (
            <div key={i} className="p-6 bg-gray-50/50 rounded-[2rem] flex items-center justify-between border border-gray-100 shadow-sm group hover:border-primary-purple/20 transition-all">
              <div className="flex-1 pr-6">
                <p className="font-bold text-lg text-text-dark italic">{item.item}</p>
                <div className="flex items-center gap-3 mt-2">
                   <div className="h-2 flex-1 bg-white border border-gray-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-primary-purple shadow-[0_0_10px_rgba(107,33,168,0.3)] transition-all duration-1000" style={{ width: `${(item.current / item.need) * 100}%` }} />
                   </div>
                   <span className="text-[10px] text-primary-purple font-black tabular-nums">{item.current}/{item.need}</span>
                </div>
              </div>
              <button className="p-4 rounded-2xl bg-white border border-gray-100 text-primary-purple hover:bg-primary-purple hover:text-white transition-all shadow-sm hover:shadow-md group-hover:scale-110">
                <PlusCircle size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoordinatorDashboard({ activeTab }: { activeTab: CoordinatorTab }) {
  if (activeTab === 'calendario') return <MasterCalendar />;
  if (activeTab === 'crmprospectos') return <CRMTracker />;
  if (activeTab === 'cotizaciones') return <QuoteGenerator />;
  if (activeTab === 'checklist') return <OperationsChecklist />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <StatCard label="Prospectos" value="28" subValue="Nuevos esta semana" trend="+15%" icon={Users2} colorClass="bg-primary-purple/10 text-primary-purple" />
        <StatCard label="Cotizaciones" value="14" subValue="Pendientes de firma" icon={ReceiptText} colorClass="bg-accent-pink/10 text-accent-pink" />
        <StatCard label="Eventos Mes" value="8" subValue="Calendario 85% lleno" icon={CalendarRange} colorClass="bg-primary-purple/10 text-primary-purple" />
      </div>
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white rounded-[3rem] border border-primary-purple/5 p-10 shadow-xl overflow-hidden relative">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-3xl font-serif font-bold italic text-text-dark underline decoration-primary-purple/20 underline-offset-8">Resumen Operativo</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-primary-purple flex items-center gap-2 hover:translate-x-2 transition-transform">Ver todo el mes <ChevronRight size={14}/></button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
             <div className="lg:pr-8 space-y-8">
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] italic">Últimos Prospectos Calificados</p>
                {[1,2,3].map(i => (
                   <div key={i} className="flex justify-between items-center group cursor-pointer hover:translate-x-3 transition-transform bg-gray-50/50 p-4 rounded-3xl border border-gray-100/50 hover:bg-white hover:border-primary-purple/20 shadow-sm hover:shadow-md">
                      <div className="flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-primary-purple rounded-full" />
                        <div>
                          <p className="font-bold text-lg text-text-dark">Lead #00{i} - Evento Social</p>
                          <p className="text-[10px] text-text-muted uppercase tracking-wider font-medium italic">Vía Instagram • Hace 3h</p>
                        </div>
                      </div>
                      <div className="p-2 bg-white rounded-full text-primary-purple opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-gray-100">
                        <ArrowRight size={18} />
                      </div>
                   </div>
                ))}
             </div>
             <div className="pt-8 lg:pt-0 lg:pl-12 space-y-8">
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] italic">Próximos Grandes Eventos</p>
                <div className="p-6 bg-gradient-to-br from-primary-purple to-accent-pink rounded-[2.5rem] text-white shadow-xl shadow-primary-purple/20 flex items-start gap-6 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700"><Calendar size={80} /></div>
                   <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl">
                      <Calendar size={24} />
                   </div>
                   <div className="relative z-10">
                      <p className="font-bold text-2xl mb-1 italic">Graduación Tec de Monterrey</p>
                      <p className="text-white/80 text-xs italic font-medium">Contrato Liquidado al 100% • Logística Planificada al 90%</p>
                      <div className="mt-4 flex gap-2">
                        <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">Premium</span>
                        <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">350 Pax</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </>
  );
}

// --- Client Módulos ---

function ClientLanding() {
  const categories = [
    { 
      title: 'Marisquería & Grill', 
      desc: 'Sabor auténtico con camarones frescos y platillos regionales preparados al momento por chefs expertos.', 
      icon: ShoppingCart, 
      color: 'bg-primary-purple/10 text-primary-purple',
      img: 'https://images.unsplash.com/photo-1559739511-e130c25fd6e5?auto=format&fit=crop&q=80&w=800'
    },
    { 
      title: 'Coctelería de Autor', 
      desc: 'Las mejores micheladas, margaritas y bebidas refrescantes diseñadas para elevar el ánimo de tu fiesta.', 
      icon: Droplets, 
      color: 'bg-accent-pink/10 text-accent-pink',
      img: 'https://images.unsplash.com/photo-1513558111299-2313d1c3905f?auto=format&fit=crop&q=80&w=800'
    },
    { 
      title: 'Jardines & Terrazas', 
      desc: 'Instalaciones de primer nivel rodeadas de naturaleza, ideales para bodas, XV años y reuniones corporativas.', 
      icon: Users, 
      color: 'bg-primary-purple/10 text-primary-purple',
      img: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800'
    },
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <div className="relative h-[750px] rounded-[4rem] overflow-hidden group shadow-[0_30px_100px_-20px_rgba(107,33,168,0.2)]">
        <img 
          src="https://images.unsplash.com/photo-1563897539633-7374c276c212?auto=format&fit=crop&q=80&w=2000" 
          alt="La Casa del Rancho Venue" 
          className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-purple/90 via-primary-purple/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-purple/60 via-transparent to-transparent" />
        
        <div className="absolute inset-0 p-12 md:p-24 flex items-end">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src="la_casa_del_rancho_logo.png" 
                  alt="Logo" 
                  className="w-24 h-auto drop-shadow-2xl brightness-125"
                  referrerPolicy="no-referrer"
                />
                <div className="h-12 w-px bg-white/30" />
                <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.4em]">
                  Establecimiento Gran Clase
                </span>
              </div>
              <h3 className="text-6xl md:text-8xl font-serif font-black text-white mb-8 italic leading-[1.1] tracking-tight">
                Donde el Sabor <br /> 
                <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">Encuentra su Hogar.</span>
              </h3>
              <p className="text-white/90 text-xl md:text-2xl leading-relaxed mb-12 max-w-2xl font-medium italic">
                La joya de la marisquería y coctelería regional. Instalaciones premium para eventos que merecen ser recordados por siempre.
              </p>
              <div className="flex flex-wrap gap-6">
                <button className="bg-white text-primary-purple px-12 py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all active:scale-95">
                  Reserva tu Evento
                </button>
                <button className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-12 py-6 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-white/20 transition-all flex items-center gap-3">
                  Explorar Menú <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div>
        <div className="text-center mb-20">
          <span className="text-primary-purple font-black text-[10px] uppercase tracking-[0.5em] italic block mb-4">Nuestra Propuesta de Valor</span>
          <h4 className="text-5xl font-serif font-black text-text-dark mb-6 italic underline decoration-primary-purple/10 underline-offset-[12px]">Experiencia Rancho 360°</h4>
          <p className="text-text-muted max-w-2xl mx-auto text-lg font-medium">Ofrecemos una fusión única entre gastronomía de altura y espacios arquitectónicos diseñados para la convivencia.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="bg-white rounded-[3.5rem] border border-primary-purple/5 overflow-hidden group hover:border-primary-purple transition-all shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_-15px_rgba(107,33,168,0.15)] flex flex-col"
            >
              <div className="h-80 overflow-hidden relative">
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="p-10 flex-1 flex flex-col items-center text-center">
                <div className={`p-5 rounded-[1.5rem] ${cat.color} mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  <cat.icon size={32} />
                </div>
                <h5 className="text-3xl font-serif font-black mb-4 italic text-text-dark">{cat.title}</h5>
                <p className="text-text-muted text-sm leading-relaxed mb-8 flex-1 font-medium">{cat.desc}</p>
                <button className="text-primary-purple text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 group-hover:gap-5 transition-all">
                  Descubrir Más <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Social Proof / Quote Section */}
      <div className="bg-white rounded-[4rem] border border-primary-purple/10 p-12 md:p-24 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row items-center gap-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-purple/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-pink/5 rounded-full blur-[100px] -ml-48 -mb-48" />
        
        <div className="flex-1 relative z-10">
          <span className="text-accent-pink font-black text-[10px] uppercase tracking-[0.5em] block mb-6 italic">Reservaciones</span>
          <h4 className="text-5xl md:text-6xl font-serif font-black mb-8 italic text-text-dark leading-tight">Haz Realidad <br /><span className="text-primary-purple">tu Próxima Celebración.</span></h4>
          <p className="text-text-muted text-xl leading-relaxed mb-12 font-medium italic">
            Nuestros expertos en coordinación están listos para diseñar una propuesta a tu medida. Cotiza ahora mismo y asegura tu lugar en El Rancho.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden hover:scale-110 transition-transform cursor-pointer">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="User" />
                </div>
              ))}
            </div>
            <div>
              <p className="text-lg font-serif font-bold text-text-dark italic">+500 Momentos Inolvidables</p>
              <p className="text-[10px] text-text-muted uppercase font-black tracking-widest mt-1">Este Año en La Casa del Rancho</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[450px] relative z-10">
           <div className="p-2 bg-gradient-to-br from-primary-purple/10 to-accent-pink/10 rounded-[3.5rem] shadow-inner">
             <QuoteGenerator />
           </div>
        </div>
      </div>
    </div>
  );
}

function ClientServices() {
  const packages = [
    { name: 'Paquete Basic', price: '$15,000', items: ['Renta de Jardín (8h)', 'Mobiliario Básico', 'Seguridad', 'Alberca Climatizada'], color: 'from-gray-50 to-white border-gray-100' },
    { name: 'Paquete Imperial', price: '$35,000', items: ['Banquete 3 Tiempos', 'Mesa de Dulces', 'DJ & Audio Pro', 'Decoración Floral'], featured: true, color: 'from-primary-purple to-accent-pink text-white border-primary-purple shadow-2xl shadow-primary-purple/30 translate-y-[-1rem] lg:scale-110' },
    { name: 'Day Pass Familiar', price: '$5,000', items: ['Acceso a Alberca', 'Zona de Asadores', 'Estacionamiento', 'Capacidad 20 pax'], color: 'from-gray-50 to-white border-gray-100' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center py-12">
      {packages.map((p, i) => (
        <div 
          key={i} 
          className={`p-12 rounded-[3.5rem] border flex flex-col gap-10 transition-all bg-gradient-to-br ${p.color} relative group`}
        >
          {p.featured && (
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-primary-purple px-6 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl border border-primary-purple/20">
              Elección de Clientes
            </div>
          )}
          <div className="text-center">
            <h4 className={`text-3xl font-serif font-black italic mb-2 ${p.featured ? 'text-white' : 'text-text-dark'}`}>{p.name}</h4>
            <p className={`text-5xl font-black tabular-nums ${p.featured ? 'text-white' : 'text-primary-purple'}`}>
              {p.price}
              <span className={`text-[10px] font-black uppercase tracking-widest ml-1 ${p.featured ? 'text-white/60' : 'text-text-muted italic'}`}> / base</span>
            </p>
          </div>
          <div className={`h-px w-full ${p.featured ? 'bg-white/20' : 'bg-primary-purple/10'}`} />
          <ul className="space-y-5 flex-1 p-2">
            {p.items.map((item, idx) => (
              <li key={idx} className={`text-sm flex items-center gap-4 font-medium italic ${p.featured ? 'text-white/80' : 'text-text-muted hover:text-text-dark'} transition-colors`}>
                <div className={`w-2 h-2 rounded-full ${p.featured ? 'bg-white' : 'bg-primary-purple shadow-[0_0_8px_rgba(107,33,168,0.5)]'}`} />
                {item}
              </li>
            ))}
          </ul>
          <button className={`w-full py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl active:scale-95 ${p.featured ? 'bg-white text-primary-purple shadow-white/20 hover:brightness-110' : 'bg-primary-purple text-white shadow-primary-purple/20 hover:brightness-110'}`}>
            Seleccionar Plan
          </button>
        </div>
      ))}
    </div>
  );
}

function ClientBooking() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  const handleBook = () => {
    if (selectedDay === null) return;
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setSelectedDay(null);
      alert('Solicitud de cotización enviada. Un coordinador te contactará en breve.');
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 py-8">
      <div className="lg:col-span-2 bg-white rounded-[3.5rem] border border-primary-purple/5 p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.05)]">
        <h4 className="text-3xl font-serif font-black mb-10 italic text-text-dark underline decoration-primary-purple/20 underline-offset-8">Calendario de Disponibilidad</h4>
        <div className="grid grid-cols-7 gap-4">
          {['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'].map(d => (
            <div key={d} className="text-center text-[10px] font-black uppercase tracking-widest text-text-muted pb-4">{d}</div>
          ))}
          {Array.from({ length: 31 }).map((_, i) => (
            <button 
              key={i} 
              onClick={() => setSelectedDay(i)}
              className={`aspect-square rounded-[1.8rem] border-2 transition-all flex flex-col items-center justify-center gap-1 group relative overflow-hidden ${
                selectedDay === i 
                  ? 'bg-primary-purple border-primary-purple text-white shadow-2xl scale-110 z-10' 
                  : 'bg-gray-50 border-gray-100 hover:border-primary-purple/30 text-text-muted hover:bg-white'
              }`}
            >
              <span className={`text-sm font-black transition-colors ${selectedDay === i ? 'text-white' : 'text-text-dark'}`}>{i + 1}</span>
              <span className={`text-[8px] uppercase font-black tracking-widest transition-opacity ${selectedDay === i ? 'text-white/60' : 'opacity-30 group-hover:opacity-100'}`}>Libre</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[3.5rem] border border-primary-purple/5 p-12 shadow-2xl shadow-primary-purple/10 flex flex-col h-fit relative">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><CalendarRange size={120} /></div>
        <h4 className="text-2xl font-serif font-black italic mb-10 text-text-dark underline decoration-accent-pink/20 underline-offset-8">Tu Evento</h4>
        <div className="space-y-8 flex-1">
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <span className="text-[10px] uppercase font-black text-text-muted tracking-widest italic block mb-2">Fecha Seleccionada</span>
            <p className="text-xl font-bold text-text-dark italic">{selectedDay !== null ? `${selectedDay + 1} de Junio, 2024` : 'Seleccione un día...'}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <label className="text-[10px] uppercase font-black text-text-muted tracking-widest italic block mb-3">Aforo Estimado</label>
            <select className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm font-black italic outline-none focus:border-primary-purple transition-all shadow-sm">
              <option>50 - 100 Personas</option>
              <option>100 - 200 Personas</option>
              <option>Boutique (Menos de 50)</option>
              <option>Gran Evento (200+)</option>
            </select>
          </div>
        </div>
        <div className="pt-12 border-t border-gray-100 mt-10">
          <p className="text-[10px] text-text-muted mb-8 italic leading-relaxed font-medium">Al solicitar la reserva, nuestro equipo VIP validará la viabilidad técnica y te enviará un presupuesto formal a tu correo en menos de 24h.</p>
          <button 
            onClick={handleBook}
            disabled={selectedDay === null || isBooking}
            className="w-full bg-gradient-to-r from-primary-purple to-accent-pink text-white font-black py-6 rounded-[1.8rem] shadow-2xl shadow-primary-purple/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em]"
          >
            {isBooking ? 'PROCESANDO...' : 'Diseñar mi Propuesta Ahora'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ClientDashboard({ activeTab }: { activeTab: ClientTab }) {
  if (activeTab === 'servicios') return <ClientServices />;
  if (activeTab === 'reservar') return <ClientBooking />;
  return <ClientLanding />;
}

function StaffDashboard({ activeTab }: { activeTab: StaffTab }) {
  if (activeTab === 'checkinout') return <StaffCheckInOut />;
  if (activeTab === 'inventario') return <QuickInventory />;
  if (activeTab === 'puntodeventa') return <POSSystem />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="bg-white rounded-[3rem] border border-primary-purple/5 p-10 shadow-xl">
        <h3 className="text-2xl font-serif font-black mb-8 flex items-center gap-4 text-text-dark italic">
          <div className="p-3 bg-primary-purple/10 text-primary-purple rounded-2xl shadow-sm"><Key size={24} /></div> Check-in / Out Hoy
        </h3>
        <div className="space-y-6">
          {[
            { client: 'Familia Gomez', time: '09:00 AM', action: 'Entrega' },
            { client: 'Graduación Tec', time: '02:00 AM', action: 'Salida', done: true }
          ].map((item, i) => (
            <div key={i} className={`p-6 bg-gray-50 border border-gray-100 rounded-[2rem] flex items-center justify-between ${item.done ? 'opacity-40 grayscale' : 'hover:border-primary-purple/30 shadow-sm'} transition-all`}>
              <div>
                <p className="font-bold text-lg text-text-dark">{item.client}</p>
                <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-black italic">{item.action}: {item.time}</p>
              </div>
              {!item.done && (
                <button className="bg-primary-purple text-white px-8 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-md shadow-primary-purple/20 hover:brightness-110">Registrar</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-primary-purple/5 p-10 shadow-xl">
        <h3 className="text-2xl font-serif font-black mb-8 flex items-center gap-4 text-text-dark italic">
          <div className="p-3 bg-accent-pink/10 text-accent-pink rounded-2xl shadow-sm"><ClipboardList size={24} /></div> Inventario Crítico
        </h3>
        <div className="space-y-6">
          {[
            { item: 'Toallas', stock: '22/50', status: 'Revisar' },
            { item: 'Insumos Barra', stock: 'Bajo', status: 'Pedido' }
          ].map((item, i) => (
            <div key={i} className="p-5 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between hover:border-accent-pink/20 transition-all shadow-sm">
              <span className="font-bold text-lg text-text-dark italic">{item.item}</span>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-text-muted font-black tracking-widest uppercase">{item.stock}</span>
                <span className="text-[9px] font-black px-4 py-1.5 rounded-full bg-accent-pink/10 text-accent-pink border border-accent-pink/20 uppercase tracking-widest">{item.status}</span>
              </div>
            </div>
          ))}
          <button className="w-full py-5 rounded-2xl bg-white border-2 border-dashed border-primary-purple/10 text-primary-purple/40 text-[10px] font-black uppercase tracking-[0.3em] mt-6 hover:bg-primary-purple/5 hover:border-primary-purple/30 transition-all">
            + Generar Reporte de Incidencia
          </button>
        </div>
      </div>
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [role, setRole] = useState<UserRole>(null);
  const [activeTab, setActiveTab] = useState<any>('resumen');

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
    // Reset to the first valid tab for that role
    if (selectedRole === 'admin') setActiveTab('resumen');
    else if (selectedRole === 'coordinator') setActiveTab('calendario');
    else if (selectedRole === 'staff') setActiveTab('checkinout');
    else if (selectedRole === 'client') setActiveTab('inicio');
  };

  const onLogout = () => {
    setRole(null);
    setActiveTab('resumen');
  };

  const onTabChange = (tab: any) => {
    setActiveTab(tab);
  };

  const RoleButton = ({ type, title, desc, icon: Icon }: any) => (
      <motion.button
      id={`role-btn-${type}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => handleRoleSelect(type)}
      className="p-8 bg-white rounded-[2.5rem] shadow-[0_15px_40px_-5px_rgba(107,33,168,0.1)] text-left flex flex-col gap-6 transition-all hover:shadow-[0_25px_60px_-5px_rgba(107,33,168,0.2)] border border-primary-purple/5 relative group overflow-hidden"
    >
      <div className="p-5 rounded-2xl bg-primary-purple text-white w-fit group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
        <Icon size={32} />
      </div>
      <div>
        <h3 className="text-2xl font-serif font-bold text-text-dark mb-2">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed">{desc}</p>
      </div>
      <div className="mt-4 flex items-center gap-2 text-primary-purple text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Seleccionar Rol <ArrowRight size={14} />
      </div>
    </motion.button>
  );

  if (!role) {
    return (
      <div id="role-selection-screen" className="min-h-screen bg-[#f0f4ff] selection:bg-primary-purple/20 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-purple/10 rounded-full blur-[120px] opacity-40" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-accent-pink/10 rounded-full blur-[150px] opacity-30" />
        </div>

        <div className="max-w-5xl w-full relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-12">
            <img 
              src="la_casa_del_rancho_logo.png" 
              alt="La Casa del Rancho Logo" 
              className="w-48 h-auto mx-auto mb-8 drop-shadow-xl brightness-110"
              referrerPolicy="no-referrer"
            />
            <h1 className="text-4xl font-serif italic font-bold text-primary-purple tracking-tight mb-2">Bienvenido</h1>
            <p className="text-text-muted uppercase tracking-[0.4em] text-[10px] font-black">La Casa del Rancho • Gestión Inteligente</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleButton type="client" title="Portal Clientes" desc="Explora servicios, menú y cotiza tu evento." icon={Globe} />
            <RoleButton type="coordinator" title="Coordinador" desc="Gestión de ventas y calendario de eventos." icon={CalendarRange} />
            <RoleButton type="staff" title="Staff Rancho" desc="Operación diaria, inventario y check-in." icon={ShoppingCart} />
            <RoleButton type="admin" title="Administración" desc="Control total, finanzas y configuración." icon={UserCog} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="main-app-container" className="min-h-screen bg-[#f0f4ff] font-sans selection:bg-primary-purple/20 relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-purple/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-pink/5 rounded-full blur-[100px]" />
      </div>

      <main className="relative z-10 p-6 md:p-12 pb-32 md:pb-32 max-w-7xl mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8 bg-white/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/40 shadow-xl">
          <div className="flex items-center gap-6">
            <img src="la_casa_del_rancho_logo.png" alt="Logo" className="w-20 h-auto" referrerPolicy="no-referrer" />
            <div>
              <h2 id="dashboard-title" className="text-3xl font-serif font-bold tracking-tight text-text-dark capitalize italic">
                {role === 'admin' ? 'Gerencia General' : role === 'coordinator' ? 'Ventas y Logística' : role === 'staff' ? 'Staff Operativo' : 'Explora el Rancho'}
              </h2>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-primary-purple font-black text-[10px] uppercase tracking-widest bg-primary-purple/10 px-3 py-1 rounded-full border border-primary-purple/10">
                  {ROLE_CONFIGS[role].title}
                </span>
                <p className="text-text-muted text-sm font-medium italic">
                  {role === 'admin' ? 
                    (activeTab === 'resumen' ? 'Panel de Control Principal' : activeTab === 'finanzas' ? 'Auditoría Financiera' : activeTab === 'usuarios' ? 'Gestión de Capital Humano' : activeTab === 'configuracion' ? 'Configuración de Negocio' : 'Inteligencia de Datos') 
                    : activeTab
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex -space-x-2 mr-4">
                {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white" />)}
             </div>
             <button className="p-4 rounded-2xl bg-white border border-primary-purple/10 text-primary-purple shadow-lg hover:shadow-xl transition-all">
                <Settings size={20} />
             </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${role}-${activeTab}`}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {role === 'admin' && <AdminDashboard activeTab={activeTab as AdminTab} />}
            {role === 'coordinator' && <CoordinatorDashboard activeTab={activeTab as CoordinatorTab} />}
            {role === 'staff' && <StaffDashboard activeTab={activeTab as StaffTab} />}
            {role === 'client' && <ClientDashboard activeTab={activeTab as ClientTab} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav 
        role={role} 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        onLogout={onLogout} 
      />
    </div>
  );
}

