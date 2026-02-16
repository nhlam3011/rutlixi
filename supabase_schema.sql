-- Create Prizes Table
create table public.prizes (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text not null check (type in ('money', 'wish')),
  value int default 0,
  quantity int default 0,
  remaining int default 0,
  weight int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Draws Table
create table public.draws (
  id uuid default gen_random_uuid() primary key,
  user_name text not null,
  prize_id uuid references public.prizes(id),
  ip_address text,
  selfie_url text,
  qr_url text,
  status text default 'pending', -- pending, completed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.prizes enable row level security;
alter table public.draws enable row level security;

-- Policies (For prototype, allowing public read for prizes, insert for draws)
-- In production, you'd want stricter policies.

-- Allow anyone to read prizes (to know what to draw)
create policy "Allow public read prizes"
on public.prizes for select
to public
using (true);

-- Allow anyone to update prizes (Admin feature)
create policy "Allow public update prizes"
on public.prizes for update
to public
using (true);

-- Allow anyone to delete prizes (Admin feature)
create policy "Allow public delete prizes"
on public.prizes for delete
to public
using (true);

-- Allow anyone to insert a draw
create policy "Allow public insert draw"
on public.draws for insert
to public
with check (true);

-- Allow public to update their own draw (for uploading images) - simplified for now
create policy "Allow public update draw"
on public.draws for update
to public
using (true);

-- Allow public read draws (for admin, simplified)
create policy "Allow public read draws"
on public.draws for select
to public
using (true);

-- Allow anyone to delete draws (Admin feature)
create policy "Allow public delete draws"
on public.draws for delete
to public
using (true);

-- Seed Data (Initial Prizes)
insert into public.prizes (name, type, value, quantity, remaining, weight)
values
  ('10.000 VNĐ', 'money', 10000, 50, 50, 20),
  ('20.000 VNĐ', 'money', 20000, 20, 20, 10),
  ('50.000 VNĐ', 'money', 50000, 5, 5, 2),
  ('100.000 VNĐ', 'money', 100000, 1, 1, 1),
  ('Lời Chúc May Mắn', 'wish', 0, 1000, 1000, 100);
