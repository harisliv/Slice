import useMyParticipants from "@app/hooks/useMyParticipants";
import type { TMyParticipants } from "@app/types";
import { Box } from "@mui/material";
import { Paragraph } from "@app/lib/ui";

const getSignatoriesAndMembers = (participants: TMyParticipants[]) => {
  const signatoriesCount = participants?.filter(
    (p) => p.category === "Signatory",
  ).length;
  const membersCount = participants?.filter(
    (p) => p.category === "Member",
  ).length;

  return { signatories: signatoriesCount, members: membersCount };
};

export default function ParticipantCount() {
  const { data: participants } = useMyParticipants();

  const { signatories, members } = getSignatoriesAndMembers(participants || []);
  return (
    <Box>
      <Paragraph variant="medium-regular">
        Participants:{" "}
        <span style={{ fontWeight: 700 }}>{participants?.length}</span>{" "}
        (Signatories: <span style={{ fontWeight: 700 }}>{signatories}</span>,
        Members: <span style={{ fontWeight: 700 }}>{members}</span>)
      </Paragraph>
    </Box>
  );
}
