# 项目组织

## 目录结构

### 推荐结构
```text
|—— projectRoot
|  |—— controller
|  |—— dao
|  |—— model
|  |—— service
|  |—— static
|  |—— go.mod
|  |—— application.go
|  |—— application.yml
```
### application.go
```go
//Server 创建服务器
type Server struct {
	*aurora.Aurora
}

func main() {
	s := &Server{aurora.Web}
	/*
	 do ...
	*/
	err := aurora.Run(s)
	if err != nil {
		s.Error(err.Error())
		return
	}
}
```

## Vue 组合
Aurora 组合 Vue 进行全栈开发,其本质上是两个项目放到一起而已,在更路径下创建一个 vue 的项目或者把vue的build
资源放到 静态文件目录下即可。下面的案例是进行配置一个vue如何构建到 Aurora 静态资源目录下的示范。
### 静态资源
配置静态资源
```yaml
aurora:
  resource: static
```
### Vue 配置
需要考虑到对应多个 vue 项目
#### vue.config.js
```js
module.exports = defineConfig({
  transpileDependencies: true,
  // ./ 定义build静态资源导入路径前缀，默认没有 ./导入会导致 aurora 加载静态资源失败
  // 多个vue项目 此处需要修改对应的目录前缀，否则无法正确读取静态资源
  // (对应目录前缀对应着build目录)
  publicPath:'./',
  //配置webpack 构建输出到 项目定义的 静态资源路径
  // 单个vue项目可以直接build到静态资源路径下
  // 多个vue项目请分别创建文件夹导入到 aurora 静态资源目录下
  outputDir: '../static'
})
```