import { useState, useCallback } from 'react';
import { SLOTS } from '../data/constants';
import { autoFillWeek, shuffleSlot, analyzeMenu } from '../lib/autofill';

export function useWeeklyMenu(dishes) {
  const [weekMenu, setWeekMenu] = useState(() => {
    const m = {};
    for (let i = 0; i < 6; i++) m[i] = {};
    return m;
  });

  const [currentDay, setCurrentDay] = useState(0);

  const handleAutoFill = useCallback(() => {
    if (dishes.length === 0) return;
    setWeekMenu(prev => autoFillWeek(dishes, prev));
  }, [dishes]);

  const handleClearAndRefill = useCallback(() => {
    if (dishes.length === 0) return;
    const empty = {};
    for (let i = 0; i < 6; i++) empty[i] = {};
    setWeekMenu(autoFillWeek(dishes, empty));
  }, [dishes]);

  const handleShuffle = useCallback((dayIndex, slot) => {
    if (dishes.length === 0) return;
    setWeekMenu(prev => {
      const newMenu = { ...prev };
      for (let i = 0; i < 6; i++) newMenu[i] = { ...prev[i] };
      const newDish = shuffleSlot(dishes, newMenu, dayIndex, slot);
      if (newDish) newMenu[dayIndex][slot] = newDish;
      return newMenu;
    });
  }, [dishes]);

  const selectDish = useCallback((dayIndex, slot, dish) => {
    setWeekMenu(prev => {
      const newMenu = { ...prev };
      newMenu[dayIndex] = { ...prev[dayIndex], [slot]: dish };
      return newMenu;
    });
  }, []);

  const analysis = analyzeMenu(weekMenu);

  const isDayComplete = useCallback((dayIndex) => {
    const daySlots = weekMenu[dayIndex] || {};
    return SLOTS.every(s => daySlots[s]);
  }, [weekMenu]);

  return {
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
