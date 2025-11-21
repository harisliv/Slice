# Slice - Educational Platform Course Management System

## 🎯 Project Overview

Slice is an educational platform that enables instructors and administrators to manage course profiles, track student progress, create assignments, and generate comprehensive reports. The application features a sophisticated multi-step form interface with advanced validation, real-time data synchronization, and offline support. Built to showcase advanced React patterns, state management, and TypeScript best practices.

**Note!!!** This project is under active development. Some features may be incomplete or subject to change. Check in the bottom of the README for the latest features and changes.

### Key Features

- **📝 Course Profile Management** - Multi-step forms with 4 major sections and nested tabs
- **👥 Student Management** - Track enrolled and registered students with comprehensive data tables
- **📈 Progress Reporting** - Generate periodic reports with PDF export capabilities
- **✅ Form Validation** - Comprehensive client-side validation using Zod schemas

## 🛠️ Technical Stack

### Frontend

- **React 19.1.0**
- **TypeScript 5.8.3**
- **Vite 6.3.5**
- **React Router 7.6.2**
- **Material-UI (MUI) 6.4.7**
- **Styled Components 6.1.19**
- **Lodash 4.17.21**
- **TanStack Table 8.21.3**

### State Management & Data Fetching

- **TanStack Query (React Query) 5.81.2**
- **Zustand 5.0.6**
- **React Hook Form 7.59.0**
- **Zod 3.25.67**

### Backend Integration

- **Supabase**
  - **PostgreSQL**
  - **Edge Functions**
  - **Storage**
  - **Authentication**

### Code Quality

- **ESLint** - Code linting with React and TypeScript rules
- **Prettier** - Consistent code formatting
- **TypeScript Strict Mode** - Maximum type safety

## 🏗️ Architecture Highlights

This project demonstrates advanced React architecture patterns and best practices:

### 1. **Multi-Step Form Architecture**

A sophisticated form system combining **React Hook Form**, **Zod validation**, and **Zustand + React Context** for state management across multiple steps and tabs.

**Key Implementation Files:**

- `MultiStepFormProvider.tsx` - Form values store
- `FormStepperProvider.tsx` - Navigation state management
- `withFormProvider.tsx` - HOC combining all form logic
- `useMultiStepForm.tsx` - Type-safe hooks with selectors
- `useFormStepper.tsx` - Step navigation hooks

**Features:**

- Independent and reusable form instances with isolated stores
- Selector-based subscriptions preventing unnecessary re-renders
- Global form validation for submitting the form
- Type-safe form values across all steps
- Draft saving on step transitions

### 2. **Reusable Form Components**

Pre-built, type-safe form components that are automatically connected to React Hook Form via `Controller`:

**Key Implementation Files:**

`ControlledInput.tsx`, `ControlledAutocomplete.tsx`, `ControlledSelect.tsx`, `ControlledDatePicker.tsx`,
`ControlledCheckbox.tsx`, `ControlledUploader.tsx`, `ControlledMultiSelect.tsx`

**Features:**

- **Pre-connected to Form Context** - All components use `Controller` internally, eliminating boilerplate
- **Debounced Input (300ms)** - Text inputs debounce changes to reduce re-renders and validation calls
- **Type-Safe** - Full TypeScript generics for field names and values
- **Consistent API** - Unified props interface across all components
- **Built-in Error Display** - Automatic error message rendering from React Hook Form
- **Flexible Sizing** - Configurable grid sizes for responsive layouts
- **Optional Descriptions** - Title and subtitle support for better UX

### 3. **Type-Safe API Integration**

Custom React Query hooks with automatic type validation and entity conversion:

**Key Implementation Files:**

- `useGetPrivateRoutes.ts` - Generic GET hook
- `axiosInstance.ts` - Axios client with Supabase auth

**Features:**

- Zod type guards for runtime validation
- Automatic DTO to client entity conversion
- Error handling with user notifications
- Request/response interceptors

### 4. **Advanced Form Validation**

Triple-purpose Zod schemas serving as validation, type generation, and type guards:

**Key Implementation Files:**

- `InitiativeProfile.types.ts` - Initiative profile schema

**Features:**

- Single source of truth for types and validation
- Cross-field validation with `.superRefine()`
- Conditional field requirements
- Real-time validation feedback
- Custom error messages

### 5. **TanStack Table Integration**

Type-safe data tables with advanced features:

**Key Implementation Files:**

- `src/components/MyParticipants/MyParticipants.tsx` - Student table columns

**Features:**

- Multi-column sorting
- Custom filter functions
- Column visibility toggle
- Global search
- Pagination
- Excel/CSV export
- Memoized column definitions preventing re-renders

### 6. **IndexedDB Integration**

Offline-first caching for dropdown data:

**Key Implementation Files:**

- `src/hooks/useIndexedDbAccounts.ts` - Account entity caching
- `src/utils/indexedDb.ts` - IndexedDB utilities

**Features:**

- Fetching only when needed based on lastUpdate
- Automatic cache invalidation
- Improved performance for frequently accessed data

## TODOs

- [ ] Add latestUpdate implementation
- [ ] Fix new report undefined id
- [ ] Add form wide validation messages
