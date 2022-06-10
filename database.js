import pg from 'pg'
import chalk from 'chalk'
import dotenv from 'dotenv'
dotenv.config()
const { Pool } = pg

if (process.env.MODE === 'PROD') {
	const databaseConfig = {
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false,
		},
	}
} else {
	const databaseConfig = {
		connectionString: process.env.DATABASE_URL,
	}
}
const db = new Pool(databaseConfig)
console.log(chalk.bold.red('Postgres database connected.'))
export default db
