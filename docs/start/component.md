---
sidebarDepth: 3
---
# 组件管理
Aurora 内部实现对依赖的管理容器，在开发中把 中间件,第三方库,控制器, 都归纳到了组件这一部分

## 注册组件
提供了一个api ```Component(string,Component)``` 向Aurora内的依赖管理容器添加属性,在控制器中可以使用tag对其进行引用。
```go
type Web struct {
	*aurora.Aurora
	// ref是通过 Component 方法注册到依赖容器中的唯一id
	DB *gorm.DB `ref:"gorm.mysql"`
}
// 定义一个处理函数
func (w *Web) Gets() int {
    //在业务中直接使用
	var num int
	w.DB.Raw("select count(*) from student").Scan(&num)
	return num
}

func main() {
	web := &Web{Aurora: aurora.Web}
	//把自己的处理函数 注册到Get请求上
	web.Get("/test", web.Gets)
	//启动服务器
	web.Start(8088)
}

func (w *Web) Start(port interface{}) error {
    // 把自己作为处理器使用，加载
	w.Use(w)
	return w.Guide(port)
}
```

## 使用组件
通过 ```Use(...Component)```可以对大部分的组件进行设置和替换
### 控制器组件
使用```Use(...Component)``` 在快速开始阶段就出现过，把自身作为一个控制器组件加载，加载自身作为处理器的目的是为了使用依赖管理中的各种第三方库组件。
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
```go
type Log interface {
	Info(...interface{})
	Error(...interface{})
	Debug( ...interface{})
	Panic( ...interface{})
	Warn( ...interface{})
}
```

#### 替换日志
```go
func main() {
	web := &Web{Aurora: aurora.Web}
	// 直接Use即可
	web.Use(Logs())
	web.Start(8088)
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
在 ```Use()```中使用中间件，是一个全局的行为.

### 自定义组件
在代码中直接调用 ```Component(string,Component)``` 完成注册。
::: warning
需要注意的一点，注册的类型和使用时候的类型需要一一对应，通常情况下都是使用指针的方式进行注册。
:::