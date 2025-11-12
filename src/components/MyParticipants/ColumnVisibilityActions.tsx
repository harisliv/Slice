import React from "react";
import { Stack, Popover, Divider, IconButton } from "@mui/material";
import { ColumnsIcon, ExitIcon } from "@app/lib/icons";
import { Paragraph } from "@app/lib/ui";
import { ButtonComponent } from "@app/lib/ui";
import { VisibilityCard } from "./VisibilityCard";
import type { VisibilityState } from "@tanstack/react-table";

interface ColumnVisibilityActionsProps {
  visibility: VisibilityState;
  setVisibility: (
    updaterOrValue:
      | VisibilityState
      | ((old: VisibilityState) => VisibilityState),
  ) => void;
}

export default function ColumnVisibilityActions({
  visibility,
  setVisibility,
}: ColumnVisibilityActionsProps) {
  const [anchorElColumns, setAnchorElColumns] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClickColumns = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElColumns(event.currentTarget);
  };

  const handleCloseColumns = () => {
    setAnchorElColumns(null);
  };

  const openColumnsPopover = Boolean(anchorElColumns);
  const idColumnsPopover = openColumnsPopover ? "simple-popover" : undefined;

  return (
    <>
      <ButtonComponent
        aria-describedby={idColumnsPopover}
        customVariant="terciary-m"
        startIcon={<ColumnsIcon />}
        onClick={handleClickColumns}
      >
        Show Columns
      </ButtonComponent>
      <Popover
        id={idColumnsPopover}
        open={openColumnsPopover}
        anchorEl={anchorElColumns}
        onClose={handleCloseColumns}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            className: "popover-paper",
          },
        }}
      >
        <Stack
          direction="column"
          spacing={1}
          padding={1}
          overflow="auto"
          maxHeight="300px"
          width="250px"
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Paragraph variant="medium-bold">Show columns</Paragraph>
            <IconButton onClick={handleCloseColumns}>
              <ExitIcon />
            </IconButton>
          </Stack>
          <Divider />
          <VisibilityCard
            visibility={visibility}
            setVisibility={setVisibility}
          />
        </Stack>
      </Popover>
    </>
  );
}
