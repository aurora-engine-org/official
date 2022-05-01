---
search: false
prev: null
next: ./analysis
---

# 开始

## 介绍

## 快速上手

### Go Version

```text
go 1.18
```

::: warning
需要 golang 1.18 版本以上
:::

本节将带你使用Aurora快速搭建一个go web服务器

1. 获取依赖
   ```shell
   go get -u github.com/aurora-go/aurora
   ```
2. 导入依赖
   ```go
   import "github.com/aurora-go/aurora"
   ```
3. 使用 aurora.Web <br>
   aurora 提供了一个默认实例，直接使用这个实例或者，匿名嵌入该实例来完成web服务器的开发
   1. 内嵌使用
      1. 自定义一个服务器
         ```go
         type Web struct {
           *aurora.Aurora
         }
         ```
      2. 定义一个处理函数
         ```go
         func Test() {
          /* do... */
         }
         ```
      3. 注册处理函数
         ```go
         web := Web{Aurora: aurora.Web}
         web.Get("/test", Test)
         ```
      4. 重写服务器启动
         ```go
         func (w *Web) Start(port interface{}) error {
            w.Use(w)
            return w.Guide(port)
          }
         ```
         ::: tip
         这里采用重写启动方法的用意是用于，把服务器本身作为一个处理器加载到容器中，以便初始化使用Ioc中的依赖项
         :::
      5. 访问接口 /test

