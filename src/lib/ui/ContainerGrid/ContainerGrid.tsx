import Grid2 from "@mui/material/Grid2";

export default function ContainerGrid({
  withParentGrid,
  children,
}: {
  withParentGrid: boolean;
  children: React.ReactNode;
}) {
  return withParentGrid ? <Grid2 container>{children}</Grid2> : children;
}
