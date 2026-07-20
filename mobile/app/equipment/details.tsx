import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCallback, useState } from "react";
import {
  deleteEquipment,
  getEquipmentById,
} from "../../src/services/equipment.service";
import {
  getEquipmentInspectionsByEquipmentId,
  loadEquipmentInspections,
} from "../../src/services/equipmentInspection.service";
export default function EquipmentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

 const equipment = getEquipmentById(id);
 const [inspections, setInspections] = useState(
  equipment
    ? getEquipmentInspectionsByEquipmentId(equipment.id)
    : []
);
useFocusEffect(
  useCallback(() => {
    async function cargar() {
      await loadEquipmentInspections();

      if (equipment) {
        setInspections(
          getEquipmentInspectionsByEquipmentId(equipment.id)
        );
      }
    }

    cargar();
  }, [equipment])
);
  const estadoColor =
  equipment?.estado === "Operativo"
    ? "#16A34A"
    : equipment?.estado === "En mantenimiento"
      ? "#F59E0B"
      : "#DC2626";
  const eliminarEquipo = () => {
  Alert.alert(
    "Eliminar equipo",
    `¿Desea eliminar ${equipment?.nombre}?`,
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          if (equipment) {
            await deleteEquipment(equipment.id);

            Alert.alert("Éxito", "Equipo eliminado correctamente", [
              {
                text: "OK",
               onPress: () => router.replace("/equipment" as any),
              },
            ]);
          }
        },
      },
    ]
  );
};
  if (!equipment) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Equipo no encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerCard}>
        {equipment.foto ? (
  <Image
    source={{ uri: equipment.foto }}
    style={styles.headerImage}
  />
) : (
  <Ionicons
    name="construct"
    size={70}
    color="#005A9C"
  />
)}

<Text style={styles.title}>
  {equipment.nombre}
</Text>

<Text style={styles.plate}>
  {equipment.codigo}
</Text>

<View style={[styles.badge, { backgroundColor: estadoColor }]}>
  <Text style={styles.badgeText}>
    {equipment.estado}
  </Text>
</View>
      </View>

      <Text style={styles.sectionTitle}>
  Información del equipo
</Text>

<View style={styles.infoCard}>
  <Item
    icon="pricetag"
    label="ID"
    value={equipment.id}
  />

  <Item
    icon="scan"
    label="NFC asociado"
    value={equipment.nfcId || "No asociado"}
  />

  <Item
    icon="cube"
    label="Categoría"
    value={equipment.categoria}
  />

  <Item
    icon="business"
    label="Marca"
    value={equipment.marca}
  />

  <Item
    icon="construct"
    label="Modelo"
    value={equipment.modelo}
  />

  <Item
  icon="qr-code"
  label="Número de serie"
  value={equipment.numeroSerie}
/>

  <Item
    icon="location"
    label="Ubicación"
    value={equipment.ubicacion}
  />

  <Item
    icon="calendar"
    label="Certificación"
    value={equipment.fechaCertificacion.toLocaleDateString("es-CL")}
  />

  <Item
    icon="time"
    label="Vencimiento"
    value={equipment.vencimientoCertificacion.toLocaleDateString("es-CL")}
  />
</View>
<Text style={styles.sectionTitle}>
  Historial de inspecciones
</Text>

<View style={styles.infoCard}>
  {inspections.length === 0 ? (
    <Text style={styles.observation}>
      Este equipo aún no tiene inspecciones.
    </Text>
  ) : (
    inspections.map((inspection) => (
  <Pressable
    key={inspection.id}
    style={styles.inspectionItem}
    onPress={() =>
      router.push({
        pathname: "/equipment/inspection/details",
        params: {
          inspectionId: inspection.id,
        },
      })
    }
  >
        <Text style={styles.inspectionDate}>
          {inspection.fecha}
        </Text>

        <Text>
          Inspector: {inspection.inspector}
        </Text>

        <Text>
          Estado: {inspection.estado}
        </Text>
      </Pressable>
    ))
  )}
</View>
<Text style={styles.sectionTitle}>Observaciones</Text>

<View style={styles.infoCard}>
  <Text style={styles.observation}>
    {equipment.observaciones || "Sin observaciones."}
  </Text>
</View>
<Pressable
  style={[styles.button, styles.inspectButton]}
  onPress={() =>
    router.push({
      pathname: "/equipment/inspection/create",
      params: {
        equipmentId: equipment.id,
      },
    })
  }
>
  <Ionicons
    name="clipboard-outline"
    size={22}
    color="white"
  />

  <Text style={styles.buttonText}>
    Realizar inspección
  </Text>
</Pressable>

<Pressable
  style={[styles.button, styles.editButton]}
  onPress={() =>
    router.push({
      pathname: "/equipment/edit",
      params: {
        id: equipment.id,
      },
    })
  }
>
  <Ionicons name="create-outline" size={22} color="white" />
  <Text style={styles.buttonText}>Editar equipo</Text>
</Pressable>
      <Pressable
        style={[styles.button, styles.deleteButton]}
        onPress={eliminarEquipo}
      >
        <Ionicons name="trash-outline" size={22} color="white" />
        <Text style={styles.buttonText}>Eliminar equipo</Text>
      </Pressable>
    </ScrollView>
  );
}

type ItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

function Item({ icon, label, value }: ItemProps) {
  return (
    <View style={styles.item}>
      <Ionicons name={icon} size={22} color="#005A9C" />

      <View style={{ marginLeft: 15 }}>
        <Text style={styles.itemLabel}>{label}</Text>
        <Text style={styles.itemValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  headerCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 25,
    elevation: 3,
  },

  title: {
    marginTop: 15,
    fontSize: 28,
    fontWeight: "700",
  },

  plate: {
    marginTop: 6,
    fontSize: 18,
    color: "#555",
  },

  badge: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 30,
  },

  badgeText: {
    color: "white",
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 10,
  },

  infoCard: {
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  itemLabel: {
    fontSize: 14,
    color: "#777",
  },

  itemValue: {
    fontSize: 17,
    fontWeight: "600",
  },

  observation: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
  },

  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
  },

  editButton: {
    backgroundColor: "#005A9C",
  },

  deleteButton: {
    backgroundColor: "#DC2626",
    marginBottom: 80,
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 17,
    marginLeft: 10,
  },
  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 20,
    marginBottom: 15,
    resizeMode: "cover",
  },
  inspectButton: {
  backgroundColor: "#16A34A",
},inspectionItem: {
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#E5E5E5",
},

inspectionDate: {
  fontWeight: "700",
  fontSize: 16,
  marginBottom: 5,
},
  
});
