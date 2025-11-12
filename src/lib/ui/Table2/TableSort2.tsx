import { Stack } from "@mui/material";
import { SortIcon } from "@app/lib/icons";
import { Theme } from "@app/lib/general";

export default function TableSort({ column }: any) {
  const sortDirection = column.getIsSorted();

  return (
    <Stack direction="column">
      <SortIcon
        fillUp={
          sortDirection === "asc"
            ? Theme.palette.primary.snow
            : Theme.palette.controlsAndStatus.disabled
        }
        fillDown={
          sortDirection === "desc"
            ? Theme.palette.primary.snow
            : Theme.palette.controlsAndStatus.disabled
        }
      />
    </Stack>
  );
}
