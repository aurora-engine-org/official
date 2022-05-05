---
search: false
---
# 参数解析
Aurora 的参数解析是基于反射,实现入参的初始化,反射注入参数目大部分类型都是支持的，也可能存在没有测试到的 bug， 
基于反射的局限性，Aurora 设计对参数的初始化方式相对独特，和写代码调用函数的方式相同，访问那个接口等于调用那个函数， 
根据函数所需要的参数类型，依次传递即可正确得到请求参数。接下来就是 Aurora 参数级别的优先及(从左往右依次赋值), [RESTful参数,Get参数,Post参数]
## Get
```go
    // Get请求参数的获取，和参数名无关，只与处理器的如参顺序和类型有关  index?age=11&name=test
    a.Get("/index", func(age int, name string) {
      fmt.Printf("age: %d, name: %s", age, name)
    })
```
## Post
#### 请求体
```json
{
    "name": "test",
    "age": 16,
    "gender": "男",
    "address":["aa","bb"],
    "report":{
    	"a":11,
    	"b":12
    }
}
```
#### 参数定义
```go
//对应结构体
type Post struct {
    Name    string
    Age     int
    Gender  string
    Address []string
    Report  map[string]interface{}
}
```

#### post接口定义
```go
a.Post("/post1", func(post Post) {
   fmt.Println(post)
})

a.Post("/post2", func(post *Post) {
   fmt.Println(post)
})

a.Post("/post3", func(post map[string]interface{}) {
   fmt.Println(post)
})
```
::: tip
在定义Post请求参数的结构体映射上面，默认按字段名来匹配，在有特殊规则情况下面也支持tag定义json标签来支持映射
:::

## RESTFul
```go
// 处理器参数解析顺序 [URL路径参数序列,Get去请求参数序列,Post请求体]
//参数的解析与参数名无关，只与入参顺序有关
a.Get("/user/{id}", func(id int) int {
    fmt.Println(id)
    return id
})
```

## 文件上传
```go
a.Post("/post", func(files *aurora.MultipartFile) {
	if files == nil {
		return
	}
	file := files.File
	for k, v := range file {
		fmt.Println("name: ", k, "value: ", v[0].Filename)
	}
})
```

