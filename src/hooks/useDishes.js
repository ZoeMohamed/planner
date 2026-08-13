import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../supabase';
import { SEED_DISHES } from '../data/seed-dishes';

export function useDishes() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDishes = useCallback(async () => {
    setLoading(true);
    if (!supabase) {
      setDishes(SEED_DISHES.map((d, i) => ({ ...d, id: i + 1 })));
      setLoading(false);
      return;
    }
    
    const { data, error } = await supabase
      .from('dishes')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching dishes:', error);
      // Fallback to seed data if Supabase fails
      setDishes(SEED_DISHES.map((d, i) => ({ ...d, id: i + 1 })));
    } else if (data.length === 0) {
      // Auto-seed if table is empty
      await seedDishes();
    } else {
      setDishes(data);
    }
    setLoading(false);
  }, []);

  const seedDishes = async () => {
    const { data, error } = await supabase
      .from('dishes')
      .insert(SEED_DISHES)
      .select();

    if (error) {
      console.error('Error seeding dishes:', error);
      setDishes(SEED_DISHES.map((d, i) => ({ ...d, id: i + 1 })));
    } else {
      setDishes(data);
    }
  };

  const addDish = async (dishData) => {
    const { data, error } = await supabase
      .from('dishes')
      .insert([dishData])
      .select()
      .single();

    if (error) {
      console.error('Error adding dish:', error);
      return null;
    }

    setDishes(prev => [...prev, data].sort((a, b) => a.name.localeCompare(b.name)));
    return data;
  };

  const updateDish = async (id, updates) => {
    const { data, error } = await supabase
      .from('dishes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating dish:', error);
      return null;
    }

    setDishes(prev => prev.map(d => d.id === id ? data : d));
    return data;
  };

  const deleteDish = async (id) => {
    const { error } = await supabase
      .from('dishes')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting dish:', error);
      return false;
    }

    setDishes(prev => prev.filter(d => d.id !== id));
    return true;
  };

  const markWeekAsServed = async (weekStartIso, weekMenu) => {
    const dishIds = new Set();
    for (let day = 0; day < 6; day++) {
      if (!weekMenu[day]) continue;
      Object.values(weekMenu[day]).forEach(dish => {
        if (dish && dish.id) dishIds.add(dish.id);
      });
    }

    const ids = Array.from(dishIds);
    if (ids.length === 0) return true;

    // We fetch the current dishes first to keep all their other fields intact
    const { data: currentDishes, error: fetchError } = await supabase
      .from('dishes')
      .select('*')
      .in('id', ids);

    if (fetchError || !currentDishes) {
      console.error('Error fetching dishes for update:', fetchError);
      return false;
    }

    const updatedDishes = currentDishes.map(d => ({
      ...d,
      last_served_date: weekStartIso,
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from('dishes')
      .upsert(updatedDishes);

    if (error) {
      console.error('Error updating last_served_date:', error);
      return false;
    }

    // Optimistically update local state
    setDishes(prev => prev.map(d => {
      if (ids.includes(d.id)) {
        return { ...d, last_served_date: weekStartIso };
      }
      return d;
    }));
    
    return true;
  };

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  return { dishes, loading, addDish, updateDish, deleteDish, markWeekAsServed, refetch: fetchDishes };
}
