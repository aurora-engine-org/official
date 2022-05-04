---
search: false
---
# 静态资源

## 配置资源路径
在前面的返回值解析部分已经提到过相关点，Aurora默认的静态资源解析是项目根路径，想要修改默认的解析路径需要通过配置文件application.yml进行配置。
在项目中创建一个application.yml文件，写入一下配置:
```yaml
aurora:
  resource: #path#
```

## HTML解析
关于 HTML 的解析，它和其它静态资源解析的方式不太一样，在代码中通过返回一个 HTML 的根路径来实现对 HTML 文件进行视图响应。这个根路径是静态资源的根路径，默认的根路径和项目根路径相同。<br><br>
假设你有以下的项目结构:
```text
.
|——controller
|——services
|——doa
|——application.yml
|——static
| |——html
| |  |——index.html
```

application.yml
```yml
aurora:
  resource: static
```

代码中需要:
```go
a.Get("/index", func() string {
    return "/html/index.html"
})
```

## 其它资源
对于非 HTML 文件的加载也有着一个约定,主要是相对于 HTML 需要,在静态资源目录中相对 HTML 中能够正常引入的地方即可。
