import express from 'express'
import {
	shortenGET,
	shortenPOST,
	shortenUrlGET,
	userShortenGET,
} from '../Controllers/shortenController.js'

const shortenRouter = express.Router()

shortenRouter.post('/urls/shorten', shortenPOST)
shortenRouter.get('/urls/:id', shortenGET)
shortenRouter.get('/urls/open/:shortUrl', shortenUrlGET)
shortenRouter.get('/users/:id', userShortenGET)

export default shortenRouter
