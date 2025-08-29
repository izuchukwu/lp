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
					Founder, SF Design
				</span>
			</p>

			<p>
				<strong>Product Design</strong>
			</p>
			<p>
				<a
					className={styles.link}
					href="https://www.figma.com/proto/57r7M384xDOzrqp7xn1JFR?node-id=1-2&starting-point-node-id=1:2&locale=en"
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
