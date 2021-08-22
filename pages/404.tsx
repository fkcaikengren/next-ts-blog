import NotFound from "containers/NotFound";
import { MyComponentType } from "./_app";


const NotFoundPage: MyComponentType = ()=>{
  return <NotFound />
}
NotFoundPage.title = '未知页面'
NotFoundPage.container = false

export default NotFoundPage