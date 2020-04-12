import Link from 'next/link'
import Layout from '../components/Layout'

const Home = () => (
  <Layout>
    <h1>Tests</h1>
    <ul>
      <li>
        <span><a href="https://wgld.org/">wgld</a> Example</span>
        <ul>
          <li><Link href='/tests/webgl/study/w014' as={process.env.BACKEND_URL + '/tests/webgl/study/w014'}><a>W014</a></Link></li>
        </ul>
      </li>
    </ul>
  </Layout>
)

export default Home