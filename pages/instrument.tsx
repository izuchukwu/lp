import type {NextPage} from 'next'
import Head from 'next/head'
import Script from 'next/script'
import {useEffect, useRef, useState} from 'react'
import styles from '../styles/Home.module.css'
import modalStyles from '../styles/Instrument.module.css'

async function tryDownload(basic?: string): Promise<'ok' | 'unauthorized' | 'error'> {
	try {
		const res = await fetch('/api/download', {
			credentials: 'same-origin',
			headers: basic ? {Authorization: `Basic ${basic}`} : undefined,
		})
		if (res.status === 401) return 'unauthorized'
		if (!res.ok) return 'error'

		const blob = await res.blob()
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'success.txt'
		document.body.appendChild(a)
		a.click()
		a.remove()
		URL.revokeObjectURL(url)
		return 'ok'
	} catch {
		return 'error'
	}
}

const Instrument: NextPage = () => {
	const [open, setOpen] = useState(false)
	const [user, setUser] = useState('')
	const [pass, setPass] = useState('')
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState('')
	const userRef = useRef<HTMLInputElement>(null)
	const modalRef = useRef<HTMLFormElement>(null)

	useEffect(() => {
		if (open) {
			setError('')
			setTimeout(() => userRef.current?.focus(), 0)
		}
	}, [open])

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setOpen(false)
		}
		if (open) window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [open])

	const shakeModal = () => {
		modalRef.current?.animate(
			[
				{transform: 'translateX(0)'},
				{transform: 'translateX(-10px)'},
				{transform: 'translateX(10px)'},
				{transform: 'translateX(-8px)'},
				{transform: 'translateX(8px)'},
				{transform: 'translateX(-4px)'},
				{transform: 'translateX(4px)'},
				{transform: 'translateX(0)'},
			],
			{duration: 380, easing: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)'},
		)
	}

	const onClickDownload = async (e: React.MouseEvent) => {
		e.preventDefault()
		const result = await tryDownload()
		if (result === 'ok') return
		setUser('')
		setPass('')
		setOpen(true)
	}

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (submitting) return
		setSubmitting(true)
		setError('')

		const basic = btoa(`${user}:${pass}`)
		const result = await tryDownload(basic)

		if (result === 'ok') {
			setSubmitting(false)
			setOpen(false)
			return
		}

		setSubmitting(false)
		if (result === 'unauthorized') {
			setError('Incorrect username or password')
		} else {
			setError('Something went wrong. Try again.')
		}
		shakeModal()
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>Instrument</title>
			</Head>
			<Script
				async
				src="https://www.googletagmanager.com/gtag/js?id=G-4WE4EE5CQY"
			/>
			<Script id="google-">
				{`window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'G-4WE4EE5CQY');`}
			</Script>

			<p>
				<img src="/logo-instrument.svg" alt="Instrument" width={38} height={22} />
			</p>

			<p>
				<strong>Instrument</strong>
				<br />
				<span style={{display: 'inline-block', paddingTop: 5}}>
					The easiest way to run parallel Claude Codes
				</span>
			</p>

			<p style={{color: 'rgba(0, 0, 0, 0.5)', maxWidth: 520}}>
				Instrument lets you run a team of Claude Codes in parallel just by
				talking to one — each one safe & sound in isolated worktrees.
			</p>

			<p>
				{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
				<a className={modalStyles.downloadLink} href="/api/download" onClick={onClickDownload}>
					<span>→ Download Instrument for Mac</span>
				</a>
			</p>

			{open && (
				<div className={modalStyles.backdrop} onClick={() => setOpen(false)}>
					<form
						ref={modalRef}
						className={modalStyles.modal}
						onClick={e => e.stopPropagation()}
						onSubmit={onSubmit}
					>
						<p className={modalStyles.title}>Download Instrument</p>
						<p className={modalStyles.subtitle}>
							Enter your credentials to continue.
						</p>

						<div className={modalStyles.field}>
							<input
								ref={userRef}
								className={modalStyles.input}
								type="text"
								placeholder="Username"
								autoComplete="username"
								value={user}
								onChange={e => setUser(e.target.value)}
								disabled={submitting}
							/>
						</div>
						<div className={modalStyles.field}>
							<input
								className={modalStyles.input}
								type="password"
								placeholder="Password"
								autoComplete="current-password"
								value={pass}
								onChange={e => setPass(e.target.value)}
								disabled={submitting}
							/>
						</div>

						<p className={modalStyles.error}>{error}</p>

						<div className={modalStyles.actions}>
							<button
								type="button"
								className={`${modalStyles.btn} ${modalStyles.cancel}`}
								onClick={() => setOpen(false)}
								disabled={submitting}
							>
								Cancel
							</button>
							<button
								type="submit"
								className={`${modalStyles.btn} ${modalStyles.submit}`}
								disabled={submitting || !user || !pass}
							>
								{submitting ? 'Checking…' : 'Download'}
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}

export default Instrument
