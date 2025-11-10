import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --box-shadow-base: 0px 2px 7px 0px #1919701f;
  }
  /*
  * FONT IMPORT
  */
  @font-face {
    font-family: "Roboto";
    src: local("RobotoThin"),
    url("/fonts/Roboto/Roboto-Thin.woff") format("woff"),
    url("/fonts/Roboto/Roboto-Thin.ttf") format("truetype");
    font-weight: 100;
  }
  @font-face {
    font-family: "Roboto";
    src: local("RobotoLight"),
    url("/fonts/Roboto/Roboto-Light.woff") format("woff"),
    url("/fonts/Roboto/Roboto-Light.ttf") format("truetype");
    font-weight: 300;
  }
  @font-face {
    font-family: "Roboto";
    src: local("RobotoRegular"),
    url("/fonts/Roboto/Roboto-Regular.woff") format("woff"),
    url("/fonts/Roboto/Roboto-Regular.ttf") format("truetype");
    font-weight: 400;
  }
  @font-face {
    font-family: "Roboto";
    src: local("RobotoMedium"),
    url("/fonts/Roboto/Roboto-Medium.woff") format("woff"),
    url("/fonts/Roboto/Roboto-Medium.ttf") format("truetype");
    font-weight: 500;
  }
  @font-face {
    font-family: "Roboto";
    src: local("RobotoBold"),
    url("/fonts/Roboto/Roboto-Bold.woff") format("woff"),
    url("/fonts/Roboto/Roboto-Bold.ttf") format("truetype");
    font-weight: 700;
  }
  @font-face {
    font-family: "Roboto";
    src: local("RobotoBlack"),
    url("/fonts/Roboto/Roboto-Black.woff") format("woff"),
    url("/fonts/Roboto/Roboto-Black.ttf") format("truetype");
    font-weight: 900;
  }

  @font-face {
    font-family: "Lora";
    src: local("Lora"),
    url("/fonts/Lora/Lora.woff") format("woff"),
    url("/fonts/Lora/Lora.ttf") format("truetype");
  }

  /*
  * BODY
  */
  body {
    font-family: ${(props) => props.theme.fontFamilies.Roboto};
    font-weight: 400;
    margin: 0;
    padding: 0;
    min-width: 100%;
    width: fit-content;

    @media (max-width: ${(props) => props.theme.breakpoints.lg}px) {
      width: 100%;
      overflow-x: hidden;
    }
  }
  *,
  :after,
  :before {
    background-repeat: no-repeat;
    box-sizing: border-box;
  }

  *:focus {
    outline: none;
  }

  h1, h2, h3, h4, h5, p, span {
    margin: 0;
  }

  /*
  *
  * SCROLLBAR
  *
  */

  :not(textarea)::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  :not(textarea)::-webkit-scrollbar-track {
    background-image: none;
  }

  :not(textarea)::-webkit-scrollbar-track:vertical {
    background-size: 1px 100%;
  }

  :not(textarea)::-webkit-scrollbar-track:horizontal {
    background-size: 100% 1px;
  }

  :not(textarea)::-webkit-scrollbar-thumb {
    background: rgba(65, 105, 226, 0.64);
    border-radius: 8px;
  }

   /*
  *
  * ANIMATIONS
  *
  */

  @keyframes zoominout {
    0% {
      transform: translateY(10px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(10px);
    }
  }
`;
