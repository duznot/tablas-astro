import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test',
    charset: 'utf8mb4',
  });
  const [rows] = await connection.execute(`SELECT DATE_FORMAT(r.fecha_reporte, '%Y-%m') AS periodo, ev.tipo_evento AS clave, COUNT(ev.id_evento) AS total_eventos FROM ReportesDiarios r LEFT JOIN Eventos ev ON r.id_reporte = ev.id_reporte GROUP BY periodo, ev.tipo_evento ORDER BY periodo DESC`);
  await connection.end();
  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
