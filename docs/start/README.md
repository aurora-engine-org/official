---
sidebarDepth: 5
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

### 获取依赖
   ```shell
   go get -u github.com/aurora-go/aurora@v0.4.0
   ```
### 导入依赖
   ```go
   import "github.com/aurora-go/aurora"
   ```
### 使用 aurora.Web <br>
   ```Aurora``` 提供了一个默认实例，直接使用这个实例或者，匿名嵌入该实例来完成web服务器的开发
   
#### 自定义一个服务器
   ```go
   type Web struct {
     *aurora.Aurora
   }
   ```
#### 定义一个处理函数
```go
func Test() {
   /* do... */
}
```
#### 注册处理函数
```go
web := &Web{Aurora: aurora.Web}
web.Get("/test", Test)
```
#### 启动服务器
```go
aurora.Run(web)
```
#### 访问接口 /test

#### 如何修改端口号
项目下面[创建application.yml](/start/config.html) 配置文件写入:
```yml
aurora:
  serve:
    port: 8088
```

#### tls
```yml
aurora:
  serve:
    port: xxxx
    tls:
      certFile: xx/xx/xxx.cert
      keyFile: xx/xxx/xxx.pem
```

