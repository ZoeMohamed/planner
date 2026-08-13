import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import Drawer from './components/Drawer';
import SusunMenu from './pages/SusunMenu';
import DaftarMenu from './pages/DaftarMenu';
import { useDishes } from './hooks/useDishes';
import { useWeeklyMenu } from './hooks/useWeeklyMenu';
import { ToastProvider } from './hooks/useToast';
import { getWeekNumber } from './lib/helpers';
import { supabase } from './supabase';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { dishes, loading, addDish, updateDish, deleteDish } = useDishes();
  const menuState = useWeeklyMenu(dishes);

  if (!supabase) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        height: '100dvh', background: 'var(--nasi)', color: 'var(--arang)',
        fontFamily: 'var(--font-body)', padding: '20px', textAlign: 'center'
      }}>
        <h2>Konfigurasi Supabase Belum Lengkap 🛠️</h2>
        <p style={{ marginTop: '12px' }}>Pastikan Anda sudah menambahkan <strong>VITE_SUPABASE_URL</strong> dan <strong>VITE_SUPABASE_ANON_KEY</strong> di pengaturan Environment Variables Vercel.</p>
        <p style={{ marginTop: '8px', fontSize: '14px', color: 'var(--abu)' }}>Setelah menambahkannya, Vercel akan otomatis melakukan build ulang.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100dvh', background: 'var(--nasi)', color: 'var(--abu)',
        fontFamily: 'var(--font-body)', fontSize: 'var(--t-body)'
      }}>
        Memuat data menu...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastProvider>
        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <AppBar title={`Minggu ${getWeekNumber()}`} onDrawerOpen={() => setDrawerOpen(true)} />

        <Routes>
          <Route path="/" element={
            <SusunMenu dishes={dishes} {...menuState} />
          } />
          <Route path="/daftar" element={
            <DaftarMenu dishes={dishes} addDish={addDish} updateDish={updateDish} />
          } />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
