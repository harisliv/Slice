import { z } from 'zod';
import {
  functionShape,
  functionSuperRefine,
  isFunctionSchema,
  defaultFunctionFormValues
} from './Function.types';
import {
  focusesShape,
  focusesSuperRefine,
  isFocusesSchema,
  defaultFocusesFormValues
} from './Focus.types';
import {
  themesShape,
  isThemesSchema,
  defaultThemesFormValues
} from './Themes.types';

export const FunctionFocusAndThemesSchema = z
  .object({
    ...functionShape.shape,
    ...focusesShape.shape,
    ...themesShape.shape
  })
  .superRefine(functionSuperRefine)
  .superRefine(focusesSuperRefine);

export type FunctionFocusAndThemesShape = z.infer<
  typeof FunctionFocusAndThemesSchema
>;

export const isFunctionFocusAndThemesSchema = (
  value: unknown,
  withLogs: boolean = true
): value is FunctionFocusAndThemesShape => {
  const isFunctions = isFunctionSchema(value, withLogs);
  const isFocuses = isFocusesSchema(value, withLogs);
  const isThemes = isThemesSchema(value, withLogs);
  return isFunctions && isFocuses && isThemes;
};

export const defaultFunctionFocusAndThemesFormValues: FunctionFocusAndThemesShape =
  {
    ...defaultFunctionFormValues,
    ...defaultFocusesFormValues,
    ...defaultThemesFormValues
  };
