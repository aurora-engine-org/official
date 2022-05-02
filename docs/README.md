---
home: true
heroText: Aurora Web Framework
tagline: Golang Web
actionText: 快速上手 →
actionLink: /start/
features:
- title: 开箱即用
  details: 使用简单,无需繁琐配置,急速上手。
- title: 零断言
  details: 处理请求的接口，直接解析请求参数，无需断言进行参数转化。
footer: Copyright © 2021 滇ICP备2021008438号

search: false
---

``` go
package main

import (
	"fmt"
	"github.com/aurora-go/aurora"
)

func main() {
	web := aurora.Web
	web.Get("/test", func() {
		fmt.Println("test")
	})
	web.Guide(8088)
}
```
::: warning
aurora 需要 >= v0.3.7
:::