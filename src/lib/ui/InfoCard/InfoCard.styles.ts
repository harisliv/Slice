import type { ITypography } from "@app/lib/types";
import { styled } from "styled-components";

export const InfoCardUrl = styled.a<ITypography>`
  color: ${(props) => props.theme.palette.primary.darkerGrey};
  font-style: ${(props) => props?.fontStyle ?? "normal"};
  font-family: ${(props) =>
    props?.fontFamily === "Lora"
      ? props.theme.fontFamilies.Lora
      : props.theme.fontFamilies.Roboto};
  font-size: 16px;
  line-height: 22px;
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;

export const InfoCardList = styled.ul<{ $showDot?: boolean }>`
  padding-left: ${({ $showDot }) => ($showDot ? "20px" : "0")};
  margin: 0 0 0 ${({ $showDot }) => ($showDot ? "10px" : "0")};
  list-style-type: ${({ $showDot }) => ($showDot ? "disc" : "none")};
`;
