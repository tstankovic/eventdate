import { supabase } from "../utils/supabaseClient";

export const getPoll = async (shortkey: string) => {
  const { data } = await supabase
    .from("polls")
    .select(
      `
      id,
      shortkey,
      title,
      timezone,
      dates (
        id,
        date,
        times (
          id,
          hour,
          minute,
          votes (
            id,
            name,
            vote
          )
        )
      )
      `
    )
    .filter("shortkey", "eq", shortkey);

  if (!data || !data[0]) {
    throw new Response("", { status: 404, statusText: "Not found" });
  }

  return data[0];
};

export const castVotes = async (votes: string) => {
  const rows = JSON.parse(votes);
  await supabase.from("votes").insert(rows);
};
