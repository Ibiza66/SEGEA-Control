import AsyncStorage from "@react-native-async-storage/async-storage";
import { members } from "../data/members";
import { Member } from "../types/Member";

const STORAGE_KEY = "members";

async function saveMembers() {
  await AsyncStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(members)
  );
}

export async function loadMembers() {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  if (data) {
    members.length = 0;
    members.push(...JSON.parse(data));
  } else {
    await saveMembers();
  }
}

export function getMembers() {
  return members;
}

export function getMemberById(id: string) {
  return members.find((m) => m.id === id);
}

export async function addMember(member: Member) {
  members.push(member);
  await saveMembers();
}

export async function updateMember(member: Member) {
  const index = members.findIndex((m) => m.id === member.id);

  if (index !== -1) {
    members[index] = member;
    await saveMembers();
  }
}

export async function deleteMember(id: string) {
  const index = members.findIndex((m) => m.id === id);

  if (index !== -1) {
    members.splice(index, 1);
    await saveMembers();
  }
}