# [Sgmodule Argument Proxy](https://sgmodule-argument-proxy.vercel.app)

用于需要修改 argument 的 sgmodule 模版，无需 fork 修改，直接通过配置即可生成对应的 sgmodule URL

[立即使用](https://sgmodule-argument-proxy.vercel.app)

## 示例

https://raw.githubusercontent.com/baranwang/Surge-Resources/master/Modules/SubInfoPanel/SubInfoPanel.sgmodule

原 sgmodule 模版内容为

```properties
#!name=Sub Info Panel
#!desc=build argument use sgmodule-argument-proxy.vercel.app

[Script]
Sub_info = type=generic,timeout=10,script-path=https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%204/Script/sub_info_panel.js,script-update-interval=0,argument=url=[URL encode 后的机场节点链接]&reset_day=1&title=AmyInfo&icon=bonjour&color=#007aff

[Panel]
Sub_info = script-name=Sub_info,update-interval=600
```

使用转换工具配置 argument

```
url=https%3A%2F%2Fdler.cloud%2Fsubscribe%2Ffoobar&reset_day=1&title=Dlercloud&icon=network&color=#1473e6
```

生成 sgmodule 链接为

```
https://sgmodule-argument-proxy.vercel.app/api/temp?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbaranwang%2FSurge-Resources%2Fmaster%2FModules%2FSubInfoPanel%2FSubInfoPanel.sgmodule&arg=url%3Dhttps%253A%252F%252Fdler.cloud%252Fsubscribe%252Ffoobar%26reset_day%3D1%26title%3DDlercloud%26icon%3Dnetwork%26color%3D%231473e6
```

输出内容为

```properties
#!name=Sub Info Panel
#!desc=build argument use sgmodule-argument-proxy.vercel.app

[Script]
Sub_info = type=generic, timeout=10, script-path=https://raw.githubusercontent.com/lhie1/Rules/master/Surge/Surge%204/Script/sub_info_panel.js, script-update-interval=0, argument=url=https%3A%2F%2Fdler.cloud%2Fsubscribe%2Ffoobar&reset_day=1&title=Dlercloud&icon=network&color=#1473e6

[Panel]
Sub_info = script-name=Sub_info,update-interval=600
```

## 声明

**纯字符串处理，不储存任何数据** 不放心可自行 [fork](https://github.com/baranwang/sgmodule-argument-proxy/fork?fragment=1) 本仓库搭建
