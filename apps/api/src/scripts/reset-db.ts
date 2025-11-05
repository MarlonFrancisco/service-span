import 'dotenv/config';
import { createConnection } from 'typeorm';

async function resetDatabase() {
  let connection;
  try {
    connection = await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'service_snap',
    });

    console.log('🗑️  Resetting database...\n');

    // Delete in correct order to respect foreign key constraints
    await connection.query('DELETE FROM gallery');
    console.log('✅ Deleted gallery images');

    await connection.query('DELETE FROM store_members_services');
    console.log('✅ Deleted store members services');

    await connection.query('DELETE FROM services');
    console.log('✅ Deleted services');

    await connection.query('DELETE FROM categories');
    console.log('✅ Deleted categories');

    await connection.query('DELETE FROM schedules');
    console.log('✅ Deleted schedules');

    await connection.query('DELETE FROM store_members');
    console.log('✅ Deleted store members');

    await connection.query('DELETE FROM stores');
    console.log('✅ Deleted stores');

    await connection.query('DELETE FROM users WHERE email LIKE $1', [
      '%@test.com',
    ]);
    console.log('✅ Deleted test users');

    console.log('\n✨ Database reset completed!');

    await connection.close();
  } catch (error) {
    console.error('❌ Error during reset:', error);
    if (connection) {
      await connection.close();
    }
    process.exit(1);
  }
}

// Run the reset
void resetDatabase();
