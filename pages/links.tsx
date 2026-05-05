import type {NextPage} from 'next'
import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Home.module.css'

const Work: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Izu</title>
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
				<strong>Izu</strong>
				<br />
				<span style={{display: 'inline-block', paddingTop: 5}}>
					SF Design
				</span>
			</p>

			<p style={{marginTop: '20px'}}>
				<strong>Product Design</strong>
			</p>
			<p>
				<a
					className={styles.link}
					href="https://www.figma.com/proto/ntRl6KW2PI74FsF7VOtujE/Portfolio-3?page-id=29%3A2380&node-id=29-2381&viewport=197%2C466%2C0.33&t=9x7Z8FPwNSQvpeeM-8&scaling=contain&content-scaling=fixed&hotspot-hints=0&disable-default-keyboard-nav=1&starting-point-node-id=29%3A2381&hide-ui=1"
				>
					<span>→ Portfolio</span>
				</a>
			</p>

			<p>
				<strong>Site Design</strong>
			</p>
			<p>
				<a
					className={styles.link}
					href="https://beacon.lighthousehq.com"
				>
					<span>→ Lighthouse</span>
				</a>
			</p>
			<p>
				<a
					className={styles.link}
					href="https://sfcompute.com/inference"
				>
					<span>→ SF Compute Inference</span>
				</a>
			</p>
		</div>
	)
}

export default Work
