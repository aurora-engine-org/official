# 静态资源
在前面的返回值解析部分已经提到过相关点，Aurora默认的静态资源解析是项目根路径，想要修改默认的解析路径需要通过配置文件application.yml进行配置。
在项目中创建一个application.yml文件，写入一下配置:
```yaml
aurora:
  resource: #path#
```