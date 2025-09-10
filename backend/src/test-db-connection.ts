import { DataSource } from 'typeorm';

async function testConnection() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'famboard_user',
    password: 'famboard_password',
    database: 'famboard',
  });

  try {
    await dataSource.initialize();
    console.log('✅ Database connection has been established successfully.');

    // Test a simple query
    const result = await dataSource.query('SELECT NOW()');
    console.log('Current database time:', result[0].now);

    const queryTable = await dataSource.query('SELECT * FROM user');
    console.log('Users table data:', queryTable);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

testConnection().catch(console.error);
