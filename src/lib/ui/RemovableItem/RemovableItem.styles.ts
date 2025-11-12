import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledItemContainer = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1, 2)};
  border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px;
  box-shadow: 0 4px 12px 4px rgba(25, 25, 112, 0.08);
  width: 50%;
`;
