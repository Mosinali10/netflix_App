import pool from './server/db.js';

async function testSchema() {
    try {
        const res = await pool.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users'");
        console.log('✅ Users table columns:');
        res.rows.forEach(row => console.log(` - ${row.column_name} (${row.data_type})`));

        const countRes = await pool.query("SELECT COUNT(*) FROM users");
        console.log('✅ Users count:', countRes.rows[0].count);
    } catch (err) {
        console.error('❌ Schema Test Error:', err.message);
    } finally {
        await pool.end();
    }
}

testSchema();
