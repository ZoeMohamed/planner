import { useState, useCallback, useEffect } from 'react';
import { SLOTS } from '../data/constants';
import { autoFillWeek, shuffleSlot, analyzeMenu } from '../lib/autofill';
import { getNextMonday, addWeeks, toISODate } from '../lib/helpers';
import { supabase } from '../supabase';

function getEmptyMenu() {
  const m = {};
  for (let i = 0; i < 6; i++) m[i] = {};
  return m;
}

export function useWeeklyMenu(dishes) {
  const [weekStart, setWeekStart] = useState(getNextMonday());
  const [weekMenu, setWeekMenu] = useState(getEmptyMenu());
  const [currentDay, setCurrentDay] = useState(0);
  const [loadingMenu, setLoadingMenu] = useState(false);

  // Fetch the menu for the current week whenever weekStart changes
  useEffect(() => {
    let mounted = true;
    async function fetchMenu() {
      if (!supabase) return;
      setLoadingMenu(true);
      const isoDate = toISODate(weekStart);
      
      const { data, error } = await supabase
        .from('weekly_menus')
        .select('*')
        .eq('week_start_date', isoDate)
        .maybeSingle();

      if (!mounted) return;
      
      if (error) {
        console.error('Error fetching weekly menu:', error);
      }
      
      if (data && data.menu_data) {
        setWeekMenu(data.menu_data);
      } else {
        setWeekMenu(getEmptyMenu());
      }
      
      setLoadingMenu(false);
    }
    
    fetchMenu();
    return () => { mounted = false; };
  }, [weekStart]);

  // Helper to upsert menu to Supabase
  const upsertMenu = async (newMenu) => {
    if (!supabase) return;
    const isoDate = toISODate(weekStart);
    
    const analysis = analyzeMenu(newMenu);
    
    const { error } = await supabase
      .from('weekly_menus')
      .upsert(
        { 
          week_start_date: isoDate, 
          menu_data: newMenu,
          total_cost: analysis ? analysis.totalCost : 0,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'week_start_date' }
      );
      
    if (error) {
      console.error('Error upserting weekly menu:', error);
    }
  };

  const handleAutoFill = useCallback(() => {
    if (dishes.length === 0) return;
    setWeekMenu(prev => {
      const newMenu = autoFillWeek(dishes, prev);
      upsertMenu(newMenu);
      return newMenu;
    });
  }, [dishes, weekStart]);

  const handleClearAndRefill = useCallback(() => {
    if (dishes.length === 0) return;
    const newMenu = autoFillWeek(dishes, getEmptyMenu());
    setWeekMenu(newMenu);
    upsertMenu(newMenu);
  }, [dishes, weekStart]);

  const handleShuffle = useCallback((dayIndex, slot) => {
    if (dishes.length === 0) return;
    setWeekMenu(prev => {
      const newMenu = { ...prev };
      for (let i = 0; i < 6; i++) newMenu[i] = { ...prev[i] };
      const newDish = shuffleSlot(dishes, newMenu, dayIndex, slot);
      if (newDish) {
        newMenu[dayIndex][slot] = newDish;
        upsertMenu(newMenu);
      }
      return newMenu;
    });
  }, [dishes, weekStart]);

  const selectDish = useCallback((dayIndex, slot, dish) => {
    setWeekMenu(prev => {
      const newMenu = { ...prev };
      newMenu[dayIndex] = { ...prev[dayIndex], [slot]: dish };
      upsertMenu(newMenu);
      return newMenu;
    });
  }, [weekStart]);

  const nextWeek = useCallback(() => {
    setWeekStart(prev => addWeeks(prev, 1));
    setCurrentDay(0);
  }, []);

  const prevWeek = useCallback(() => {
    setWeekStart(prev => addWeeks(prev, -1));
    setCurrentDay(0);
  }, []);

  const analysis = analyzeMenu(weekMenu);

  const isDayComplete = useCallback((dayIndex) => {
    const daySlots = weekMenu[dayIndex] || {};
    return SLOTS.every(s => daySlots[s]);
  }, [weekMenu]);

  return {
    weekStart,
    nextWeek,
    prevWeek,
    loadingMenu,
    weekMenu,
    currentDay,
    setCurrentDay,
    handleAutoFill,
    handleClearAndRefill,
    handleShuffle,
    selectDish,
    analysis,
    isDayComplete,
  };
}
