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

