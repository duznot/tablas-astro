import mysql from 'mysql2/promise';

export async function GET() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'test',
    charset: 'utf8mb4',
  });
  const [rows] = await connection.execute(`SELECT p.id_producto AS id, p.clave_producto AS clave, p.descripcion_producto AS descripcion_producto, '' AS clave_subproducto, '' AS descripcion_subproducto, u.clave_unidad AS unidad_medida, u.descripcion_unidad AS descripcion_unidad FROM CatProductos p LEFT JOIN CatUnidadesMedida u ON 1=1`);
  await connection.end();
  return new Response(JSON.stringify(rows), {
    status: 200,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}
