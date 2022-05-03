---
search: false
---
# 配置文件

## 配置文件格式
只支持yml格式的配置文件，默认读取名为application的yml配置文件
## 存放位置
application.yml文件的位置可以再项目内任意文件夹下.
::: warning
需要注意的是，加载application.yml的机制是从根目录开始，一旦加载将不在继续查找，即使项目中存在多个相同的配置文件也不会影响正常启动。
:::
## 能够做什么？

### 通过api读取配置
通过 ```aurora.Web``` 可以获取配置文件中的配置属性:
```go
func main(){
    conf:=aurora.Web.GetConfig()
    conf.Get("xxx.xx")
}
```

### 自动读取配置
#### application.yml
```yml
aurora:
  serve:
    port: 8088
  database:
    user: root
    password: qwertyuio
    host: xx.xx.xx.xx:3306
    db: test
    driver: gorm.mysql
```
#### 服务器:
```go
type DbInfo struct {
	User     string
	Password string
	Host     string
	Db       string
	Driver   string
}

type Web struct {
	*aurora.Aurora
	Database DbInfo   `value:"aurora.database"`
}
```
