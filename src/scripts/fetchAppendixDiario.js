import { initDataTable } from "./initDatatable.js";

window.cargarApendice = async function(num) {
  let url = '';
  let columns = [];
  let title = '';
  if (num === 1) {
    url = 'http://localhost:4321/api/permisos';
    columns = ['id', 'clave', 'descripcion', 'patron'];
    title = 'Apéndice Diario 1 – Permisos';
  } else if (num === 2) {
    url = 'http://localhost:4321/api/productos';
    columns = ['id', 'clave', 'descripcion_producto', 'clave_subproducto', 'descripcion_subproducto', 'unidad_medida', 'descripcion_unidad'];
    title = 'Apéndice Diario 2 – Productos';
  } else if (num === 3) {
    url = 'http://localhost:4321/api/unidades';
    columns = ['id', 'clave', 'descripcion'];
    title = 'Apéndice Diario 3 – Eventos';
  }
  const res = await fetch(url);
  const data = await res.json();
  let html = `<h2 class='text-2xl font-bold mb-4 text-cyan-200'>${title}</h2>`;
  html += `<table id='myTable' class='display' style='width:100%'><thead><tr>`;
  columns.forEach(col => html += `<th>${col.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</th>`);
  html += `</tr></thead><tbody>`;
  function escapeHtml(text) {
    if (typeof text !== 'string') return text;
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  data.forEach(row => {
    html += '<tr>';
    columns.forEach(col => html += `<td>${escapeHtml(row[col] ?? '')}</td>`);
    html += '</tr>';
  });
  html += '</tbody></table>';
  const container = document.getElementById('apendice-table-container');
  if (container) {
    container.innerHTML = html;
    initDataTable('#myTable');
  }
}
