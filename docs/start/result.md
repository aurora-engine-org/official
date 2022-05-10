---
search: false
---
# 响应处理

## Html
在使用Aurora进行后端提供前端页面的展示,你可以选择配置静态资源的根目录，或者使用默认的根目录， 
但是需要注意的一点此处的根目录是和html的位置有着严格的关系,html页面必须放在静态资源根目录下. 
原因在于导入css,js等资源的路径上需要相对于html所在位置进行加载,否则将导致一些静态在原加载失败。(对于这个问题，我也在思考设计中，也许在未来能够打破这个问题)。

```go
a.Get("/index", func() string {
    //index.html 文件存放于项目根目录下
    return "/index.html"
})
```

## Json
Aurora对非接口类型的数据返回自动解析并返回json给前端调用者,json的解析库默认是jsoniter,在使用aurora上面，
返回的数据应该是可以被解析的 结构体数据,error错误类型,aurora并不会返回给前端使用，而是在内部处理，可能是以日志的形式输出,也可能是通过错误捕捉器执行你定义的处理方式。
```go
// GET 方法注册 web get请求
a.Get("/", func() map[string]string {
    //直接返回一个数据实例
    return map[string]string{"a": "aa"}
})
```

## 请求转发
通过返回一个指定的格式进行请求转发: `forward:/xxx/xxx` 指定请求转发到一个具体的路由上，转发请求的限制是请求类型，只能转发到
同类型请求方法中。请求转发会携带当前的上下文，请求体到指定的接口上。
```go
a.Get("/", func() string {
    //重定向到 /xxx/xxx 服务
    return "forward:/xxx/xxx"
})
```