import { Poll } from "../../types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

type SharePollProps = {
  poll: Poll;
};

const SharePoll: React.FC<SharePollProps> = ({ poll }) => {
  const [urlCopied, setUrlCopied] = useState(false);

  const { shortkey } = poll;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(location.href);
    setUrlCopied(true);
  };

  return (
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
  );
};

export default SharePoll;
