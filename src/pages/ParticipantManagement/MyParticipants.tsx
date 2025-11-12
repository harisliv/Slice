import { MyParticipants as MyParticipantsComponent } from '@app/components';
import { ModalProvider } from '@app/providers';

export default function MyParticipants() {
  return (
    <ModalProvider>
      <MyParticipantsComponent />
    </ModalProvider>
  );
}
