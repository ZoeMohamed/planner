import { SLOTS } from '../data/constants';
import { daysSinceServed } from './helpers';

/**
 * Auto-fill the entire weekly menu.
 * Preserved algorithm from the prototype.
 */
export function autoFillWeek(dishes, currentMenu = {}, options = {}) {
  const { minCost = 12000, maxCost = 18000 } = options;

  const menu = {};
  for (let day = 0; day < 6; day++) {
    menu[day] = { ...(currentMenu[day] || {}) };
  }

  for (const slot of SLOTS) {
    const candidates = dishes.filter(d => d.slot === slot && d.active);
    candidates.sort((a, b) => daysSinceServed(b.last_served_date) - daysSinceServed(a.last_served_date));

    for (let day = 0; day < 6; day++) {
      if (menu[day][slot]) continue;
      const selected = pickDish(candidates, slot, day, menu, minCost, maxCost);
      if (selected) menu[day][slot] = selected;
    }
  }

  return menu;
}

function pickDish(candidates, slot, dayIndex, menu, minCost, maxCost) {
  const usedThisWeek = new Set();
  for (let d = 0; d < 6; d++) {
    for (const s of SLOTS) {
      if (menu[d][s]) usedThisWeek.add(menu[d][s].id);
    }
  }

  const prevDayProtein = dayIndex > 0 && menu[dayIndex - 1]['Lauk Utama']
    ? menu[dayIndex - 1]['Lauk Utama'].protein_tag : null;

  const methodsThisWeek = {};
  for (let d = 0; d < 6; d++) {
    if (menu[d][slot]) {
      const m = menu[d][slot].method_tag;
      methodsThisWeek[m] = (methodsThisWeek[m] || 0) + 1;
    }
  }

  const scored = [];
  for (const dish of candidates) {
    if (usedThisWeek.has(dish.id)) continue;

    const daysSince = daysSinceServed(dish.last_served_date);
    let proteinConflict = false;
    if (slot === 'Lauk Utama' && prevDayProtein && dish.protein_tag === prevDayProtein) {
      proteinConflict = true;
    }

    let nextDayProteinConflict = false;
    if (slot === 'Lauk Utama' && dayIndex < 5 && menu[dayIndex + 1]?.['Lauk Utama']) {
      if (menu[dayIndex + 1]['Lauk Utama'].protein_tag === dish.protein_tag) {
        nextDayProteinConflict = true;
      }
    }

    const methodCount = methodsThisWeek[dish.method_tag] || 0;

    let costScore = 0;
    if (slot === 'Lauk Utama') {
      const dayCost = estimateDayCost(menu[dayIndex], slot, dish);
      if (dayCost >= minCost && dayCost <= maxCost) costScore = 10;
      else if (dayCost < minCost) costScore = 5;
      else costScore = -5;
    }

    let score = 0;
    score += Math.min(daysSince, 60) * 1.5;
    if (proteinConflict) score -= 80;
    if (nextDayProteinConflict) score -= 80;
    score -= methodCount * 15;
    score += costScore;
    if (daysSince < 21) score -= 40;
    if (daysSince < 7) score -= 40;

    scored.push({ dish, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.length > 0 ? scored[0].dish : null;
}

function estimateDayCost(dayMenu, replacingSlot, newDish) {
  let total = 0;
  for (const slot of SLOTS) {
    if (slot === replacingSlot) total += newDish.cost_per_portion;
    else if (dayMenu[slot]) total += dayMenu[slot].cost_per_portion;
  }
  return total;
}

export function shuffleSlot(dishes, menu, dayIndex, slot) {
  const currentDish = menu[dayIndex][slot];
  const candidates = dishes.filter(d =>
    d.slot === slot && d.active && (!currentDish || d.id !== currentDish.id)
  );
  candidates.sort((a, b) => daysSinceServed(b.last_served_date) - daysSinceServed(a.last_served_date));

  const usedIds = new Set();
  for (let d = 0; d < 6; d++) {
    for (const s of SLOTS) {
      if (d === dayIndex && s === slot) continue;
      if (menu[d][s]) usedIds.add(menu[d][s].id);
    }
  }

  const prevProtein = dayIndex > 0 && menu[dayIndex - 1]?.['Lauk Utama']
    ? menu[dayIndex - 1]['Lauk Utama'].protein_tag : null;
  const nextProtein = dayIndex < 5 && menu[dayIndex + 1]?.['Lauk Utama']
    ? menu[dayIndex + 1]['Lauk Utama'].protein_tag : null;

  const available = candidates.filter(d => {
    if (usedIds.has(d.id)) return false;
    if (slot === 'Lauk Utama') {
      if (prevProtein && d.protein_tag === prevProtein) return false;
      if (nextProtein && d.protein_tag === nextProtein) return false;
    }
    return true;
  });

  if (available.length === 0) return candidates[0] || null;
  const topN = Math.min(available.length, 5);
  return available[Math.floor(Math.random() * topN)];
}

export function analyzeMenu(menu) {
  const proteinCounts = {};
  let totalCost = 0;
  let filledDays = 0;
  const warnings = [];

  for (let day = 0; day < 6; day++) {
    let dayCost = 0;
    let dayFilled = 0;
    for (const slot of SLOTS) {
      const dish = menu[day]?.[slot];
      if (dish) {
        dayCost += dish.cost_per_portion;
        dayFilled++;
        if (slot === 'Lauk Utama') {
          proteinCounts[dish.protein_tag] = (proteinCounts[dish.protein_tag] || 0) + 1;
        }
      }
    }
    if (dayFilled > 0) {
      totalCost += dayCost;
      filledDays++;
    }
  }

  const avgCost = filledDays > 0 ? Math.round(totalCost / filledDays) : 0;

  for (const [protein, count] of Object.entries(proteinCounts)) {
    if (count >= 3) {
      const label = protein.charAt(0).toUpperCase() + protein.slice(1);
      warnings.push(`${label} muncul ${count}× minggu ini`);
    }
  }

  return { totalCost, avgCost, filledDays, proteinCounts, warnings };
}
