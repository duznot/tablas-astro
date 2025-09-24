import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test',
    charset: 'utf8mb4',
  });
  const [rows] = await connection.execute(`SELECT DATE_FORMAT(r.fecha_reporte, '%Y-%m') AS periodo, COUNT(p.id_permiso) AS total_permisos FROM ReportesDiarios r LEFT JOIN CatPermisos p ON r.id_reporte = p.id_reporte GROUP BY periodo ORDER BY periodo DESC`);
  await connection.end();
  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
