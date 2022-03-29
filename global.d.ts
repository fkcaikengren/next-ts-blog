
// https://jkchao.github.io/typescript-book-chinese/typings/ambient.html#%E5%8F%98%E9%87%8F
// https://www.tslang.cn/docs/handbook/declaration-files/templates/global-d-ts.html
// https://zhuanlan.zhihu.com/p/133344957
// 环境声明，允许你安全使用现存的javascript。.d.ts文件声明更多是用于第三方库，但在这里也适用，用来声明了一些必要的js变量

interface Window { //Window一定是首字母大写
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: Function
}