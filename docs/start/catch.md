---
search: false
---
# 错误捕捉
## 为什么需要
为什么要设计错误捕捉器，开发中对于错误的处理是必不可少的。复杂的系统中每种情况的错误都应该有对应的处理方式， `error` 的分类定义和处理，能够有效的针对错误做出对应措施。提高系统的健壮性。
## 捕捉器如何工作
错误捕捉器，主要捕捉处理器返回值中的错误，对应的捕捉器将拿到具体错误交由开发者给调用接口的一方如何回应。
### 定义错误捕捉
定义错误，要满足go中的标准，实现`error`接口
::: warning
Aurora 中处理错误严格区分指针和非指针形式,实现错误接口的绑定方式需要对应
:::
```go
package main

import (
	"fmt"
	"github.com/aurora-go/aurora"
)

type MyError struct {
	msg string
}

func (e MyError) Error() string {
	return e.msg
}

func main() {
	a := aurora.Web
    
    //将捕获 接口返回的 MyError 类型错误
	a.Catch(func(myError MyError) string {
		fmt.Println(myError.Error())
		return myError.Error()
	})

	a.Get("/", func() MyError {
		//&MyError{msg: "my errors"}
		return MyError{msg: "my errors"}
	})

	aurora.Run(web)
}
```
