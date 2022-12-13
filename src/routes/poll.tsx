import React, { useEffect } from "react";
import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { supabase } from "../supabaseClient";
import { Poll as PollType } from "../types";
import { styled, Theme } from "@mui/material";
import Container from "@mui/material/Container";

export const loader: LoaderFunction = async ({ params }) => {
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
    .filter("shortkey", "eq", params.shortkey);

  if (!data || !data[0]) {
    throw new Response("", { status: 404, statusText: "Not found" });
  }

  return {
    poll: data[0],
  };
};

const PollWrapper = styled("div")(({ theme }) => ({
  flex: 1,
  backgroundColor:
    theme.palette.mode === "light"
      ? (theme as Theme).palette.grey[100]
      : "#181818",
  padding: "2rem 0",
}));

const Poll: React.FC = () => {
  const data = useLoaderData();
  const { poll } = data as { poll: PollType };
  const { title } = poll;

  useEffect(() => {
    document.title = `Eventdate: ${title}`;
  }, []);

  return (
    <PollWrapper>
      <Container maxWidth="md">
        <Outlet context={{ poll }} />
      </Container>
    </PollWrapper>
  );
};

export function usePoll() {
  return useOutletContext<{ poll: PollType }>();
}

export default Poll;
