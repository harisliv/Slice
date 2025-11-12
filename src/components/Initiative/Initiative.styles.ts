import styled from "styled-components";

export const InitiativeContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InitiativeCardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0;
  gap: 24px;
`;

export const AppCardWrapper = styled.div`
  flex: 0 0 30%;
  box-shadow:
    0px 3px 8px rgba(25, 25, 112, 0.08),
    0px 0px 1px rgba(65, 105, 226, 0.2);
  border-radius: 12px;
  /* h5 {
    text-align: center;
  } */
`;
