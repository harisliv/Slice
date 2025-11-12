import { Box } from "@mui/material";
import { type ITypography } from "@app/lib/types";
import styled from "styled-components";

/*
 * GLOBAL TYPOGRAPHY COMPONENTS
 */

export const H1 = styled.h1<ITypography>`
  color: ${({ color }) => color};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize};
  font-style: ${({ fontStyle }) => fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ $lineHeight }) => $lineHeight};
  text-transform: ${({ $textTransform }) => $textTransform};
`;

export const H2 = styled.h2<ITypography>`
  color: ${({ color }) => color};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize};
  font-style: ${({ fontStyle }) => fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ $lineHeight }) => $lineHeight};
  text-transform: ${({ $textTransform }) => $textTransform};
`;

export const H3 = styled.h3<ITypography>`
  color: ${({ color }) => color};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize};
  font-style: ${({ fontStyle }) => fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ $lineHeight }) => $lineHeight};
  text-transform: ${({ $textTransform }) => $textTransform};
`;

export const H4 = styled.h4<ITypography>`
  color: ${({ color }) => color};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize};
  font-style: ${({ fontStyle }) => fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ $lineHeight }) => $lineHeight};
  text-transform: ${({ $textTransform }) => $textTransform};
`;

export const H5 = styled.h5<ITypography>`
  color: ${({ color }) => color};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize};
  font-style: ${({ fontStyle }) => fontStyle};
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: ${({ $lineHeight }) => $lineHeight};
  text-transform: ${({ $textTransform }) => $textTransform};
`;

export const P = styled.p<ITypography>`
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-style: ${({ fontStyle }) => fontStyle};
  font-family: ${({ fontFamily }) => fontFamily};
  font-size: ${({ fontSize }) => fontSize};
  line-height: ${({ $lineHeight }) => $lineHeight};
  text-transform: ${({ $textTransform }) => $textTransform};
  display: block;
  overflow-wrap: anywhere;
`;

/*
 * GLOBAL WRAPPER COMPONENTS
 */

export const GenericContainer = styled(Box)`
  display: flex;
  width: 100%;
  max-width: ${(props) => props.theme.breakpoints.xl}px;
  margin: 0 auto;
  padding: 0 20px;
  justify-content: center;
  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    padding: 0 10px;
  }
`;

export const Container = styled(GenericContainer)`
  flex-direction: column;
  position: relative;
  max-width: ${(props) => props.theme.breakpoints.lg}px;
  gap: 30px;

  @media (max-width: ${(props) => props.theme.breakpoints.sm}px) {
    padding: 0 20px;
  }
`;

export const Wrapper = styled(Box)`
  display: flex;
  flex: 1;
`;

const CONTAINER_WIDTH = {
  M: 920,
  L: 1200,
  XL: 1440,
};

export const MainWrapperWithHeader = styled(Box)<{
  $containerWidth: keyof typeof CONTAINER_WIDTH;
  $withFooter?: boolean;
}>`
  padding-top: ${(props) => props.theme.headerNav.height};
  min-height: calc((100vh - ${(props) => props.theme.footerNav.height}));
  max-width: ${(props) => CONTAINER_WIDTH[props.$containerWidth]}px;
  margin: 32px auto;
  padding-bottom: ${(props) => (props.$withFooter ? "60px" : "0")};
`;

export const MainWrapperWithSubHeader = styled(Box)<{
  $containerWidth: keyof typeof CONTAINER_WIDTH;
}>`
  min-height: calc((100vh - ${(props) => props.theme.footerNav.height}));
  max-width: ${(props) => CONTAINER_WIDTH[props.$containerWidth]}px;
  margin: 32px auto;
`;

export const ContentWrapper = styled(Box)`
  display: flex;
  flex: 0.7;
  @media (max-width: ${(props) => props.theme.breakpoints.xxl}px) {
    flex: 0;
  }
`;

export const ContentContainer = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
  max-width: ${(props) => props.theme.breakpoints.xxl}px;
  /* @media (max-width: ${(props) => props.theme.breakpoints.xxl}px) {
    margin: 20px 20px 20px 20px;
  } */
`;

export const ShadowContainerWithTopPadding = styled(Box)`
  padding: 32px 24px;
  box-shadow: 0px 2px 7px 0px #1919701f;
`;

export const SquaresContainer = styled(Box)`
  display: flex;
  gap: 24px;
  justify-content: left;
  margin-top: 40px;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  > div {
    max-width: 212px;
    height: 204px;
  }
`;

export const ParagraphWrapper = styled(Box)`
  display: flex;
  gap: 24px;
  justify-content: left;
  margin-top: 40px;

  @media (max-width: 600px) {
    flex-direction: column;
  }

  > div {
    max-width: 212px;
    height: 204px;
  }
`;
