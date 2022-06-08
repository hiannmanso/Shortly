import db from '../database.js'
import { nanoid } from 'nanoid'

export async function shortenPOST(req, res) {
	const { authorization } = req.headers
	const { url } = req.body
	const token = authorization?.replace('Bearer', '').trim()
	const shortly = nanoid(10)
	if (!token)
		return res.status(401).send(`erro em encontrar o token: ${token}`)
	try {
		const findUser = `SELECT * 
        FROM sessions 
        JOIN users ON sessions."userID" = users.id 
		WHERE token = $1`
		const user = await db.query(findUser, [token])

		const query = `INSERT INTO shortlys ("userID",url,"shortUrl") VALUES($1,$2,$3)`
		const createShorten = await db.query(query, [
			user.rows[0].id,
			url,
			shortly,
		])
		res.status(201).send({ shortUrl: shortly })
	} catch (error) {
		console.log(error)
		res.status(422).send(error)
	}
}

export async function shortenGET(req, res) {
	const { id } = req.params

	try {
		const query = `SELECT id,"shortUrl",url FROM shortlys WHERE id = $1`
		const shorten = await db.query(query, [id])
		if (shorten.rowCount == 0) return res.sendStatus(404)
		res.status(200).send(shorten.rows[0])
	} catch (error) {
		res.status(400).send(error)
	}
}

export async function shortenUrlGET(req, res) {
	const { shortUrl } = req.params
	try {
		const findUrl = `SELECT * FROM shortlys WHERE "shortUrl" = $1`
		const shortly = await db.query(findUrl, [shortUrl])
		if (shortly.rowCount == 0) return res.sendStatus(404)
		const addViews = `UPDATE shortlys SET views =$1 WHERE id= $2`
		await db.query(addViews, [
			shortly.rows[0].views + 1,
			shortly.rows[0].id,
		])
		console.log(shortly.rows[0].views)
		res.redirect(200, shortly.rows[0].url)
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
}

export async function userShortenGET(req, res) {
	const { id } = req.params
	try {
		const query = `SELECT shortlys.*,users.name
		FROM shortlys 
		JOIN users
		ON users.id = shortlys."userID" WHERE shortlys."userID" =$1`
		const shortly = await db.query(query, [id])
		if (shortly.rowCount == 0) return res.sendStatus(404)

		const shortenedUrls = []
		let visitCount = 0
		shortly.rows.map((item) => {
			visitCount += item.views
			const newShortedUrl = {
				id: item.id,
				shortUrl: item.shortUrl,
				url: item.url,
				visitCount: item.views,
			}
			return shortenedUrls.push(newShortedUrl)
		})
		const infoUser = {
			id: shortly.rows[0].userID,
			name: shortly.rows[0].name,
			visitCount,
			shortenedUrls,
		}

		res.status(200).send(infoUser)
	} catch (error) {
		console.log(error)
		res.status(400).send(error)
	}
}
