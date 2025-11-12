import React from "react";
import { Stack, Popover } from "@mui/material";
import { FileUploadImportIcon } from "@app/lib/icons";
import { ButtonComponent } from "@app/lib/ui";
import { useExcelExport } from "@app/hooks";
import type { Table } from "@tanstack/react-table";
import type { TMyParticipants } from "@app/types";

interface ExportActionsProps {
  table: Table<TMyParticipants>;
  hasActiveFilters: boolean;
}

export default function ExportActions({
  table,
  hasActiveFilters,
}: ExportActionsProps) {
  const { handleExportFilteredTableToExcel, handleExportAllDataToExcel } =
    useExcelExport({
      table,
      excludeColumnId: "id",
    });

  const [anchorElExport, setAnchorElExport] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClickExport = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElExport(event.currentTarget);
  };

  const handleCloseExport = () => {
    setAnchorElExport(null);
  };

  const openExportPopover = Boolean(anchorElExport);
  const idExportPopover = openExportPopover ? "simple-popover" : undefined;

  return (
    <>
      <ButtonComponent
        customVariant="terciary-m"
        startIcon={<FileUploadImportIcon />}
        onClick={handleClickExport}
      >
        Export table
      </ButtonComponent>
      <Popover
        id={idExportPopover}
        open={openExportPopover}
        anchorEl={anchorElExport}
        onClose={handleCloseExport}
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
        <Stack direction="column" spacing={1} padding={1}>
          <ButtonComponent
            disabled={!hasActiveFilters}
            customVariant="terciary-m"
            onClick={handleExportFilteredTableToExcel}
          >
            Export filtered results
          </ButtonComponent>
          <ButtonComponent
            customVariant="terciary-m"
            onClick={handleExportAllDataToExcel}
          >
            Export all results
          </ButtonComponent>
        </Stack>
      </Popover>
    </>
  );
}
