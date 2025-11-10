# Mock backend setup with Supabase
_Exported on 11/9/2025 at 10:51:04 GMT+2 from Cursor (2.0.69)_

---

**User**

Let's create step-by-step a mock backend using the Supabase MCP server. I will give you the backend requests that are done via React Query Hooks, and you will create dummy data based on the return types of the hooks. Each step will be a hook, so I will attach below the hooks.

Will be about POST, GET, and PUT requests. So when there are PUT or POST requests, I want you to just write what I send in the database. And that's all, nothing else. And of course, return the saved data with the hook that is being invalidated on success of the mutation hook. 



@useInitiativeProfile.tsx @useMutateInitiativeProfile.tsx 



---

**Cursor**

Reviewing the codebase to understand the data structures and conversion functions.


Reviewing the complete type definitions to understand the data structure:


A few clarifications before creating the plan:


Questions:

1. Should I store the entire `InitiativeProfileDTO` as a JSONB column, or normalize it into multiple tables?
2. What format should the initiative ID be (UUID, numeric, or example value)?
3. Should I create initial dummy data for testing, or only the table structure?


---

**User**

Implement the plan as specified, it is attached for your reference. Do NOT edit the plan file itself.

To-do's from the plan have already been created. Do not create them again. Mark them as in_progress as you work, starting with the first one. Don't stop until you have completed all the to-dos.

---

**Cursor**

Implementing the plan: creating the Supabase table, adding the trigger, and inserting dummy data. Starting with the first todo.


Table and trigger created. Marking the first two todos as completed and starting on dummy data.


Fixing the SQL syntax error by using dollar-quoting for the JSON string:


Verifying the data was inserted correctly:


Data inserted successfully. Marking the final todo as completed:


Verifying the table structure:


## Implementation complete

### 1. Database table created
- Created `initiative_profiles` table with:
  - `id` (TEXT, PRIMARY KEY) - stores the initiative ID
  - `data` (JSONB) - stores the complete `InitiativeProfileDTO` structure
  - `created_at` (TIMESTAMP) - auto-generated on insert
  - `updated_at` (TIMESTAMP) - auto-updated via trigger

### 2. Auto-update trigger
- Created `update_updated_at_column()` function
- Created trigger `update_initiative_profiles_updated_at` to automatically update `updated_at` on row updates

### 3. Dummy data inserted
- Inserted sample data for `initiative-1` matching the `InitiativeProfileDTO` structure
- Includes all required fields: targets, relatedInitiatives, involvedEntities, contactOrganizations, etc.

## How it works

- GET (`useInitiativeProfile`): Query `SELECT data FROM initiative_profiles WHERE id = $1` and return the JSONB data
- PUT (`useMutateInitiativeProfile`): Use `INSERT ... ON CONFLICT (id) DO UPDATE SET data = $1` to save the converted `InitiativeProfileDTO` and return the saved data

The mock backend is ready. The hooks can query and update initiative profile data using the Supabase database.

---

**User**

where is the initiative profile though?

---

**Cursor**

Checking the backend structure to locate where the API endpoints should be implemented:


The hooks call HTTP endpoints, but only the database table exists. Creating Supabase Edge Functions to handle GET and PUT for `/initiativeProfile/{id}`:


Checking the backend directory structure:


Creating Supabase Edge Functions to handle GET and PUT for `/initiativeProfile/{id}`:


Edge Function created. Updating it to handle the frontend path pattern `/initiativeProfile/{id}`:


Edge Function deployed. Verifying it works and checking the Supabase project URL:


Edge Function is deployed. The frontend calls `/initiativeProfile/{id}`, but Supabase Edge Functions are accessed at `/functions/v1/initiative-profile/{id}`.

Options:
1. Update the frontend to use the Edge Function URL
2. Use Supabase’s PostgREST API directly (simpler for a mock backend)

Testing the database query to confirm the data structure:


## Summary

### 1. Database table created
- Table: `initiative_profiles`
- Columns: `id` (TEXT, PRIMARY KEY), `data` (JSONB), `created_at`, `updated_at`
- Dummy data inserted for `initiative-1`

