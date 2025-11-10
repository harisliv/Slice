import { Box, Stack } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCreateAccountEntity,
  useGetAccountEntity,
  useIndexedDbAccounts,
  useUpdateParticipantLoading
} from '@app/hooks';
import {
  ButtonComponent,
  Checkbox,
  IconButton,
  Modal,
  RequiredLabel
} from '@app/lib/ui';
import { DetailsFields } from './Components/DetailsFields';
import type { Option } from '@app/lib/types';
import { Body, TitleRight } from './SmartDropdown.styles';
import { SmartDropdownSchema, smartDropdownSchemaDefaults } from '@app/types';
import { PlusIcon } from '@app/lib/icons';
import { ControlledAutocomplete } from '../ControlledInput';
import { useMemo, useState } from 'react';
import { Theme } from '@app/lib/general';
import type {
  ParticipantManagementFormData,
  SCHEMA_TYPE,
  SmartDropdownData
} from '@app/types';
import { useQueryClient } from '@tanstack/react-query';
import { useActiveInitiative } from '@app/hooks/useActiveInitiative';
import { isParticipantCreationData } from '@app/types';
import { convertSmartDropdownDataToTableEntity } from '@app/utils/MyParticipants';
import { logger } from '@app/utils';

export type TSmartDropdownModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  submitLabel: string;
  addAnotherLabel?: string;
  canAddMore?: boolean;
  onSubmit: (item: SmartDropdownData) => Promise<void> | void;
  selectOptions: Option[];
  schemaType: SCHEMA_TYPE;
};

export default function SmartDropdown({
  open,
  onClose,
  title,
  submitLabel,
  addAnotherLabel,
  canAddMore,
  onSubmit,
  selectOptions,
  schemaType
}: TSmartDropdownModalProps) {
  const isParticipantCreation = schemaType === 'participantCreation';
  const { options, isLoading: isLoadingOptions } = useIndexedDbAccounts(open);
  const queryClient = useQueryClient();
  const { activeInitiative } = useActiveInitiative();
  const methods = useForm<SmartDropdownData>({
    resolver: zodResolver(SmartDropdownSchema),
    defaultValues: smartDropdownSchemaDefaults[schemaType],
    mode: 'onChange'
  });

  const [notListed, setNotListed] = useState(false);
  const { isMutating: isUpdatingParticipant, hasMutated } =
    useUpdateParticipantLoading();
  const {
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { isSubmitting, isValid, errors }
  } = methods;

  if (Object.keys(errors).length > 0) {
    logger.error('Smart Dropwdown error', new Error('Smart Dropwdown'), errors);
  }

  logger.info(`Smart Dropwdown ${title} values`, getValues());

  const resetForm = () => {
    reset(smartDropdownSchemaDefaults[schemaType]);
  };

  const optimisticUpdateParticipantList = (data: SmartDropdownData) => {
    if (!isParticipantCreation || !isParticipantCreationData(data)) {
      return;
    }

    const queryKey = ['getMyParticipants', activeInitiative?.id];

    queryClient.setQueryData<ParticipantManagementFormData>(
      queryKey,
      (oldData) => {
        if (!oldData) return oldData;

        const newParticipant = convertSmartDropdownDataToTableEntity(data);

        return [...oldData, newParticipant];
      }
    );
  };

  const tempOption = watch('tempOption');

  const { isLoading: detailsLoading } = useGetAccountEntity(
    tempOption?.id || '',
    (data) => {
      reset({ schemaType, tempOption, ...data });
    }
  );

  const readOnly = !!tempOption?.id;
  const shouldShowDetailsFields = readOnly || notListed;

  const { mutateAsync: addAccount, isPending: isCreating } =
    useCreateAccountEntity(schemaType);

  const clearFormAndCloseModal = () => {
    resetForm();
    setNotListed(false);
    onClose();
    if (hasMutated && isParticipantCreation) {
      queryClient.invalidateQueries({
        queryKey: ['getMyParticipants', activeInitiative?.id]
      });
    }
  };

  const addAcountOrSelectOption = async (
    data: SmartDropdownData,
    optimisticUpdate = false
  ) => {
    if (notListed) {
      const created = await addAccount(data);
      if (!isParticipantCreation) {
        await onSubmit({
          ...data,
          ...created,
          ...('assignedRoles' in data && { assignedRoles: data.assignedRoles })
        });
      }
    } else {
      await onSubmit(data);
    }

    if (optimisticUpdate) {
      optimisticUpdateParticipantList(data);
    }

    setNotListed(false);
    resetForm();
  };

  const addAcountOrSelectOptionAndCloseModal = async (
    data: SmartDropdownData
  ) => {
    await addAcountOrSelectOption(data);
    onClose();

    if (isParticipantCreation) {
      queryClient.invalidateQueries({
        queryKey: ['getMyParticipants', activeInitiative?.id]
      });
    }
  };

  const onFormSubmit = handleSubmit(addAcountOrSelectOptionAndCloseModal);

  const handleAddAnother = handleSubmit((data) =>
    addAcountOrSelectOption(data, isParticipantCreation)
  );

  const handleNotListedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setNotListed(checked);
    if (checked) {
      resetForm();
    }
  };

  const memoizedOptions = useMemo(() => {
    return (
      options.filter((o) => !selectOptions.some((opt) => opt.value === o.id)) ??
      []
    );
  }, [options, selectOptions]);

  return (
    <FormProvider {...methods}>
      <Modal
        open={open}
        onClose={clearFormAndCloseModal}
        $width="768px"
        keepMounted={false}
        $minHeight="320px"
        loading={isCreating || isUpdatingParticipant}
        modalTitle={
          <TitleRight>
            <span>{title}</span>
            <IconButton
              disabled={isSubmitting || isCreating}
              onClick={clearFormAndCloseModal}
              aria-label="close"
            />
          </TitleRight>
        }
        footerChildren={
          <>
            <ButtonComponent
              type="button"
              customVariant="secondary-m"
              onClick={clearFormAndCloseModal}
              disabled={isSubmitting || isCreating}
            >
              Cancel
            </ButtonComponent>
            <ButtonComponent
              type="button"
              customVariant="primary-m"
              onClick={onFormSubmit}
              disabled={!isValid || isCreating}
            >
              {submitLabel}
            </ButtonComponent>
          </>
        }
      >
        <Body>
          <Stack spacing={4}>
            <RequiredLabel
              label="Response required to continue"
              fontSize="s"
              required
              startWithStar
            />

            <Stack spacing={2}>
              <ControlledAutocomplete
                name="tempOption"
                loading={isLoadingOptions}
                required={!notListed}
                options={memoizedOptions}
                disabled={notListed}
                onClear={resetForm}
                schemaType={schemaType}
              />
              <Box alignItems="flex-start" paddingLeft={1.5}>
                <Checkbox
                  label="My entity is not listed"
                  checked={!!notListed}
                  onChange={handleNotListedChange}
                  disabled={readOnly || isLoadingOptions}
                />
              </Box>

              {shouldShowDetailsFields ? (
                <DetailsFields
                  schemaType={schemaType}
                  loading={detailsLoading}
                />
              ) : null}
              {false && (
                <ButtonComponent
                  type="button"
                  customVariant="terciary-m"
                  startIcon={<PlusIcon fill={Theme.palette.primary.azur} />}
                  onClick={handleAddAnother}
                  disabled={!isValid || !canAddMore}
                >
                  {addAnotherLabel}
                </ButtonComponent>
              )}
            </Stack>
          </Stack>
        </Body>
      </Modal>
    </FormProvider>
  );
}
