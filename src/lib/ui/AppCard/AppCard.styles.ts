import styled from 'styled-components';
import { animation } from '@app/lib/general';
import { Header3, Paragraph } from '../Global';

export const StyledAppCard = styled.div`
  ${animation({ time: '0.3s' })}
  display: flex;
  flex-direction: column;
  padding: 29px 24px;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  justify-content: space-between;
  gap: 48px;
  cursor: pointer;
  /* h2 {
    font-size: 31px;
    margin: 0 auto 7.38px auto;
    padding: 0;
    text-transform: uppercase;
    span {
      font-family: ${(props) => props.theme.fontFamilies.Roboto};
      font-weight: 400;
    }
  } */
  /* p {
    margin: 0 0 19.62px 0;
    padding: 0;
    font-family: ${(props) => props.theme.fontFamilies.Roboto};
    font-size: ${(props) => props.theme.fontSizes.body.l};
    line-height: 22px;
    color: ${(props) => props.theme.palette.primary.darkerGrey};
    text-align: center;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  padding: 21.6px;
  width: 140px;
  background-color: ${(props) => props.theme.palette.background.azur8};
  border-radius: 98.4px;

  svg {
    height: 92.8px;
    width: 69.8px;
  }
`;

export const CardTopWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const IconButtonWrapper = styled.div`
  svg {
    width: 20px;
    path {
      fill: ${(props) => props.theme.palette.primary.snow};
    }
  }
`;

export const StyledH3 = styled(Header3)<{ $showDescription: boolean }>``;

export const StyledParagraph = styled(Paragraph)<{
  $showDescription: boolean;
}>``;