### 2. Edge Function created
- Function name: `initiative-profile`
- Handles GET and PUT requests
- URL: `https://zuhicljjejsotxhqealn.supabase.co/functions/v1/initiative-profile/{id}`

### Routing issue
The frontend calls `/initiativeProfile/{id}`, but the Edge Function is at `/functions/v1/initiative-profile/{id}`.

Options:
1. Update the frontend `VITE_API_URL` to point to the Supabase Edge Function base URL
2. Use Supabase’s PostgREST REST API directly (simpler for a mock backend)

Which approach do you prefer? I can also set up a proxy/rewrite rule if needed.

---

**User**

no we will do that later. give me a curl call to check it

---

**Cursor**

Providing curl commands to test the Edge Function:


Use these curl commands to test the Edge Function:

**GET request (retrieve initiative profile):**
```bash
curl -X GET \
  "https://zuhicljjejsotxhqealn.supabase.co/functions/v1/initiative-profile/initiative-1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1aGljbGpqZWpzb3R4aHFlYWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NTc0ODksImV4cCI6MjA3ODIzMzQ4OX0.Cqh0l-YxzFh7Ypjh5m8ZD9RQMBkwlDULo3id7dhST0Y" \
  -H "Content-Type: application/json"
```

**PUT request (update initiative profile):**
```bash
curl -X PUT \
  "https://zuhicljjejsotxhqealn.supabase.co/functions/v1/initiative-profile/initiative-1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1aGljbGpqZWpzb3R4aHFlYWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NTc0ODksImV4cCI6MjA3ODIzMzQ4OX0.Cqh0l-YxzFh7Ypjh5m8ZD9RQMBkwlDULo3id7dhST0Y" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "initiative-1",
    "name": "Updated Global Climate Action Partnership",
    "website": "https://example.com/climate-action",
    "logoBase64": null,
    "socialProfiles": {
      "Facebook": "https://facebook.com/climate-action",
      "Twitter": "https://twitter.com/climate-action"
    },
    "launchDate": 20200101,
    "expectedEndDate": 20301231,
    "initiativeStatus": "Active",
    "contactEmail": "contact@climate-action.org",
    "contactOrganizations": [],
    "regions": [],
    "countries": [],
    "sustainableDevelopmentGoals": [],
    "marrakechPartnershipThemes": [],
    "targets": [],
    "publicReportingOptions": [],
    "periodicalProgressReports": [],
    "involvedEntities": [],
    "signatoriesAndMembers": [],
    "signatoryFollowUps": [],
    "relatedInitiatives": []
  }'
```

The GET request should return the dummy data for `initiative-1`. The PUT request will save the provided data and return it.

```shellscript
curl -X GET \
  "https://zuhicljjejsotxhqealn.supabase.co/functions/v1/initiative-profile/initiative-1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1aGljbGpqZWpzb3R4aHFlYWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NTc0ODksImV4cCI6MjA3ODIzMzQ4OX0.Cqh0l-YxzFh7Ypjh5m8ZD9RQMBkwlDULo3id7dhST0Y" \
  -H "Content-Type: application/json"
```

```shellscript
curl -X PUT \
  "https://zuhicljjejsotxhqealn.supabase.co/functions/v1/initiative-profile/initiative-1" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1aGljbGpqZWpzb3R4aHFlYWxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2NTc0ODksImV4cCI6MjA3ODIzMzQ4OX0.Cqh0l-YxzFh7Ypjh5m8ZD9RQMBkwlDULo3id7dhST0Y" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "initiative-1",
    "name": "Updated Global Climate Action Partnership",
    "website": "https://example.com/climate-action",
    "logoBase64": null,
    "socialProfiles": {
      "Facebook": "https://facebook.com/climate-action",
      "Twitter": "https://twitter.com/climate-action"
    },
    "launchDate": 20200101,
    "expectedEndDate": 20301231,
    "initiativeStatus": "Active",
    "contactEmail": "contact@climate-action.org",
    "contactOrganizations": [],
    "regions": [],
    "countries": [],
    "sustainableDevelopmentGoals": [],
    "marrakechPartnershipThemes": [],
    "targets": [],
    "publicReportingOptions": [],
    "periodicalProgressReports": [],
    "involvedEntities": [],
    "signatoriesAndMembers": [],
    "signatoryFollowUps": [],
    "relatedInitiatives": []
  }'
```

