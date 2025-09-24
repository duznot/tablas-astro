import DataTable from 'datatables.net-dt';
import 'datatables.net-responsive-dt';

export function initDataTable(selector, options = {}) {
  return new DataTable(selector, {
    responsive: true,
    paging: true,
    searching: true,
    info: true,
    lengthChange: true,
    pageLength: 5,
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.13.8/i18n/es-ES.json"
    },
    ...options
  });
}
