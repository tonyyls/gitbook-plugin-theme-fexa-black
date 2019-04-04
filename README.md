# Gitbook theme

![Image](https://github.com/tonyyls/gitbook-plugin-theme-fexa-black/blob/master/preview.png)

## Usage

Add the theme to your book's configuration `book.json` or `book.js`:

```js
{
    "plugins": [
        "theme-fexa-black"
    ],
    "variables": {
        "themeFexa":{
            "showHome": false, //是否显示 home 图标，默认显示
            "nav":[
                {
                    "url":"http://...",
                    "target":"_blank",
                    "name": "解决方案"
                },
                {
                    "url":"http://...",
                    "target":"_blank",
                    "name": "产品中心"
                },
                {
                    "url":"http://...",
                    "target":"_blank",
                    "name": "开发者文档"
                },
                {
                    "url":"http://...",
                    "target":"_blank",
                    "name": "管理控制台",
                    "border": "nav-border",
                    "type": "console" //跳转控制台用，非通用属性
                }
            ]
        },
    },
    "pluginsConfig": {
        "theme-fexa":{
            "search-placeholder":"输入关键字搜索", //搜索框提示信息
            "logo":"./assets/logo.png", //logo地址
            "favicon": "./assets/favicon.ico" //ico地址
        }
    }
},
```

Install by command:

``` bash
gitbook install
```

## Recommand plugins

```js
plugins: [
    '-sharing',
    "-fontsettings",
    'back-to-top-button',
    "copy-code-button",
    "cuav-chapters",
    "heading-anchors",
    "theme-fexa-black",
    "lightbox"
    //...
]
```


Enjoy!