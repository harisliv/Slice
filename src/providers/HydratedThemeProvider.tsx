import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './global';
import { Theme, muiDefaultTheme } from '@app/lib/general';

export default function HydratedThemeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={Theme}>
      <MuiThemeProvider theme={muiDefaultTheme}>
        <GlobalStyle />
        {children}
      </MuiThemeProvider>
    </ThemeProvider>
  );
}
