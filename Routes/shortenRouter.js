import express from 'express'
import {
	rankingGET,
	shortenDELETE,
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
shortenRouter.delete('/users/:id', shortenDELETE)
shortenRouter.get('/ranking', rankingGET)

export default shortenRouter
