import type {GetServerSideProps} from 'next'

const WorkPage = () => null

export const getServerSideProps: GetServerSideProps = async () => ({
	redirect: {
		destination:
			'https://www.figma.com/proto/ntRl6KW2PI74FsF7VOtujE/Portfolio-3?page-id=29%3A2380&node-id=29-2381&viewport=197%2C466%2C0.33&t=9x7Z8FPwNSQvpeeM-8&scaling=contain&content-scaling=fixed&hotspot-hints=0&disable-default-keyboard-nav=1&starting-point-node-id=29%3A2381&hide-ui=1',
		permanent: false,
	},
})

export default WorkPage
