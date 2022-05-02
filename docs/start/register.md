# 注册接口
服务器注册业务处理器，其背后逻辑就是执行函数，注册接口可以是普通函数也可以是结构体方法，前者相对方便简单，但是功能有限。后者看似操作繁琐，
却能够带来更好的开发体验。根据情况任选一种即可。

## 普通函数
```go
aurora.Web.Get("/test",func(){
    fmt.Println("test")
})
```

## 结构体方法
使用结构体方法作为处理函数有以下几个步骤:
1. 定义结构体
```go
type Control struct{
    /* ... */
} 
```
2. 定义方法
```go
func (c *Control) Test(){
    /* do... */
} 
```
3. 注册结构体为处理器
```go
func main(){
    a:=aurora.Web
    c:=&Control{}
    a.Use(c)
    a.Get("/test",c.Test)
} 
```