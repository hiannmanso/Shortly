import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import dotenv from 'dotenv'
import authRouter from './Routes/authRouter.js'
import shortenRouter from './Routes/shortenRouter.js'

dotenv.config()

const server = express()

server.use(cors())
server.use(express.json())
server.use(authRouter)
server.use(shortenRouter)

server.listen(process.env.PORT, () => {
	console.log(chalk.bold.green(`Backend up on port:${process.env.PORT}`))
})
