import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

import { getVehicles } from "./vehicle.service";
import { getTasks } from "./task.service";
import { getMembers } from "./member.service";
import { getInspections } from "./inspection.service";

import { buildReportHTML } from "../templates/reportTemplate";

export async function generateReportPDF() {
  const vehicles = getVehicles();
  const tasks = getTasks();
  const inspections = getInspections();
  const members = getMembers();

  const html = buildReportHTML(
    vehicles,
    tasks,
    inspections,
    members
  );

  const pdf = await Print.printToFileAsync({
    html,
  });

  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(pdf.uri);
  }
}