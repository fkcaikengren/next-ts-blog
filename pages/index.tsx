// import axios from 'axios'
// import type { NextApiRequest, NextApiResponse } from 'next'
import { MyComponentType } from './_app'

import Home from 'containers/Home'

const HomePage: MyComponentType = ()=>{
  return <Home />
}
HomePage.title = '首页'
export default HomePage



// export async function getServerSideProps({req: NextApiRequest, res: NextApiResponse}){
  // const res = await axios.get('http://localhost:3000/api/home')
  // console.log(res.data)
  // return {
  //   props: {...res.data}
  // }
// }