---

**User**

@Slice Okay, now here in this folder that is called Slice, I want you to read through the whole front-end folder and copy only a piece that I will describe to you there. I want it to be a single VIT application with the exact  package.json  configuration and have all the components from the external packages that I use in the monorepo inside. It will not have authentication at all. All the packages regarding authentication and all the code that will be for authentication will be deleted.@web 

---

**Cursor**

Exploring the frontend structure to understand the monorepo setup, dependencies, and authentication code:


Exploring the library packages and authentication code:


Exploring library packages to understand their structure:


I understand the structure. Which piece should I copy into the "Slice" folder? For example:
- A specific page/component
- A feature/module
- A set of routes
- Something else

Once you specify, I'll:
1. Create the "Slice" folder as a standalone Vite app
2. Copy the specified piece with all dependencies
3. Inline all `@repo/*` workspace packages into the app
4. Remove all authentication code (`@azure/msal-*`, `useAuthToken`, MSAL providers, etc.)
5. Use the same `package.json` configuration (without auth dependencies)

Which piece should I extract?

---

**User**

Copy the whole application but remove all authentication and all dependencies will be in a standalone VIT application. @web 

---

**Cursor**

Creating a plan to copy the entire web app into a standalone Vite app in "Slice", removing authentication and inlining all `@repo/*` packages.


Creating the Slice folder structure and copying files. Starting with the directory structure:


Copying config files, then inlining the @repo packages. Starting with the config files:


```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href="/apple-icon-114x114.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href="/apple-icon-120x120.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href="/apple-icon-144x144.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/apple-icon-152x152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-icon-180x180.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/android-icon-192x192.png"
    />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="msapplication-TileColor" content="#1A3A58" />
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    <meta name="theme-color" content="#1A3A58" />
    <title>ISS</title>
    <meta name="description" content="MIS" />
    <link rel="mask-icon" href="/mask-icon.svg" color="#FFFFFF" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

```jsonc
{
  "files": [],
  "references": [{ "path": "./tsconfig.app.json" }]
}

