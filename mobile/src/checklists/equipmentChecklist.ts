export type ChecklistTemplate = {
  categoria: string;
  items: string[];
};

export const equipmentChecklists: ChecklistTemplate[] = [
  {
    categoria: "Extintor",
    items: [
      "Etiqueta legible",
      "Manómetro en zona verde",
      "Seguro instalado",
      "Sin golpes ni corrosión",
      "Manguera en buen estado",
      "Accesorios completos",
    ],
  },

  {
    categoria: "Pozómetro",
    items: [
      "Equipo limpio",
      "Cable en buen estado",
      "Sonda funcionando",
      "Pantalla operativa",
      "Certificación vigente",
    ],
  },

  {
    categoria: "Flujómetro",
    items: [
      "Pantalla operativa",
      "Sin daños físicos",
      "Sensores funcionando",
      "Batería en buen estado",
      "Certificación vigente",
    ],
  },

  {
    categoria: "Flexómetro",
    items: [
      "Cinta sin daños",
      "Retorno automático",
      "Escala legible",
      "Gancho firme",
      "Certificación vigente",
    ],
  },
];
export function getChecklistByCategory(categoria: string): string[] {
  const checklist = equipmentChecklists.find(
    (item) =>
      item.categoria.toLowerCase() === categoria.toLowerCase()
  );

  return checklist?.items ?? [];
}