import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test',
    charset: 'utf8mb4',
  });
  const [rows] = await connection.execute(`SELECT DATE_FORMAT(r.fecha_reporte, '%Y-%m') AS periodo, SUM(rec.volumen_recepcion) AS total_recepciones, SUM(ent.volumen_entrega) AS total_entregas, SUM(ex.volumen_existencia) AS total_existencias FROM ReportesDiarios r LEFT JOIN Recepciones rec ON r.id_reporte = rec.id_reporte LEFT JOIN Entregas ent ON r.id_reporte = ent.id_reporte LEFT JOIN Existencias ex ON r.id_reporte = ex.id_reporte GROUP BY periodo ORDER BY periodo DESC`);
  await connection.end();
  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
