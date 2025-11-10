import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  HydratedQueryClientProvider,
  HydratedRouterProvider,
  HydratedThemeProvider
} from '@app/providers';
import { printEnvVars } from './utils';

printEnvVars();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HydratedQueryClientProvider>
      <HydratedThemeProvider>
        <HydratedRouterProvider />
      </HydratedThemeProvider>
    </HydratedQueryClientProvider>
  </StrictMode>
);
