import { Vehicle } from "../types/Vehicle";
import { Maintenance } from "../types/Maintenance";
import { Inspection } from "../types/Inspection";
import { Member } from "../types/Member";

export function buildReportHTML(
  vehicles: Vehicle[],
  maintenances: Maintenance[],
  inspections: Inspection[],
  members: Member[]){
  const pendientes = inspections.filter(
    i => i.estado === "Pendiente"
  ).length;

  const aprobadas = inspections.filter(
    i => i.estado === "Aprobada"
  ).length;

  const rechazadas = inspections.filter(
    i => i.estado === "Rechazada"
  ).length;
function getVehicle(id: string): Vehicle | undefined {
  return vehicles.find((v) => v.id === id);
}
function getEstadoVehiculoHTML(estado: string) {
  switch (estado) {
    case "Activo":
      return `<span class="badge badge-success">🟢 Activo</span>`;

    case "Mantenimiento":
      return `<span class="badge badge-warning">🟡 Mantenimiento</span>`;

    case "Fuera de servicio":
      return `<span class="badge badge-danger">🔴 Fuera de servicio</span>`;

    default:
      return estado;
  }
}
function getEstadoInspeccionHTML(estado: string) {
  switch (estado) {
    case "Aprobada":
      return `<span class="badge badge-success">🟢 Aprobada</span>`;

    case "Pendiente":
      return `<span class="badge badge-warning">🟡 Pendiente</span>`;

    case "Rechazada":
      return `<span class="badge badge-danger">🔴 Rechazada</span>`;

    default:
      return estado;
  }
}
const activos = vehicles.filter(v => v.estado === "Activo").length;
const enMantencion = vehicles.filter(v => v.estado === "Mantenimiento").length;
const fueraServicio = vehicles.filter(v => v.estado === "Fuera de servicio").length;
  return `
<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8"/>

<style>

body{
font-family:Arial,sans-serif;
padding:35px;
color:#222;
}

.header{
text-align:center;
margin-bottom:30px;
}

.logo{
font-size:42px;
font-weight:bold;
color:#0B5FA5;
letter-spacing:1px;
}

.subtitle{
color:#666;
margin-top:5px;
}

h2{
background:#0B5FA5;
color:white;
padding:14px 18px;
margin-top:35px;
border-radius:8px;
font-size:24px;
}

table{
width:100%;
border-collapse:collapse;
margin-top:15px;
margin-bottom:20px;
box-shadow:0 2px 8px rgba(0,0,0,.08);
}

th{
background:#0B5FA5;
color:white;
padding:12px;
border:1px solid #E5E7EB;
font-size:14px;
text-transform:uppercase;
letter-spacing:0.5px;
}

td{
padding:10px;
border:1px solid #DDD;
font-size:13px;
vertical-align:middle;
}

tbody tr:hover{
background:#EEF6FD;
}



.card{
background:#F5F9FC;
border:1px solid #D6E4F0;
border-left:8px solid #0B5FA5;
border-radius:8px;
padding:12px;
min-height:65px;
display:flex;
flex-direction:column;
justify-content:center;
}

.card-title{
font-size:14px;
color:#666;
margin-bottom:4px;
}

.card-value{
font-size:24px;
font-weight:bold;
color:#0B5FA5;
}
.badge{
display:inline-block;
padding:6px 14px;
border-radius:20px;
font-size:12px;
font-weight:bold;
text-align:center;
min-width:150px;
box-sizing:border-box;
}

.badge-success{
background:#D4EDDA;
color:#155724;
}
.center{
text-align:center;
}
.badge-warning{
background:#FFF3CD;
color:#856404;
}

.badge-danger{
background:#F8D7DA;
color:#721C24;
}
.footer{
margin-top:60px;
padding-top:20px;
text-align:center;
font-size:12px;
color:#777;
line-height:1.6;
}
.page-break{
  page-break-before: always;
}
 

</style>

</head>

<body>

<div class="header">

<div
style="
background:#0B5FA5;
height:8px;
margin-bottom:30px;
border-radius:10px;
">
</div>

<div class="logo">
REPORTE GENERAL
</div>

<div class="subtitle">
Informe Ejecutivo • Sistema de Gestión de Flota
</div>

<div
style="
font-size:20px;
font-weight:bold;
margin-top:5px;
color:#0B5FA5;
">
SEGEA
</div>

<div
style="
margin-top:15px;
font-size:13px;
color:#777;
">
Generado el ${new Date().toLocaleString("es-CL")}
</div>

</div>
<div
style="
background:#EEF6FD;
border-left:6px solid #0B5FA5;
padding:18px;
border-radius:8px;
margin-bottom:25px;
">

<strong>Resumen Ejecutivo</strong><br><br>

Este informe presenta el estado actual de la flota registrada
en el sistema SEGEA, incluyendo vehículos, mantenimientos,
inspecciones y personal asociado.

</div>

<h2>Resumen General</h2>

<table style="width:100%; border-collapse:separate; border-spacing:18px; border:none;">

<tr>

<td style="width:50%; border:none;">

<div class="card">
<div class="card-title">🚗 Vehículos</div>
<div class="card-value">${vehicles.length}</div>
</div>

</td>

<td style="width:50%; border:none;">

<div class="card">
<div class="card-title">🔧 Mantenimientos</div>
<div class="card-value">${maintenances.length}</div>
</div>

</td>

</tr>

<tr>

<td style="border:none;">

<div class="card">
<div class="card-title">📋 Inspecciones</div>
<div class="card-value">${inspections.length}</div>
</div>

</td>

<td style="border:none;">

<div class="card">
<div class="card-title">👷 Personal</div>
<div class="card-value">${members.length}</div>
</div>

</td>

</tr>

<tr>

<td style="border:none;">

<div class="card">
<div class="card-title">🟡 Pendientes</div>
<div class="card-value">${pendientes}</div>
</div>

</td>

<td style="border:none;">

<div class="card">
<div class="card-title">🟢 Aprobadas</div>
<div class="card-value">${aprobadas}</div>
</div>

</td>

</tr>

<tr>

<td colspan="2" style="border:none;">

<div class="card">
<div class="card-title">🔴 Rechazadas</div>
<div class="card-value">${rechazadas}</div>
</div>

</td>

</tr>

</table>
<h2>Estado de la Flota</h2>

<table>

<tr>
<th>Estado</th>
<th>Cantidad</th>
<th>Porcentaje</th>
</tr>

<tr>
<td>🟢 Activos</td>
<td class="center">${activos}</td>
<td class="center">
${vehicles.length ? ((activos / vehicles.length) * 100).toFixed(1) : 0}%
</td>
</tr>

<tr>
<td>🟡 En mantenimiento</td>
<td class="center">${enMantencion}</td>
<td class="center">
${vehicles.length ? ((enMantencion / vehicles.length) * 100).toFixed(1) : 0}%
</td>
</tr>

<tr>
<td>🔴 Fuera de servicio</td>
<td class="center">${fueraServicio}</td>
<td class="center">
${vehicles.length ? ((fueraServicio / vehicles.length) * 100).toFixed(1) : 0}%
</td>
</tr>

</table>
<h2>Vehículos</h2>

<table>

<tr>

<th>Patente</th>

<th>Marca</th>

<th>Modelo</th>

<th>Año</th>

<th>Estado</th>

<th>Km</th>

</tr>

${vehicles.map(v=>`

<tr>

<td>${v.patente}</td>

<td>${v.marca}</td>

<td>${v.modelo}</td>

<td class="center">${v.anio}</td>

<td>${getEstadoVehiculoHTML(v.estado)}</td>

<td class="center">
${Number(v.kilometraje).toLocaleString("es-CL")} km
</td>

</tr>

`).join("")}

</table>

<div class="page-break"></div>

<h2>Mantenimientos</h2>

<table>

<tr>

<th>Vehículo</th>

<th>Tipo</th>

<th>Fecha</th>

<th>Km</th>

<th>Costo</th>

</tr>

${maintenances
  .map((m) => {
    const vehicle = getVehicle(m.vehicleId);

    return `
<tr>

<td>
${vehicle ? `${vehicle.marca} ${vehicle.modelo}<br/>${vehicle.patente}` : "No encontrado"}
</td>

<td>${m.tipo}</td>

<td>${m.fecha}</td>

<td class="center">
${Number(m.kilometraje).toLocaleString("es-CL")} km
</td>

<td class="center">
$${Number(m.costo).toLocaleString("es-CL")}
</td>

</tr>
`;
  })
  .join("")}

</table>

<div class="page-break"></div>

<h2>Inspecciones</h2>

<table>

<tr>

<th>Vehículo</th>

<th>Inspector</th>

<th>Fecha</th>

<th>Estado</th>

</tr>

${inspections
  .map((i) => {
    const vehicle = getVehicle(i.vehicleId);

    return `
<tr>

<td>
${vehicle ? `${vehicle.marca} ${vehicle.modelo}<br/>${vehicle.patente}` : "No encontrado"}
</td>

<td>${i.inspector}</td>

<td>${i.fecha}</td>

<td>${getEstadoInspeccionHTML(i.estado)}</td>

</tr>
`;
  })
  .join("")}

</table>

<div class="page-break"></div>

<h2>Equipo</h2>

<table>

<tr>

<th>Nombre</th>

<th>Cargo</th>

<th>Teléfono</th>

<th>Correo</th>

</tr>

${members.map(m=>`

<tr>

<td>${m.nombre}</td>

<td>${m.cargo}</td>

<td>${m.telefono}</td>

<td>${m.correo}</td>

</tr>

`).join("")}

</table>

<div class="footer">

<hr style="margin-bottom:10px;border:none;border-top:1px solid #DDD;">

<strong>SEGEA CONTROL</strong><br>

Sistema de Gestión de Flota<br>

Reporte generado automáticamente<br>

${new Date().toLocaleString("es-CL")}
</div>

</body>

</html>
`;
}