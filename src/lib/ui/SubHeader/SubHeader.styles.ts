import { Box } from "@mui/material";
import styled from "styled-components";
import { ContentContainer } from "@app/lib/ui";

export const SubHeaderWrapper = styled(Box)<{ $backgroundColor?: string }>`
  display: flex;
  justify-content: center;
  background-color: ${(props) =>
    props.$backgroundColor
      ? props.$backgroundColor
      : props.theme.palette.background.azur4};
  margin-top: ${(props) => props.theme.headerNav.height};
`;

export const StyledContentContainer = styled(ContentContainer)`
  flex-direction: column;
  gap: 5px;
  padding: 32px 0;
  max-width: 1200px;
`;
