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

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { dishes, loading, addDish, updateDish, deleteDish } = useDishes();
  const menuState = useWeeklyMenu(dishes);

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
