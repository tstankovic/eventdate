import React, { useEffect, useState } from "react";
import {
  ActionFunction,
  LoaderFunction,
  Outlet,
  redirect,
  useLoaderData,
  useOutletContext,
  useSubmit,
} from "react-router-dom";
import { supabase } from "../supabaseClient";
import { DateType, Poll as PollType, Votes } from "../types";
import { styled, Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const rows = JSON.parse(formData.get("votes") as string);
  await supabase.from("votes").insert(rows);
  return redirect("results");
};

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

  const votes: Votes = {};
  (data[0].dates as PollType["dates"]).forEach((d: DateType) => {
    d.times.forEach((t) => (votes[t.id] = null));
  });

  return {
    poll: data[0],
    votes,
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
  const { poll, votes: initialVotes } = data as {
    poll: PollType;
    votes: Votes;
  };
  const { title, shortkey } = poll;

  const [votes, setVotes] = useState<Votes>({ ...initialVotes });
  const [urlCopied, setUrlCopied] = useState(false);

  const submit = useSubmit();

  useEffect(() => {
    document.title = `Eventdate: ${title}`;
  }, []);

  const registerVote = (time: number, vote: boolean) => {
    setVotes({ ...votes, [time]: vote });
  };

  const handleVote = (name: string) => {
    const rows = Object.keys(votes)
      .filter((k) => votes[+k] !== null)
      .map((k) => ({ time: k, vote: votes[+k], name }));
    const formData = new FormData();
    formData.append("votes", JSON.stringify(rows));
    submit(formData, { method: "post" });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(location.href);
    setUrlCopied(true);
  };

  return (
    <PollWrapper>
      <Container maxWidth="md">
        <Box
          sx={{
            border: 1,
            borderColor: "success.main",
            borderRadius: 2,
            backgroundColor: "rgba(0, 100, 0, 0.1)",
            p: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ color: "success.main", fontWeight: "bold" }}
          >
            SHARE THIS POLL
          </Typography>
          <Typography variant="body2" sx={{ color: "success.main" }}>
            Copy and paste the URL of this web page to share with the people you
            want to cast their vote:
          </Typography>
          <Box
            sx={{
              mt: 1,
              px: 1,
              py: 0.5,
              border: 1,
              borderRadius: 2,
              borderStyle: "dashed",
              borderColor: "divider",
              backgroundColor: (theme) => theme.palette.background.default,
              display: "flex",
              alignItems: "center",
              width: "max-content",
            }}
          >
            <Typography
              variant="body2"
              color="GrayText"
              sx={{ fontWeight: "bold" }}
            >
              {`${location.origin}/p/${shortkey}/`}
            </Typography>
            {urlCopied ? (
              <Tooltip title="Copied!" sx={{ ml: 1 }}>
                <IconButton size="small">
                  <CheckIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            ) : (
              <IconButton size="small" sx={{ ml: 1 }} onClick={handleCopy}>
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
            backgroundColor: "background.paper",
            p: 2,
            mt: 2,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "lighter" }}>
            {title}
          </Typography>
          <Outlet context={{ poll, votes, registerVote, handleVote }} />
        </Box>
      </Container>
    </PollWrapper>
  );
};

export function usePoll() {
  return useOutletContext<{
    poll: PollType;
    votes: Votes;
    registerVote: (time: number, vote: boolean) => void;
    handleVote: (name: string) => Promise<void>;
    isLoading: boolean;
  }>();
}

export default Poll;
