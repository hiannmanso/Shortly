import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import dotenv from 'dotenv'

dotenv.config()

const server = express()

server.use(cors())
server.use(express.json())
server.get('/', (req, res) => {
	res.send('teste')
	console.log('teste')
})

server.listen(process.env.PORT, () => {
	console.log(chalk.bold.green(`Backend up on port:${process.env.PORT}`))
})
