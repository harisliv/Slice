import { Paragraph } from '@app/lib/ui';
import { Stack } from '@mui/material';
import Target from './components/Target';
import { useFieldArray, useFormContext } from 'react-hook-form';
import type { ProgressOfTargetsFormData } from '@app/types';

export default function ProgressOfTargets() {
  const { control } = useFormContext<ProgressOfTargetsFormData>();

  const { fields } = useFieldArray({ control, name: 'targets' });

  return (
    <Stack spacing={2}>
      <Paragraph variant="large-bold">
        List of active targets for progress reporting
      </Paragraph>
      {fields.length > 0 ? (
        fields?.map((target, index) => (
          <Target
            key={`${target.title}-${index}-progress-of-targets`}
            target={target}
            index={index}
          />
        ))
      ) : (
        <Paragraph>-</Paragraph>
      )}
    </Stack>
  );
}
