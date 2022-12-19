import React, { useEffect } from "react";
import {
  LoaderFunction,
  Outlet,
  useLoaderData,
  useOutletContext,
} from "react-router-dom";
import { getPoll } from "../utils/api";
import { Poll as PollType } from "../utils/types";
import { styled, Theme } from "@mui/material";
import Container from "@mui/material/Container";

export const loader: LoaderFunction = async ({ params }) => {
  const poll = await getPoll(params.shortkey || "");
  return { poll };
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
