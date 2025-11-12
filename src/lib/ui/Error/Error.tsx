import React, { useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Box,
  Snackbar,
  Alert,
  CardHeader,
  Stack,
} from "@mui/material";
import { AttentionErrorIcon, ClipboardIcon } from "@app/lib/icons";
import { Theme } from "@app/lib/general";
import { Header3, Header2 } from "../Global";
import Accordion from "../Accordion";
import type { TErrorResponse } from "@app/lib/types";

interface ErrorCardProps {
  error: TErrorResponse;
  initiativeId?: string;
  initiativeName?: string;
  email?: string;
}

const ErrorCard: React.FC<ErrorCardProps> = ({
  error,
  initiativeId,
  initiativeName,
  email,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCopyError = async () => {
    try {
      await navigator.clipboard.writeText(
        JSON.stringify({
          ...error?.data?.response?.data,
          baseURL: error?.data?.config?.baseURL,
          URL: error?.data?.config?.url,
          method: error?.data?.config?.method,
          headers: error?.data?.config?.headers,
          data: error?.data?.config?.data,
          initiativeId,
          initiativeName,
          email,
        }),
      );
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to copy error message: ", err);
      // Optionally, you could show a different type of alert for copy failure
    }
  };

  const handleCloseSnackbar = (
    _?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: 600,
        margin: "20px auto",
        borderColor: "error.main",
        borderWidth: 3,
        borderStyle: "solid",
        backgroundColor: Theme.palette.errorPink.errorPink8,
        borderRadius: 2,
      }}
    >
      <CardHeader
        title={<Header2 variant="bold-pink">Ooopsss...</Header2>}
        sx={{
          backgroundColor: Theme.palette.errorPink.errorPink16,
        }}
        avatar={
          <AttentionErrorIcon
            fill={Theme.palette.errorPink.errorPink160}
            size={40}
          />
        }
      />
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 1,
          }}
        >
          <Stack textAlign={"left"}>
            <Header3 variant="bold-pink">
              {error.statusText} {error.status}
            </Header3>
            <div>
              <pre>initiativeId: {initiativeId}</pre>
              <pre>initiativeName: {initiativeName}</pre>
              <pre>email: {email}</pre>
            </div>
          </Stack>
          <IconButton
            aria-label="copy error"
            onClick={handleCopyError}
            sx={{
              borderRadius: 2,
              backgroundColor: Theme.palette.errorPink.errorPink30,
              "&:hover": {
                backgroundColor: Theme.palette.errorPink.errorPink80,
              },
            }}
          >
            <ClipboardIcon
              fill={Theme.palette.errorPink.errorPink160}
              size={20}
            />
          </IconButton>
        </Box>
        <Accordion
          items={[
            {
              title: "Stack Trace",
              children: (
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    maxWidth: "100%",
                    overflow: "auto",
                    fontSize: "12px",
                    lineHeight: "1.4",
                    margin: 0,
                    padding: "8px",
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    borderRadius: "4px",
                    fontFamily: "monospace",
                  }}
                >
                  {`Response:
${JSON.stringify(error?.data?.response?.data, null, 2)}

baseURL: ${error?.data?.config?.baseURL || "N/A"}
URL: ${error?.data?.config?.url || "N/A"}
method: ${error?.data?.config?.method || "N/A"}

headers:
${JSON.stringify(error?.data?.config?.headers, null, 2)}

data:
${JSON.stringify(error?.data?.config?.data, null, 2)}
`}
                </pre>
              ),
            },
          ]}
        />
      </CardContent>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Error message copied to clipboard!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ErrorCard;
