import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test',
    charset: 'utf8mb4',
  });
  const [rows] = await connection.execute(`SELECT DATE_FORMAT(r.fecha_reporte, '%Y-%m') AS periodo, pr.clave_producto, pr.descripcion_producto, SUM(rec.volumen_recepcion) AS total_recepcion, SUM(ent.volumen_entrega) AS total_entrega, SUM(ex.volumen_existencia) AS total_existencia FROM ReportesDiarios r LEFT JOIN Recepciones rec ON r.id_reporte = rec.id_reporte LEFT JOIN Entregas ent ON r.id_reporte = ent.id_reporte LEFT JOIN Existencias ex ON r.id_reporte = ex.id_reporte LEFT JOIN CatProductos pr ON rec.id_producto = pr.id_producto OR ent.id_producto = pr.id_producto OR ex.id_producto = pr.id_producto GROUP BY periodo, pr.clave_producto, pr.descripcion_producto ORDER BY periodo DESC`);
  await connection.end();
  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
