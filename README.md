# Menu Minggu 🍱

Perencana menu mingguan untuk usaha katering kecil di Indonesia. Susun menu 6 hari dalam 3 menit, langsung dari handphone.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend**: Supabase (PostgreSQL)
- **Styling**: Vanilla CSS with custom design tokens
- **Fonts**: Bricolage Grotesque + Plus Jakarta Sans

## Getting Started

```bash
npm install
```

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run the SQL schema in your Supabase SQL Editor (see `supabase-schema.sql`).

```bash
npm run dev
```

## Features

- **Kotak Hari**: Visual meal box interface — tap a compartment to swap dishes
- **Isi Otomatis**: Smart auto-fill that avoids recent dishes, varies proteins, and respects cost bands
- **Daftar Menu**: CRUD dish library with 60+ preset Indonesian catering dishes
- **Freshness Tracking**: Color-coded dots showing how recently each dish was served
- **Mobile-First**: Designed for one-hand use on a phone

## License

MIT