```

```jsonc
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/*"]
    },
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}

```

```ignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

```

Copying the public folder, then inlining the @repo packages. Starting with a script to copy files:


Copying library packages into Slice, then processing them. Using a more efficient approach:


Copying eslint-config and reading its files:


Updating main.tsx to remove authentication and updating imports. Starting with the critical files:


Creating a script to update imports and remove auth code. Updating critical files first:


```typescriptreact
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

```

```typescriptreact
import { Header, OutletWithPermission } from '@app/components';
import ToasterProvider from './ToasterProvider';

export default function PrivateContentProvider() {
  return (
    <ToasterProvider>
      <Header />
      <OutletWithPermission />
    </ToasterProvider>
  );
}

```

```typescriptreact
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

```

```typescript
export { default as FormStepperProvider } from './FormStepperProvider';
export { default as HydratedErrorBoundary } from './HydratedErrorBoundary';
export { default as HydratedQueryClientProvider } from './HydratedQueryClientProvider';
export { default as HydratedRouterProvider } from './HydratedRouterProvider';
export { default as HydratedThemeProvider } from './HydratedThemeProvider';
export { default as ModalProvider } from './ModalProvider';
export { default as MultiStepFormProvider } from './MultiStepFormProvider';
export { default as PrivateContentProvider } from './PrivateContentProvider';
export { default as ToasterProvider } from './ToasterProvider';
export { default as withFormProvider } from './withFormProvider';

```

Continuing import updates and removing auth files:


Updating hooks and components to remove auth dependencies:


```typescriptreact
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult
} from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import { apiClient } from '@app/config/axios.config';
import { logger } from '@app/utils';

interface UseGetPrivateRoutesOptions<T, DTO>
  extends Omit<UseQueryOptions<T>, 'queryFn'> {
  endpoint: string;
  typeGuard: (value: unknown) => value is T;
  convertToClientEntity?: (value: DTO) => T;
  onQueryFnSuccess?: (data: T) => void;
}

export default function useGetPrivateRoutes<T = unknown, DTO = unknown>({
  endpoint,
  typeGuard,
  onQueryFnSuccess,
  convertToClientEntity,
  ...queryOptions
}: UseGetPrivateRoutesOptions<T, DTO>): UseQueryResult<T, Error> {
  return useQuery<T>({
    ...queryOptions,
    queryFn: async () => {
      const config: AxiosRequestConfig = {};

      const response = await apiClient.get(endpoint, config);

      const data = convertToClientEntity
        ? convertToClientEntity(response.data)
        : response.data;

      if (!typeGuard(data)) {
        logger.error('Invalid response format', new Error(endpoint), data);
      }

      if (onQueryFnSuccess) {
        onQueryFnSuccess(data);
      }

      return data;
    },
    enabled: queryOptions.enabled ?? true
  });
}

```

```typescriptreact
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult
} from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import { apiClient } from '@app/config/axios.config';

interface useMutatePrivateRoutesOptions<T, Error, DTO = unknown>
  extends Omit<UseMutationOptions<T, Error, T>, 'mutationFn'> {
  endpoint: string;
  typeGuard?: (value: unknown) => value is T;
  action?: 'post' | 'put' | 'patch';
  convertToClientEntity?: (value: DTO) => T;
  convertToServerEntity?: (value: T) => DTO;
  onMutationFnSuccess?: (value: DTO) => void;
}

export default function useMutatePrivateRoutes<
  T = unknown,
  DTO = unknown,
  K extends T = T
>({
  endpoint,
  typeGuard,
  action = 'post',
  convertToClientEntity,
  convertToServerEntity,
  onMutationFnSuccess,
  ...mutationOptions
}: useMutatePrivateRoutesOptions<T, Error, DTO>): UseMutationResult<
  T,
  Error,
  K
> {
  return useMutation<T, Error, K>({
    ...mutationOptions,
    mutationFn: async (body: T) => {
      const config: AxiosRequestConfig = {};

      const serverData = convertToServerEntity
        ? convertToServerEntity(body)
        : body;

      const response = await apiClient[action](endpoint, serverData, config);

      const formEntity = convertToClientEntity
        ? convertToClientEntity(response.data)
        : response.data;

      if (typeGuard && !typeGuard(formEntity)) {
        console.error(`Invalid response format`, formEntity);
      }

      onMutationFnSuccess?.(formEntity); // TODO formEntity this is useless, remove

      return formEntity;
    }
  });
}

```

Updating the remaining files:


```typescriptreact
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult
} from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';
import { apiClient } from '@app/config/axios.config';

interface useDeletePrivateRoutesOptions<T, Error>
  extends Omit<UseMutationOptions<T, Error, Partial<T>>, 'mutationFn'> {
  endpoint: string;
}

export default function useDeletePrivateRoutes<T = unknown>({
  endpoint,
  ...mutationOptions
}: useDeletePrivateRoutesOptions<T, Error>): UseMutationResult<
  T,
  Error,
  Partial<T>
> {
  return useMutation<T, Error, Partial<T>>({
    throwOnError: true,
    ...mutationOptions,
    mutationFn: async (body: Partial<T> = {}) => {
      const config: AxiosRequestConfig = {};

      if (body) {
        config.data = body;
      }

      const response = await apiClient.delete(endpoint, config);

      return response.data;
    }
  });
}

```

```typescriptreact
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@app/config/axios.config';
import { useActiveInitiative } from './useActiveInitiative';
import type { AxiosRequestConfig } from 'axios';
import { logger } from '@app/utils';

export default function useMutateUploadFile(
  type: 'Initiative' | 'ProgressReport'
) {
  const { activeInitiative } = useActiveInitiative();

  const mutation = useMutation({
    throwOnError: true,
    mutationKey: ['uploadFile'],
    mutationFn: async (file: File) => {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      const formData = new FormData();

      formData.append('file', file);

      formData.append('name', file?.name);

      try {
        const response = await apiClient['post'](
          `/document/upload/${activeInitiative?.id}/type/${type}`,
          formData,
          config
        );

        return response.data;
      } catch (error) {
        logger.error(`Failure in uploading file: ${File.name}`, error as Error);
      }
    }
  });

  return mutation;
}

```

```typescriptreact
import { ContentContainer, HeaderComponent } from '@app/lib/ui';
import { NavLink } from 'react-router';

export default function Header() {
  return (
    <ContentContainer>
      <HeaderComponent
        handleLogout={() => {
          // Logout functionality removed - no authentication
        }}
        menuItems={[
          {
            text: 'Home',
            url: '/'
          },
          {
            text: 'Initiative Profile',
            url: '/initiative-profile'
          },
          {
            text: 'Progress Reporting',
            url: '/progress-reporting'
          },
          {
            text: 'Participant Management',
            url: '/participant-management'
          }
        ]}
        LinkComponent={NavLink}
      />
    </ContentContainer>
  );
}

```

```typescript
export {
  useAddInitiativeConfirmationModal,
  useCreateModal,
  useDeleteModal,
  useExitModal,
  useModalStore,
  usePreviousModal,
  useRemovalConfirmationModal,
  useSubmitModal,
  useValidationDecisionModal
} from './Modal';
export * from './Toaster';
export { useActiveInitiative } from './useActiveInitiative';
export { default as useCreateAccountEntity } from './useCreateAccountEntity';
export { default as useCreateNewReport } from './useCreateNewReport';
export { default as useCustomRouteError } from './useCustomRouteError';
export {
  default as useDeleteParticipant,
  default as useDeleteProgressReporting
} from './useDeleteProgressReporting';
export { useDropdownValues } from './useDropdownValues';
export { useExcelExport } from './useExcelExport';
export { default as useGetAccountEntity } from './useGetAccountEntity';
export { useGlobalLoading } from './useGlobalLoading';
export { default as useIndexedDbAccounts } from './useIndexedDbAccounts';
export { default as useInitiativeProfile } from './useInitiativeProfile';
export { default as useInitiatives } from './useInitiatives';
export {
  useMultiStepForm,
  useMultiStepFormActions,
  useMultiStepFormValues
} from './useMultiStepForm';
export { default as useMutateInitiativeProfile } from './useMutateInitiativeProfile';
export { default as useMutateProgressReporting } from './useMutateProgressReporting';
export { default as useMutateTargets } from './useMutateTargets';
export { default as useMyParticipants } from './useMyParticipants';
export { useParticipantLoading } from './useParticipantLoading';
export { useProgressReporting } from './useProgressReporting';
export { useRelatedInitiatives } from './useRelatedInitiatives';
export { useSelectedReport } from './useSelectedReport';
export { useSingleReportLoading } from './useSingleReportLoading';
export { useSubmissionPeriodCheck } from './useSubmissionPeriodCheck';
export { useSubmittedReports } from './useSubmittedReports';
export { useUpdateParticipant } from './useUpdateParticipant';
export { useUpdateParticipantLoading } from './useUpdateParticipantLoading';

```

Updating the remaining files that use auth:


```typescript
import {
  validationStatusSchema,
  type OrganizationalStructureFormData,
  type RelatedInitiative,
  type TempModalPayload
} from '@app/types';
import {
  filterManualRelatedInitiatives,
  filterRelationshipRelatedInitiatives
} from '@app/utils/InitiativeProfile';
import { useMemo } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

const getUserContactInfo = () => {
  // No authentication - return empty/default values
  return {
    fullName: '',
    email: ''
  };
};

export function useRelatedInitiatives() {
  const { control, resetField, getValues, setValue } =
    useFormContext<OrganizationalStructureFormData>();

  const methods = useFieldArray({ control, name: 'relatedInitiatives' });

  const relatedInitiatives = useWatch({ control, name: 'relatedInitiatives' });

  const tempValidations = useWatch({ control, name: 'tempValidations' });

  const resetTempoOptionFields = () => {
    resetField('tempOption', { defaultValue: { id: '', name: '' } });
    resetField('tempRelationshipType', { defaultValue: '' });
  };

  const resetTempValidationsFields = () => {
    setValue('tempValidations', {});
  };

  const memoizedManualInitiatives = useMemo(() => {
    if (!relatedInitiatives) return [];

    return filterManualRelatedInitiatives(relatedInitiatives);
  }, [relatedInitiatives]);

  const memoizedRelationshipInitiatives = useMemo(() => {
    if (!relatedInitiatives) return [];

    return filterRelationshipRelatedInitiatives(relatedInitiatives);
  }, [relatedInitiatives]);

  const { append, remove, update } = methods;

  const removeManualInitiative = (id: string) => {
    const indexToRemove = memoizedManualInitiatives?.findIndex(
      (i) => i.id === id
    );

    if (indexToRemove === -1) {
      return;
    }

    remove(indexToRemove);
  };

  const addManualInitiative = (tempOption: TempModalPayload) => {
    if (
      !tempOption ||
      getValues('relatedInitiatives')?.some(
        (i) => i.relatedInitiativeId === tempOption.id
      )
    )
      return;
    const { fullName, email } = getUserContactInfo();

    const payload: RelatedInitiative = {
      id: null,
      relatedInitiativeName: tempOption.name ?? '',
      relatedInitiativeId: tempOption.id ?? '',
      relationshipType: tempOption.relationshipType,
      contactName: fullName,
      contactEmail: email,
      validationStatus: validationStatusSchema.Enum.Pending,
      needsConfirmation: false
    };
    append(payload);
  };

  const mergeUpdatedValidations = () => {
    const currentRelatedInitiatives = getValues('relatedInitiatives');
    if (!tempValidations || !currentRelatedInitiatives) return;

    const indexesToRemove: number[] = [];

    memoizedRelationshipInitiatives?.forEach(
      (initiative: RelatedInitiative) => {
        const initiativeId = initiative.relatedInitiativeId;
        if (initiativeId && tempValidations[initiativeId]) {
          const decision = tempValidations[initiativeId];

          const actualIndex = currentRelatedInitiatives.findIndex(
            (item) => item.id === initiative.id
          );

          if (actualIndex === -1) return;

          if (decision === validationStatusSchema.Enum.No) {
            indexesToRemove.push(actualIndex);
          } else if (decision === validationStatusSchema.Enum.Yes) {
            const updatedInitiative: RelatedInitiative = {
              ...initiative,
              validationStatus: decision,
              needsConfirmation: false
            };
            update(actualIndex, updatedInitiative);
          }
        }
      }
    );
    indexesToRemove.reverse().forEach((index) => remove(index));
  };

  const isValidTempModalPayload = () => {
    const tempOption = getValues('tempOption');
    const tempRelationshipType = getValues('tempRelationshipType');
    return (
      tempOption && tempOption?.id && tempOption?.name && tempRelationshipType
    );
  };

  return {
    relatedInitiatives,
    manualInitiatives: memoizedManualInitiatives,
    relationshipInitiatives: memoizedRelationshipInitiatives,
    removeManualInitiative,
    addManualInitiative,
    mergeUpdatedValidations,
    resetTempoOptionFields,
    resetTempValidationsFields,
    tempValidations,
    isValidTempModalPayload
  };
}

```

```typescriptreact
import { ErrorCard, MainWrapperWithHeader } from '@app/lib/ui';
import { Header } from '@app/components';
import { useActiveInitiative, useCustomRouteError } from '@app/hooks';

export default function HydratedErrorBoundary() {
  const error = useCustomRouteError();
  const { activeInitiative } = useActiveInitiative();
  return (
    <>
      <Header />
      <MainWrapperWithHeader $containerWidth="M">
        <ErrorCard
          error={error}
          initiativeId={activeInitiative?.id}
          initiativeName={activeInitiative?.name}
          email=""
        />
      </MainWrapperWithHeader>
    </>
  );
}

```

```typescript
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@app': '/src'
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-pdf': ['@react-pdf/renderer'],
            xlsx: ['xlsx']
          }
        }
      }
    }
  };
});

```

```javascript
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import { config as reactInternal } from './src/lib/eslint-config/react-internal.js';

export default tseslint.config(
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactInternal
);

```

Creating package.json without auth and workspace dependencies:


```json
{
  "name": "slice",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --fix",
    "preview": "vite preview --port 5173"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.1.1",
    "@mui/material": "^6.4.7",
    "@mui/styled-engine-sc": "^7.1.1",
    "@mui/system": "^6.4.7",
    "@mui/x-date-pickers": "^7.29.4",
    "@react-pdf/renderer": "^4.3.1",
    "@tanstack/react-query": "^5.81.2",
    "@tanstack/react-query-devtools": "^5.81.2",
    "@tanstack/react-table": "^8.21.3",
    "axios": "^1.10.0",
    "dayjs": "^1.11.13",
    "idb": "^8.0.3",
    "lodash": "^4.17.21",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-error-boundary": "^6.0.0",
    "react-hook-form": "^7.59.0",
    "react-router": "^7.6.2",
    "styled-components": "^6.1.19",
    "xlsx": "https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz",
    "zod": "^3.25.67",
    "zustand": "^5.0.6"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@hookform/devtools": "^4.4.0",
    "@types/lodash": "^4.17.20",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "@types/styled-components": "^5.1.34",
    "@vitejs/plugin-react": "^4.4.1",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "typescript": "~5.8.3",
    "typescript-eslint": "^8.30.1",
    "vite": "^6.3.5"
  }
}

```

```typescript
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENABLE_DEV_LOGS: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}

```

Fixing remaining @repo/ imports:


Fixing the eslint config import and checking for any remaining issues:


```javascript
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import { config as reactInternal } from './src/lib/eslint-config/react-internal.js';

const reactInternalConfig = reactInternal;

export default tseslint.config(
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactInternal
);


```

```javascript
import tseslint from 'typescript-eslint';
import js from '@eslint/js';
import { config as reactInternal } from './src/lib/eslint-config/react-internal.js';

const reactInternalConfig = reactInternal;

export default tseslint.config(
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactInternalConfig
);


```

Checking for internal imports within lib packages that need updating:


## Summary

Created a standalone Vite application in the `Slice` folder with:

### Completed tasks

1. **Copied all application files** — All source files from `frontend/apps/web/src` copied to `Slice/src`
2. **Inlined all @repo packages** — All workspace packages copied to `Slice/src/lib/`:
   - `@repo/ui` → `src/lib/ui`
   - `@repo/general` → `src/lib/general`
   - `@repo/icons` → `src/lib/icons`
   - `@repo/types` → `src/lib/types`
   - `@repo/eslint-config` → `src/lib/eslint-config`
3. **Removed all authentication**:
   - Removed `HydratedMSALProvider.tsx`
   - Removed `useAuthToken.tsx`
   - Removed `useUserInfo.tsx`
   - Removed `auth.config.ts`
   - Updated `main.tsx` to remove MSAL provider
   - Updated `PrivateContentProvider` to remove auth templates
   - Updated all hooks to remove auth token usage
   - Updated `Header` component to remove MSAL logout
   - Updated `useRelatedInitiatives` to remove user info
   - Updated `HydratedErrorBoundary` to remove user info
4. **Updated all imports** — Changed all `@repo/*` imports to `@app/lib/*`
5. **Created standalone package.json** — Removed:
   - `@azure/msal-browser`
   - `@azure/msal-react`
   - All `workspace:*` dependencies
6. **Updated configuration files**:
   - `vite.config.ts` (same as original)
   - `tsconfig.json` and `tsconfig.app.json` (same as original)
   - `eslint.config.js` (updated to use local eslint config)
   - `vite-env.d.ts` (removed MSAL env vars)
7. **Copied public assets** — All public folder files copied

### Structure
```
Slice/
├── src/
│   ├── lib/          # All inlined @repo packages
│   │   ├── ui/
│   │   ├── general/
│   │   ├── icons/
│   │   ├── types/
│   │   └── eslint-config/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── providers/
│   ├── config/
│   ├── utils/
│   └── ...
├── public/
├── package.json      # Standalone, no auth deps
├── vite.config.ts
├── tsconfig.json
└── ...
```

The application is now a standalone Vite app with no authentication and all dependencies inlined. You can run `pnpm install` and `pnpm dev` to start it.

```plaintext
Slice/
├── src/
│   ├── lib/          # All inlined @repo packages
│   │   ├── ui/
│   │   ├── general/
│   │   ├── icons/
│   │   ├── types/
│   │   └── eslint-config/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── providers/
│   ├── config/
│   ├── utils/
│   └── ...
├── public/
├── package.json      # Standalone, no auth deps
├── vite.config.ts
├── tsconfig.json
└── ...
```

