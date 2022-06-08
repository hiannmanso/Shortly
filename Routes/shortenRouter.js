import express from 'express'
import { shortenGET, shortenPOST } from '../Controllers/shortenController.js'

const shortenRouter = express.Router()

shortenRouter.post('/urls/shorten', shortenPOST)
shortenRouter.get('/urls/:id', shortenGET)

export default shortenRouter
