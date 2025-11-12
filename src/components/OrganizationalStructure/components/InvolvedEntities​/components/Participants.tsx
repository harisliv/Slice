import FormInputDescription from "@app/components/FormInputDescription";
import { ORGANIZATIONAL_STRUCTURE_FIELD_INFO } from "@app/constants";

export default function Participants() {
  return (
    <FormInputDescription
      title={ORGANIZATIONAL_STRUCTURE_FIELD_INFO.participants.title}
      subtitle={ORGANIZATIONAL_STRUCTURE_FIELD_INFO.participants.subtitle}
    />
  );
}
