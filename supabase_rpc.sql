-- Function to atomically draw a prize based on weights
create or replace function draw_lucky_money(p_user_name text, p_ip_address text)
returns json
language plpgsql
as $$
declare
  v_prize record;
  v_draw_id uuid;
  v_total_weight int;
  v_random_weight int;
begin
  -- Lock the prizes table to prevent race conditions (optional but safer for high concurrency)
  -- lock table prizes in share row exclusive mode;

  -- Calculate total weight of available prizes
  select sum(weight) into v_total_weight from prizes where remaining > 0;

  if v_total_weight is null or v_total_weight = 0 then
    -- Fallback if no prizes: Return a "Wish" prize if it exists, otherwise error
    select * into v_prize from prizes where type = 'wish' limit 1;
    if v_prize is null then
       return json_build_object('error', 'Hết phần thưởng');
    end if;
  else
    -- Random number between 0 and total_weight - 1
    v_random_weight := floor(random() * v_total_weight);

    -- Select prize based on weight
    -- We use a CTE to calculate cumulative weights
    with cumulative as (
      select *, 
             sum(weight) over (order by id) - weight as min_weight, 
             sum(weight) over (order by id) as max_weight
      from prizes
      where remaining > 0
    )
    select * into v_prize 
    from cumulative
    where v_random_weight >= min_weight and v_random_weight < max_weight
    limit 1;
  end if;

  -- Decrement remaining if it's not unlimited (assumed wishes might be unlimited if logic differed, but here we treat all as decrementable)
  -- If you want wishes to be unlimited, change check.
  update prizes set remaining = remaining - 1 where id = v_prize.id;

  -- Create draw record
  insert into draws (user_name, prize_id, ip_address)
  values (p_user_name, v_prize.id, p_ip_address)
  returning id into v_draw_id;

  return json_build_object(
    'draw_id', v_draw_id,
    'prize', row_to_json(v_prize)
  );
end;
$$;
