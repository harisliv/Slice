import type { FC } from 'react';

import { StyledMaxOptions } from './MaxOptions.styles';

const MaxOptions: FC = () => (
  <StyledMaxOptions>
    <span>The maximum limit is reached</span>
  </StyledMaxOptions>
);

export default MaxOptions;
