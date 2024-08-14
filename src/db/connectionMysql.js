import { Sequelize } from "sequelize";

import config from '../configs/config.js'

const db = new Sequelize(config.development.database, config.development.username, config.development.password, {
    dialect: 'mysql',
    port: config.development.port,
    // operatorsAliases: false,
    pool: {
        max: config.development.pool.max,
        min: config.development.pool.min,
        idle: config.development.pool.idle,
        acquire: config.development.pool.acquire
    }
});

// Test the connection
export async function testConnection() {
    try {
        await db.authenticate();
        console.log('Database connected successfully');
    } catch (error) {
        //ensure you created the database
        //check database credentials
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();

export default db;