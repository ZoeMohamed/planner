// ~60 realistic Indonesian catering dishes for seeding Supabase
// Uses snake_case field names matching the DB schema

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0];
}

export const SEED_DISHES = [
  // -- Lauk Utama --
  { name: 'Ayam goreng kremes', slot: 'Lauk Utama', protein_tag: 'ayam', method_tag: 'goreng', spice_level: 1, cost_per_portion: 7500, ingredients: ['ayam','tepung terigu','bawang putih','ketumbar','minyak goreng'], active: true, last_served_date: daysAgo(3) },
  { name: 'Ayam rica-rica', slot: 'Lauk Utama', protein_tag: 'ayam', method_tag: 'tumis', spice_level: 3, cost_per_portion: 7000, ingredients: ['ayam','cabai merah','cabai rawit','tomat','daun kemangi'], active: true, last_served_date: daysAgo(21) },
  { name: 'Ayam bakar madu', slot: 'Lauk Utama', protein_tag: 'ayam', method_tag: 'bakar', spice_level: 1, cost_per_portion: 8000, ingredients: ['ayam','kecap manis','madu','bawang putih','jahe'], active: true, last_served_date: daysAgo(14) },
  { name: 'Rendang daging', slot: 'Lauk Utama', protein_tag: 'daging', method_tag: 'tumis', spice_level: 2, cost_per_portion: 12000, ingredients: ['daging sapi','santan','serai','lengkuas','daun jeruk'], active: true, last_served_date: daysAgo(28) },
  { name: 'Empal daging', slot: 'Lauk Utama', protein_tag: 'daging', method_tag: 'goreng', spice_level: 1, cost_per_portion: 11000, ingredients: ['daging sapi','ketumbar','bawang putih','gula merah','santan'], active: true, last_served_date: daysAgo(35) },
  { name: 'Semur daging', slot: 'Lauk Utama', protein_tag: 'daging', method_tag: 'kuah', spice_level: 1, cost_per_portion: 10500, ingredients: ['daging sapi','kecap manis','pala','cengkeh','kentang'], active: true, last_served_date: daysAgo(7) },
  { name: 'Ikan bakar bumbu padang', slot: 'Lauk Utama', protein_tag: 'ikan', method_tag: 'bakar', spice_level: 2, cost_per_portion: 8500, ingredients: ['ikan kembung','cabai merah','bawang merah','kunyit','jeruk nipis'], active: true, last_served_date: daysAgo(10) },
  { name: 'Ikan goreng tepung', slot: 'Lauk Utama', protein_tag: 'ikan', method_tag: 'goreng', spice_level: 0, cost_per_portion: 7000, ingredients: ['ikan dori','tepung terigu','tepung beras','bawang putih','garam'], active: true, last_served_date: daysAgo(5) },
  { name: 'Pindang ikan patin', slot: 'Lauk Utama', protein_tag: 'ikan', method_tag: 'kuah', spice_level: 1, cost_per_portion: 8000, ingredients: ['ikan patin','nanas','tomat','cabai hijau','belimbing wuluh'], active: true, last_served_date: daysAgo(18) },
  { name: 'Telur balado', slot: 'Lauk Utama', protein_tag: 'telur', method_tag: 'goreng', spice_level: 2, cost_per_portion: 4500, ingredients: ['telur ayam','cabai merah','bawang merah','tomat','gula pasir'], active: true, last_served_date: daysAgo(2) },
  { name: 'Telur bumbu Bali', slot: 'Lauk Utama', protein_tag: 'telur', method_tag: 'tumis', spice_level: 2, cost_per_portion: 5000, ingredients: ['telur ayam','cabai','terasi','kecap manis','tomat'], active: true, last_served_date: daysAgo(25) },
  { name: 'Tempe mendoan', slot: 'Lauk Utama', protein_tag: 'nabati', method_tag: 'goreng', spice_level: 0, cost_per_portion: 3500, ingredients: ['tempe','tepung terigu','daun bawang','bawang putih','ketumbar'], active: true, last_served_date: daysAgo(12) },
  { name: 'Tahu isi sayuran', slot: 'Lauk Utama', protein_tag: 'nabati', method_tag: 'goreng', spice_level: 0, cost_per_portion: 4000, ingredients: ['tahu','wortel','tauge','daun bawang','tepung terigu'], active: true, last_served_date: daysAgo(30) },
  { name: 'Ayam geprek', slot: 'Lauk Utama', protein_tag: 'ayam', method_tag: 'goreng', spice_level: 3, cost_per_portion: 7500, ingredients: ['ayam','tepung terigu','cabai rawit','bawang putih','garam'], active: true, last_served_date: daysAgo(8) },
  { name: 'Gulai ayam', slot: 'Lauk Utama', protein_tag: 'ayam', method_tag: 'kuah', spice_level: 2, cost_per_portion: 8000, ingredients: ['ayam','santan','kunyit','lengkuas','daun kunyit'], active: true, last_served_date: daysAgo(45) },
  { name: 'Ikan tongkol suwir', slot: 'Lauk Utama', protein_tag: 'ikan', method_tag: 'tumis', spice_level: 2, cost_per_portion: 6500, ingredients: ['tongkol','cabai hijau','bawang merah','tomat','daun jeruk'], active: true, last_served_date: daysAgo(16) },
  { name: 'Daging lada hitam', slot: 'Lauk Utama', protein_tag: 'daging', method_tag: 'tumis', spice_level: 1, cost_per_portion: 11500, ingredients: ['daging sapi','lada hitam','paprika','bawang bombay','kecap inggris'], active: true, last_served_date: daysAgo(22) },
  { name: 'Pepes ikan', slot: 'Lauk Utama', protein_tag: 'ikan', method_tag: 'kukus', spice_level: 1, cost_per_portion: 7500, ingredients: ['ikan mas','kemangi','cabai','bawang merah','daun pisang'], active: true, last_served_date: daysAgo(33) },
  { name: 'Opor ayam', slot: 'Lauk Utama', protein_tag: 'ayam', method_tag: 'kuah', spice_level: 0, cost_per_portion: 7500, ingredients: ['ayam','santan','kemiri','ketumbar','serai'], active: true, last_served_date: daysAgo(40) },
  { name: 'Perkedel jagung daging', slot: 'Lauk Utama', protein_tag: 'daging', method_tag: 'goreng', spice_level: 0, cost_per_portion: 6500, ingredients: ['daging giling','jagung manis','telur','tepung terigu','daun bawang'], active: true, last_served_date: daysAgo(19) },

  // -- Sayur --
  { name: 'Sayur asem', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'kuah', spice_level: 1, cost_per_portion: 2500, ingredients: ['kacang panjang','labu siam','jagung','melinjo','asam jawa'], active: true, last_served_date: daysAgo(4) },
  { name: 'Tumis buncis wortel', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'tumis', spice_level: 0, cost_per_portion: 2000, ingredients: ['buncis','wortel','bawang putih','bawang merah','kecap manis'], active: true, last_served_date: daysAgo(6) },
  { name: 'Capcay', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'tumis', spice_level: 0, cost_per_portion: 3000, ingredients: ['sawi putih','wortel','brokoli','jamur kuping','bawang putih'], active: true, last_served_date: daysAgo(11) },
  { name: 'Sayur lodeh', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'kuah', spice_level: 1, cost_per_portion: 2800, ingredients: ['labu siam','tempe','terong','santan','daun salam'], active: true, last_served_date: daysAgo(15) },
  { name: 'Urap sayuran', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'kukus', spice_level: 1, cost_per_portion: 2200, ingredients: ['kacang panjang','tauge','bayam','kelapa parut','cabai'], active: true, last_served_date: daysAgo(20) },
  { name: 'Sayur bening bayam', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'kuah', spice_level: 0, cost_per_portion: 1800, ingredients: ['bayam','jagung manis','bawang merah','bawang putih','gula pasir'], active: true, last_served_date: daysAgo(9) },
  { name: 'Tumis kangkung', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'tumis', spice_level: 1, cost_per_portion: 2000, ingredients: ['kangkung','bawang putih','cabai merah','terasi','gula pasir'], active: true, last_served_date: daysAgo(1) },
  { name: 'Gulai nangka', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'kuah', spice_level: 1, cost_per_portion: 3000, ingredients: ['nangka muda','santan','cabai','kunyit','serai'], active: true, last_served_date: daysAgo(26) },
  { name: 'Oseng tempe kecap', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'tumis', spice_level: 1, cost_per_portion: 2500, ingredients: ['tempe','kecap manis','cabai hijau','bawang merah','tomat'], active: true, last_served_date: daysAgo(13) },
  { name: 'Sayur sop', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'kuah', spice_level: 0, cost_per_portion: 2500, ingredients: ['kentang','wortel','buncis','daun bawang','seledri'], active: true, last_served_date: daysAgo(17) },
  { name: 'Terong balado', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'goreng', spice_level: 2, cost_per_portion: 2200, ingredients: ['terong','cabai merah','bawang merah','tomat','gula pasir'], active: true, last_served_date: daysAgo(23) },
  { name: 'Tumis labu siam', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'tumis', spice_level: 0, cost_per_portion: 1800, ingredients: ['labu siam','bawang putih','ebi','cabai merah','gula pasir'], active: true, last_served_date: daysAgo(31) },
  { name: 'Pecel sayuran', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'rebus', spice_level: 1, cost_per_portion: 2500, ingredients: ['kacang panjang','tauge','bayam','kacang tanah','cabai'], active: true, last_served_date: daysAgo(38) },
  { name: 'Acar kuning', slot: 'Sayur', protein_tag: 'nabati', method_tag: 'rebus', spice_level: 0, cost_per_portion: 2000, ingredients: ['timun','wortel','bawang merah','kunyit','cuka'], active: true, last_served_date: daysAgo(42) },
  { name: 'Cah jamur bakso', slot: 'Sayur', protein_tag: 'daging', method_tag: 'tumis', spice_level: 0, cost_per_portion: 3200, ingredients: ['jamur merang','bakso sapi','sawi hijau','bawang putih','saus tiram'], active: true, last_served_date: daysAgo(29) },

  // -- Pelengkap --
  { name: 'Tahu bacem', slot: 'Pelengkap', protein_tag: 'nabati', method_tag: 'goreng', spice_level: 0, cost_per_portion: 2000, ingredients: ['tahu','kecap manis','bawang putih','ketumbar','daun salam'], active: true, last_served_date: daysAgo(5) },
  { name: 'Perkedel kentang', slot: 'Pelengkap', protein_tag: 'telur', method_tag: 'goreng', spice_level: 0, cost_per_portion: 2500, ingredients: ['kentang','telur','daun bawang','pala','garam'], active: true, last_served_date: daysAgo(3) },
  { name: 'Sambal goreng kentang', slot: 'Pelengkap', protein_tag: 'nabati', method_tag: 'goreng', spice_level: 2, cost_per_portion: 2800, ingredients: ['kentang','cabai merah','petai','bawang merah','gula merah'], active: true, last_served_date: daysAgo(10) },
  { name: 'Kerupuk udang', slot: 'Pelengkap', protein_tag: 'ikan', method_tag: 'goreng', spice_level: 0, cost_per_portion: 1500, ingredients: ['kerupuk udang','minyak goreng'], active: true, last_served_date: daysAgo(0) },
  { name: 'Tempe orek', slot: 'Pelengkap', protein_tag: 'nabati', method_tag: 'tumis', spice_level: 1, cost_per_portion: 2000, ingredients: ['tempe','kecap manis','cabai rawit','bawang putih','gula merah'], active: true, last_served_date: daysAgo(7) },
  { name: 'Telur dadar padang', slot: 'Pelengkap', protein_tag: 'telur', method_tag: 'goreng', spice_level: 1, cost_per_portion: 2500, ingredients: ['telur','daun bawang','cabai hijau','bawang merah','kelapa parut'], active: true, last_served_date: daysAgo(14) },
  { name: 'Kentang balado', slot: 'Pelengkap', protein_tag: 'nabati', method_tag: 'goreng', spice_level: 2, cost_per_portion: 2200, ingredients: ['kentang','cabai merah','bawang merah','tomat','gula pasir'], active: true, last_served_date: daysAgo(20) },
  { name: 'Bakwan sayur', slot: 'Pelengkap', protein_tag: 'nabati', method_tag: 'goreng', spice_level: 0, cost_per_portion: 1800, ingredients: ['wortel','kol','tauge','tepung terigu','bawang putih'], active: true, last_served_date: daysAgo(9) },
  { name: 'Mie goreng', slot: 'Pelengkap', protein_tag: 'telur', method_tag: 'goreng', spice_level: 1, cost_per_portion: 2500, ingredients: ['mie telur','kecap manis','sawi hijau','bawang putih','telur'], active: true, last_served_date: daysAgo(16) },
  { name: 'Sambal terasi', slot: 'Pelengkap', protein_tag: 'nabati', method_tag: 'goreng', spice_level: 3, cost_per_portion: 1000, ingredients: ['cabai merah','cabai rawit','terasi','tomat','jeruk limau'], active: true, last_served_date: daysAgo(2) },
  { name: 'Kering tempe', slot: 'Pelengkap', protein_tag: 'nabati', method_tag: 'goreng', spice_level: 1, cost_per_portion: 2000, ingredients: ['tempe','kacang tanah','cabai merah','bawang putih','gula merah'], active: true, last_served_date: daysAgo(24) },
  { name: 'Abon ayam', slot: 'Pelengkap', protein_tag: 'ayam', method_tag: 'goreng', spice_level: 1, cost_per_portion: 3500, ingredients: ['ayam','serai','lengkuas','bawang merah','gula merah'], active: true, last_served_date: daysAgo(32) },
  { name: 'Rempeyek kacang', slot: 'Pelengkap', protein_tag: 'nabati', method_tag: 'goreng', spice_level: 0, cost_per_portion: 1500, ingredients: ['kacang tanah','tepung beras','daun jeruk','bawang putih','ketumbar'], active: true, last_served_date: daysAgo(11) },
  { name: 'Macaroni schotel', slot: 'Pelengkap', protein_tag: 'telur', method_tag: 'panggang', spice_level: 0, cost_per_portion: 3000, ingredients: ['macaroni','keju','susu','telur','kornet'], active: true, last_served_date: daysAgo(27) },
  { name: 'Tahu crispy', slot: 'Pelengkap', protein_tag: 'nabati', method_tag: 'goreng', spice_level: 0, cost_per_portion: 1800, ingredients: ['tahu','tepung terigu','tepung beras','bawang putih','garam'], active: true, last_served_date: daysAgo(18) },

  // -- Buah/Dessert --
  { name: 'Semangka potong', slot: 'Buah/Dessert', protein_tag: 'nabati', method_tag: 'segar', spice_level: 0, cost_per_portion: 1500, ingredients: ['semangka'], active: true, last_served_date: daysAgo(2) },
  { name: 'Melon potong', slot: 'Buah/Dessert', protein_tag: 'nabati', method_tag: 'segar', spice_level: 0, cost_per_portion: 1800, ingredients: ['melon'], active: true, last_served_date: daysAgo(8) },
  { name: 'Pisang', slot: 'Buah/Dessert', protein_tag: 'nabati', method_tag: 'segar', spice_level: 0, cost_per_portion: 1000, ingredients: ['pisang'], active: true, last_served_date: daysAgo(1) },
  { name: 'Pepaya potong', slot: 'Buah/Dessert', protein_tag: 'nabati', method_tag: 'segar', spice_level: 0, cost_per_portion: 1200, ingredients: ['pepaya'], active: true, last_served_date: daysAgo(5) },
  { name: 'Puding coklat', slot: 'Buah/Dessert', protein_tag: 'nabati', method_tag: 'kukus', spice_level: 0, cost_per_portion: 2000, ingredients: ['agar-agar','coklat bubuk','susu','gula pasir'], active: true, last_served_date: daysAgo(12) },
  { name: 'Puding buah', slot: 'Buah/Dessert', protein_tag: 'nabati', method_tag: 'kukus', spice_level: 0, cost_per_portion: 2200, ingredients: ['agar-agar','susu','buah cocktail','gula pasir'], active: true, last_served_date: daysAgo(19) },
  { name: 'Kolak pisang', slot: 'Buah/Dessert', protein_tag: 'nabati', method_tag: 'kuah', spice_level: 0, cost_per_portion: 2000, ingredients: ['pisang raja','santan','gula merah','daun pandan'], active: true, last_served_date: daysAgo(25) },
  { name: 'Es buah', slot: 'Buah/Dessert', protein_tag: 'nabati', method_tag: 'segar', spice_level: 0, cost_per_portion: 2500, ingredients: ['semangka','melon','nata de coco','sirup','es batu'], active: true, last_served_date: daysAgo(30) },
  { name: 'Jeruk potong', slot: 'Buah/Dessert', protein_tag: 'nabati', method_tag: 'segar', spice_level: 0, cost_per_portion: 1500, ingredients: ['jeruk'], active: true, last_served_date: daysAgo(4) },
  { name: 'Bubur kacang hijau', slot: 'Buah/Dessert', protein_tag: 'nabati', method_tag: 'kuah', spice_level: 0, cost_per_portion: 2000, ingredients: ['kacang hijau','santan','gula merah','daun pandan','garam'], active: true, last_served_date: daysAgo(35) },
];
