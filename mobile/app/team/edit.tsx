import { useLocalSearchParams } from "expo-router";

import MemberForm from "../../src/components/team/MemberForm";
import { getMemberById } from "../../src/services/member.service";

export default function EditMemberScreen() {
  const { id } = useLocalSearchParams();

  const member = getMemberById(id as string);

  if (!member) {
    return null;
  }

  return (
    <MemberForm
      mode="edit"
      member={member}
    />
  );
}