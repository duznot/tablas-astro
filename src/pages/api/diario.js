import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test',
    charset: 'utf8mb4',
  });
  const [rows] = await connection.execute(`SELECT r.id_reporte, r.version, r.fecha_reporte, r.rfc_contribuyente, r.rfc_representante_legal, r.rfc_proveedor, p.tipo_caracter, p.modalidad_permiso, p.num_permiso, rec.numero_registro AS num_recepcion, rec.volumen_recepcion, rec.temperatura AS temp_recepcion, ent.numero_registro AS num_entrega, ent.volumen_entrega, ent.temperatura AS temp_entrega, ex.numero_tanque, ex.volumen_existencia, ex.temperatura AS temp_existencia FROM ReportesDiarios r LEFT JOIN CatPermisos p ON r.id_reporte = p.id_reporte LEFT JOIN Recepciones rec ON r.id_reporte = rec.id_reporte LEFT JOIN Entregas ent ON r.id_reporte = ent.id_reporte LEFT JOIN Existencias ex ON r.id_reporte = ex.id_reporte ORDER BY r.fecha_reporte DESC`);
  await connection.end();
  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
