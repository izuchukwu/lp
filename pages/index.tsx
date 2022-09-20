import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
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

      <p><strong>Izu</strong><br/><span style={{display: 'inline-block', paddingTop: 5}}>Founder, Fable</span></p>
      <p><a className={styles.link} href="https://fableml.com"><span>→ Fable</span></a></p>
      <p><a className={styles.link} href="https://twitter.com/izuchukwuuu"><span>→ Twitter</span></a></p>
      <p><a className={styles.link} href="https://github.com/izuchukwu"><span>→ GitHub</span></a></p>
    </div>
  )
}

export default Home
