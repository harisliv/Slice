import { ControlledInput, FormInputDescription } from '@app/components';
import { CREATE_REPORT_FIELD_INFO } from '@app/constants';
import { Stack } from '@mui/material';
import { Theme } from '@app/lib/general';
import { PlusIcon } from '@app/lib/icons';
import { ButtonComponent } from '@app/lib/ui';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function OutcomesUrl({ index: actionIndex }: { index: number }) {
  const { control } = useFormContext();
  const { append, fields } = useFieldArray({
    control,
    name: `actions.${actionIndex}.outcomesUrl`,
    rules: {
      maxLength: 3
    }
  });

  const addUrlField = () => {
    append('');
  };

  useEffect(() => {
    if (fields.length === 0) {
      addUrlField();
    }
  }, [fields]);

  return (
    <Stack spacing={2}>
      <FormInputDescription
        title={CREATE_REPORT_FIELD_INFO.action.outcomesUrl.title}
        subtitle={CREATE_REPORT_FIELD_INFO.action.outcomesUrl.subtitle}
      />
      {fields.map((field, index) => (
        <ControlledInput
          inputDescriptionTitle={
            CREATE_REPORT_FIELD_INFO.action.outcomesUrl.title
          }
          key={`outcomesUrl-${field.id}-(${index})`}
          name={`actions.${actionIndex}.outcomesUrl.${index}`}
          customGridSize="half"
        />
      ))}

      <ButtonComponent
        onClick={addUrlField}
        customVariant="terciary-m"
        startIcon={<PlusIcon fill={Theme.palette.primary.azur} />}
        disabled={fields.length >= 3}
      >
        Add outcomes url
      </ButtonComponent>
    </Stack>
  );
}
