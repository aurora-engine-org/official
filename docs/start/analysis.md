---
search: false
---
# 参数解析

Aurora 的参数解析是基于反射，实现入参的初始化，反射注入参数，目前大部分类型都是支持的，也可能存在没有测试到的 bug， 
基于反射的局限性，Aurora 设计对参数的初始化方式相对独特，和写代码调用函数的方式相同，访问那个接口等于调用那个函数， 
根据函数所需要的参数类型，依次传递即可正确得的请求参数。接下来就是 Aurora 参数级别的优先及(从左往右依次赋值), [RESTful参数,Get参数,Post参数]
## Get

- 根据函数顺序传参
```go
    // Get请求参数的获取，和参数名无关
    //只与处理器的如参顺序和类型有关 
    // GET http://localhost:8080/get?age=20&name=saber
    a.Get("/get", func(age int, name string) {
		fmt.Printf("age: %d, name: %s", age, name)
	})
```
- 使用map进行参数解析
通过map可以 k/v 形式的参数，使用map解析请求需要注意的一点，如上述的参数类型存在多种则只能通过 `map[string]interface{}` 或者 `map[string]string` 这样的形式来处理否则参数解析将失败。
```go
    // GET http://localhost:8080/get?age=20&name=saber
    a.Get("/get", func(data map[string]string) {
		fmt.Println(data)
	}) 
```
- 通过结构体解析
Get也可以通过自定义结构体来接收参数，结构体的字段必须为可导出，即大写字母开头（结构体方式解析参数需要对应属性完整，否则可能存在初始化失败属性零值的bug）
```go
    type Get struct {
        Name string
        Age  int
    }
    // GET http://localhost:8080/get?age=20&name=saber
    a.Get("/get", func(data Get) {
		fmt.Println(data)
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

 RESTFul 可以直接通过参数列表获取，这源于RESTFul的优先级别高于 Get和Post，存在get或者post参数情况下只能把解析定义在 RESTFul参数之后

- 只有RESTFul 情况下，RESTFul参数类型需要和参数列表匹配，否则解析错误(字符串必须通过string解析)
```go
    //http://127.0.0.1:8080/get/1
    a.Get("/get/{id}", func(id int) {
		fmt.Println(id)
	})
```

- RESTFul和Get参数共存的情况, 会按照优先级依次解析
```go
    //http://127.0.0.1:8080/get/1?age=19
    a.Get("/get/{id}", func(id ,age int) {
		fmt.Println(id, " ", age)
	}) 
```
- RESTFul 也可以和Get参数一样通过map来解析

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

