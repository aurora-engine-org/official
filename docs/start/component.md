---
sidebarDepth: 5
search: false
---
# 组件管理
Aurora 内部实现对依赖的管理容器，在开发中把 中间件,第三方库,控制器, 都归纳到了组件这一部分

## 注册组件
Aurora 默认提供对MySQL的驱动支持，采用的就是组件形式，如下所示
```go
type Web struct {
	*aurora.Aurora
	// ref是依赖容器中的唯一id
	DB *sql.DB `ref:"go.mysql"`
}
// 定义一个处理函数
func (w *Web) Gets() int {
    //在业务中直接使用
	var num int
	query := w.DB.QueryRow("select count(*) from student")
	query.Scan(&num)
	return num
}

func main() {
	web := &Web{Aurora: aurora.Web}
	//把自己的处理函数 注册到Get请求上
	web.Get("/test", web.Gets)
	//启动服务器
	aurora.Run(web)
}
```

## 使用组件
通过 ```Use(...interface{})```可以对大部分的组件进行设置和替换
### 控制器组件
使用```Use(...interface{})``` 在快速开始阶段就出现过，把自身作为一个控制器组件加载，加载自身作为处理器的目的是为了使用依赖管理中的各种第三方库组件。
::: tip
使用控制器组件的一个要求，必须是指针结构体才行，其中的字段属性需要导出
:::
```go
web := &Web{Aurora: aurora.Web}
web.Use(web)
```

### 日志组件
Aurora 支持使用 logrus 和 zap 进行替换,也可以通过实现 ```aurora.Log```接口任意的使用其他日志。

#### aurora.Log
支持 ```logrus``` 和  ```zap```

#### 替换日志
```go
func main() {
	web := &Web{Aurora: aurora.Web}
	// 直接Use即可
	web.Use(Logs())
	aurora.Run(web)
}
.....
.....
func Logs() aurora.Log {
	l := logrus.New()
	l.SetFormatter(&logrus.TextFormatter{
		ForceColors:      true,
		TimestampFormat:  "2006-01-02 15:04:05",
		DisableTimestamp: true,
	})
	return l
}
```

### 中间件组件
在 ```Use()```中使用中间件，是一个全局的行为,注册的类型必须是 ```aurora.Middleware```.<br>
#### 创建一个中间件
```go
func TestMiddleware() aurora.Middleware {
	return func(ctx aurora.Ctx) bool {
		fmt.Println("test_middleware")
		return true
	}
}
```
#### 使用中间件
```go
func main() {
	web := aurora.Web
	web.Use(TestMiddleware())
	web.Get("/", func() {
		fmt.Println("/")
	})
	aurora.Run(web)
}
```

### 自定义组件
可以把开发者自己的实例交由 Aurora 的依赖管理容器，并且给该实例取id，此处的id在容器中必须唯一。Aurora 的依赖缓存机制原因在初始化容器之前并不能检查id的唯一性，开发者在使用期间需要自己检查这一方面
。

#### 测试
```go
type Web struct {
	*aurora.Aurora
	B *Bbb `ref:"b"`
}

func (w *Web) Index() string {
	fmt.Println(w.B)
	return "/index.html"
}

type Aaa struct {
	B *Bbb `ref:"b"`
}

type Bbb struct {
	C *Ccc `ref:"c"`
}

type Ccc struct {
	Next *Ccc `ref:"c"`
}

type Ddd struct {
	E Eee `ref:"e"`
}

type Eee struct {
	Name string
}

type Fff struct {
}
```
#### 全局方法注册组件
使用 `aurora.Use()` 注册
```go
func main() {
    //注册 一个id为c 和 一个id为b 的组件
	aurora.Use(aurora.Web, aurora.Component{
		"c": &Ccc{},
		"b": &Bbb{},
	})
	web := &Web{Aurora: aurora.Web}
	web.Get("/", web.Index)
	err := aurora.Run(web)
	if err != nil {
		web.Error(err.Error())
		return
	}
}
```

#### 实例方法注册组件

```go
func main() {
	web := &Web{Aurora: aurora.Web}
	//注册 一个id为c 和 一个id为b 的组件
	web.Use(aurora.Component{
		"c": &Ccc{},
		"b": &Bbb{},
	})
	web.Get("/", web.Index)
	err := aurora.Run(web)
	if err != nil {
		web.Error(err.Error())
		return
	}
}
```

::: warning
需要注意的一点，注册的类型和使用时候的类型需要一一对应，通常情况下都是使用指针的方式进行注册。自定义组件api 需要 >= v0.3.9
:::