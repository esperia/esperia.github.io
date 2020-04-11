import Link from 'next/link'
import Layout from '../components/Layout'

const Home = () => (
  <Layout>
    <h1>Tests</h1>
    <ul>
      <li><Link href='/tests/webgl/study/test' as={process.env.BACKEND_URL + '/tests/webgl/study/test'}><a>WebGL</a></Link></li>
    </ul>
  </Layout>
)

export default Home