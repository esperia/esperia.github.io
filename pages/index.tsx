import Link from 'next/link'

const Home = () => (
    <div>
        <h1>Tests</h1>
        <ul>
            <li><Link href='/tests' as={process.env.BACKEND_URL + '/tests'}><a>About</a></Link></li>
        </ul>
    </div>
)

export default Home