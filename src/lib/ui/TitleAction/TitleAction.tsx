import ButtonComponent from "../Button";
import { Header3 } from "../Global";
import { Stack } from "@mui/material";
import type { TitleActionProps } from "./TitleAction.types";

const TitleAction = ({
  title,
  to,
  RouterLink,
  buttonTitle,
}: TitleActionProps) => (
  <Stack direction={"row"} justifyContent="space-between" alignItems="center">
    <Header3 variant="bold">{title}</Header3>
    <ButtonComponent to={to} RouterLink={RouterLink} customVariant="edit">
      {buttonTitle ?? "Edit"}
    </ButtonComponent>
  </Stack>
);

export default TitleAction;
