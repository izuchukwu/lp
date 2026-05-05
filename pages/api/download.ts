import type {NextApiRequest, NextApiResponse} from 'next'
import {readFileSync} from 'fs'
import {join} from 'path'

const USER = 'yc'
const PASS = 'sfwasneverdead'
const VALID = Buffer.from(`${USER}:${PASS}`).toString('base64')
const COOKIE_NAME = 'tree_auth'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const header = req.headers.authorization
	const headerToken = header?.startsWith('Basic ') ? header.slice(6) : null

	const cookieEntry = (req.headers.cookie || '')
		.split(';')
		.map(c => c.trim())
		.find(c => c.startsWith(`${COOKIE_NAME}=`))
	const cookieToken = cookieEntry?.slice(COOKIE_NAME.length + 1)

	if (headerToken !== VALID && cookieToken !== VALID) {
		res.status(401).end('Authentication required')
		return
	}

	const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
	res.setHeader(
		'Set-Cookie',
		`${COOKIE_NAME}=${VALID}; HttpOnly${secure}; SameSite=Lax; Path=/; Max-Age=${COOKIE_MAX_AGE}`,
	)

	const file = readFileSync(join(process.cwd(), 'public', 'success.txt'))
	res.setHeader('Cache-Control', 'no-store')
	res.setHeader('Content-Type', 'text/plain')
	res.setHeader('Content-Disposition', 'attachment; filename="success.txt"')
	res.status(200).send(file)
}
