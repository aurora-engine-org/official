---
home: true
heroText: Aurora Web Framework
tagline: Golang Web
actionText: 快速上手 →
actionLink: /start/
features:
- title: Ioc 加载
  details: Ioc容器对全局属性进行统一管理，运行期间按需进行依赖加载。
- title: 零断言
  details: 处理请求的接口，直接解析请求参数，无需断言进行参数转化。
footer: MIT Licensed | Copyright © 2018-present Evan You

search: false
---

#### 示例
``` go
package main

import (
	"fmt"
	"github.com/aurora-go/aurora"
)

type Web struct {
	*aurora.Aurora
}

func (w *Web) Start(port interface{}) error {
	w.Use(w)
	return w.Guide(port)
}

func main() {
	web := Web{Aurora: aurora.Web}
	web.Get("/test", func() {
		fmt.Println("test")
	})
	web.Start(8088)
}
```
::: warning
aurora 需要 >= v0.3.7
:::