import { useDeleteParticipantModal } from '@app/hooks/Modal';
import useDeleteParticipant from '@app/hooks/useDeleteParticipant';
import Grid2 from '@mui/material/Grid2';
import { TrashBinIcon } from '@app/lib/icons';
import { IconButton } from '@app/lib/ui';

export default function RemoveParticipant({
  participantId
}: {
  participantId: string;
}) {
  const { showDeleteParticipantModal } = useDeleteParticipantModal();
  const { mutateAsync } = useDeleteParticipant(participantId);

  return (
    <Grid2 container alignItems="center" justifyContent="center">
      <IconButton
        size="small"
        color="error"
        aria-label="remove"
        onClick={() => {
          showDeleteParticipantModal({
            onConfirm: () => {
              mutateAsync({});
            }
          });
        }}
      >
        <TrashBinIcon />
      </IconButton>
    </Grid2>
  );
}
