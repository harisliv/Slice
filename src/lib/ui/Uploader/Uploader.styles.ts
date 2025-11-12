import { Box, Link } from "@mui/material";
import styled from "styled-components";
import { EnumWeight } from "@app/lib/types";

export const UploaderContainer = styled(Box)`
  width: 100%;
`;

export const DragAndDropContainer = styled(Box)<{
  $isSelected: boolean;
  $isDragAccept: boolean;
  $isDragReject: boolean;
  $isLoading: boolean;
}>`
  position: relative;
  justify-content: ${(props) => (props.$isLoading ? `left` : `center`)};
  display: flex;
  flex-direction: column;
  gap: 5px;
  text-align: center;
  padding: ${(props) =>
    props.$isLoading || props.$isSelected ? `0` : `15px 0`};
  border-radius: 8px;
  background-color: ${(props) => {
    if (props.$isLoading || props.$isSelected) {
      return "transparent";
    } else if (props.$isDragAccept) {
      return props.theme.palette.background.azur4;
    } else if (props.$isDragReject) {
      return props.theme.palette.error.errorPinkLight;
    } else {
      return "transparent";
    }
  }};
  border: ${(props) => {
    if (props.$isLoading || props.$isSelected) {
      return "none";
    } else if (props.$isDragAccept) {
      return `2.5px dashed ${props.theme.palette.primary.ocean}`;
    } else if (props.$isDragReject) {
      return `2.5px dashed ${props.theme.palette.secondary.errorPink}`;
    } else {
      return `2.5px dashed ${props.theme.palette.controlsAndStatus.disabled}`;
    }
  }};

  h4,
  p {
    width: 100%;
  }
  p {
    font-size: ${(props) => props.theme.fontSizes.body.m};
  }
  &:focus-visible {
    > div:nth-child(3) {
      > a {
        outline: 2px solid ${(props) => props.theme.palette.primary.ocean};
        outline-offset: -2px;
        border-radius: 2px;
      }
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    margin: 0;
    p {
      font-size: ${(props) => props.theme.fontSizes.body.s};
    }
  }
`;

export const WrapperUploadIcon = styled(Box)<{
  $isDragAccept: boolean;
  $isDragReject: boolean;
}>`
  svg {
    width: 32px;
    height: 32px;
    path {
      fill: ${(props) => {
        if (props.$isDragAccept) {
          return props.theme.palette.secondary.lightGreen;
        } else if (props.$isDragReject) {
          return props.theme.palette.error.errorPink;
        } else {
          return props.theme.palette.secondary.lightGreen;
        }
      }};
    }
  }
`;
export const WrapperBeforeUpload = styled(Box)`
  padding: 0 15px;
  > span {
    line-height: 22px;
    font-family: ${(props) => props.theme.fontFamilies.Roboto};
    font-size: ${(props) => props.theme.fontSizes.body.l};
    color: ${(props) => props.theme.palette.primary.darkerGrey};
    font-weight: ${EnumWeight.bold};
  }
`;

export const SelectLabelContainer = styled(Box)`
  display: flex;
  flex-direction: column;
`;

export const SelectErrorTitle = styled.span`
  margin: 0;
  padding: 0;
  line-height: 22px;
  font-family: ${(props) => props.theme.fontFamilies.Roboto};
  font-size: ${(props) => props.theme.fontSizes.body.l};
  color: ${(props) => props.theme.palette.primary.darkerGrey};
  font-weight: ${EnumWeight.bold};
`;

export const SelectErrorSubtitle = styled.span`
  margin: 0;
  padding: 0;
  line-height: 22px;
  font-family: ${(props) => props.theme.fontFamilies.Roboto};
  font-size: ${(props) => props.theme.fontSizes.body.l};
  color: ${(props) => props.theme.palette.primary.darkerGrey};
  font-weight: ${EnumWeight.normal};
`;

export const UploadLink = styled(Link)`
  cursor: pointer;
  font-family: ${(props) => props.theme.fontFamilies.Roboto};
  color: ${(props) => props.theme.palette.primary.azur};
  line-height: 20px;
  font-weight: ${EnumWeight.extraNormal};
  font-size: ${(props) => props.theme.fontSizes.body.l};
  margin: 0px 5px;
  &:hover {
    color: ${(props) => props.theme.palette.controlsAndStatus.hoverBlue};
  }
`;
export const UploadingDiv = styled(Box)`
  font-family: ${(props) => props.theme.fontFamilies.Roboto};
  color: ${(props) => props.theme.palette.primary.darkerGrey};
  font-style: normal;
  font-size: ${(props) => props.theme.fontSizes.body.m};
  font-weight: ${EnumWeight.normal};
  text-align: left;
  padding-bottom: 16px;
  + .MuiGrid-root {
    width: 100%;
    margin: 0;
    > .MuiGrid-item {
      padding: 5px 5px 3px 5px;
    }
  }
`;
export const StyledGrid = styled(Box)<{
  error?: string;
}>`
  display: flex;
  gap: 8px;
  box-shadow: 0px 4px 12px 4px rgba(25, 25, 112, 0.08);
  border-radius: 6px;
  padding: 8px 12px;
  margin-top: 10px;
  border: 1px solid
    ${(props) =>
      props.error === "true"
        ? props.theme.palette.error.errorPink
        : "transparent"};
`;

export const UploaderInfoCol = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const DeleteIconWrapper = styled(Box)`
  width: 20px;
  height: 20px;
  text-align: end;
  cursor: pointer;
`;

export const LoadingFileInfo = styled(Box)`
  font-family: ${(props) => props.theme.fontFamilies.Roboto};
  color: ${(props) => props.theme.palette.controlsAndStatus.disabled};
  font-style: normal;
  font-size: ${(props) => props.theme.fontSizes.body.m};
  font-weight: ${EnumWeight.bold};
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LoadedFileTitle = styled.span`
  margin: 0;
  padding: 0;
  text-align: left;
  font-family: ${(props) => props.theme.fontFamilies.Roboto};
  color: ${(props) => props.theme.palette.primary.darkerGrey};
  font-size: ${(props) => props.theme.fontSizes.body.m};
  font-weight: ${EnumWeight.bold};
`;

export const LoadedFileInfo = styled(LoadingFileInfo)`
  color: ${(props) => props.theme.palette.primary.darkerGrey};
`;

export const LoadingFileSize = styled(Box)`
  font-family: ${(props) => props.theme.fontFamilies.Roboto};
  color: ${(props) => props.theme.palette.controlsAndStatus.disabled};
  font-style: normal;
  font-size: ${(props) => props.theme.fontSizes.body.s};
  font-weight: ${EnumWeight.normal};
  text-align: left;
  padding-top: 4px;
`;
export const LoadedFileSize = styled(LoadingFileSize)`
  color: ${(props) => props.theme.palette.primary.darkerGrey};
`;
