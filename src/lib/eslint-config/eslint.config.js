import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default tseslint.config(
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended
);
