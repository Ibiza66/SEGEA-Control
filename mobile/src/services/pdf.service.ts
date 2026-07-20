import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";

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

  // Cargar el logo
  const asset = Asset.fromModule(
    require("../../assets/logo/logo-segea.png")
  );

  await asset.downloadAsync();

  const logoUri = asset.localUri ?? asset.uri;

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