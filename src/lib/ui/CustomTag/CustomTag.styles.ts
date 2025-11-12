import type { Theme } from "@app/lib/general";
import styled from "styled-components";

export const IconFrame = styled.div`
  padding: 0px 4px;
`;

export const IconContainer = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LabelText = styled.span<{ $textColor: string }>`
  font-weight: 500;
  font-size: 13px;
  color: ${(props) => props.$textColor};
  font-family: ${(props) => props.theme.fontFamilies.Roboto};
`;

export const TagContainer = styled.div<{
  $backgroundColor: keyof (typeof Theme)["palette"]["secondary"];
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 2px 12px 2px 2px;
  max-width: max-content;
  height: 24px;
  background-color: ${(props) =>
    props.theme.palette.secondary[props.$backgroundColor]};
  border-radius: 16px;
`;
