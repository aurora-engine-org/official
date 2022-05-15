---
sidebarDepth: 5
---
# 中间件
中间件用于具体接口执行之前执行一次，可以通过中间件来校验某些逻辑，或者做一些额外的事情。Aurora 的中间件设计通过返回一个 `bool`值来中断调用链。
## 中间定义
常见的两种中间件创建方法
#### 直接定义
定义中间件只需要满足 `func(aurora.Ctx)bool` 这个函数类型即可
```go
func Test(ctx aurora.Ctx) bool{
    //do...
    return true
}
```

#### 返回中间件
```go
func TestMiddleware() aurora.Middleware {
	return func(ctx aurora.Ctx) bool {
		fmt.Println("test_middleware")
		return true
	}
}
```


### 全局中间件
通过 Aurora 实例直接使用中间件是一个全局的效果，每个接口调用都会执行到这个中间件，即使进行了分组，也不会影响到全局中间件的执行。
```go
func main() {
	web := aurora.Web
	web.Use(Test)
	web.Get("/", func() {
		fmt.Println("/")
	})
	aurora.Run(web)
}
```

### 接口中间件
直接在注册接口的地方，指定该接口需要被那个中间件进行处理。
```go
func Index(){
    fmt.Println("/")
}
func main() {
	web := aurora.Web
	web.Use(Test)
	// Index 是处理器 , Test是中间件
	web.Get("/",Index,Test)
	aurora.Run(web)
}
```

### 分组全局
通过分组加载的中间件，在该分组之下的接口都将会被处理
```go
func Index(){
    fmt.Println("/")
}
func main() {
	web := aurora.Web
	g:=web.Group("/index",Test)
	// ro g.Use(Test)
	g.Get("/",Index)
	aurora.Run(web)
}
```

## 上下文传递
`aurora.Ctx`作为中间的核心参数，其实就是个`map[string]interface{}` ,在map中初始化了一部分的 基础属性，比如`*http.Request` ,`http.ResponseWriter`。`aurora.Ctx`在整个请求周期内不是协程
安全的。对上下文参数做了一定的分装，提供了基本的请求参数获取，上下文参数可以再正式处理器中得到，如下所示：
```go
func main() {
    web := aurora.Web
    web.Use(Test)
    web.Get("/", func(ctx aurora.Ctx) {
        fmt.Println("/")
    })
    aurora.Run(web)
}
```

## 中断处理
`aurora.Ctx`提供了一个方法用于执行中断前的响应方法，可提供发生中断时候给前端做出想要的响应信息。
```go
func Test(ctx aurora.Ctx) bool{
    //在中断之前调用Return方法，设置需要返回的参数，Return的参数和处理器返回值的解析方式一致
    ctx.Return("error")
    return false
}
```
::: warning
中断处理需要 >= v0.4.1
:::
