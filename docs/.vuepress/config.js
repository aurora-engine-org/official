module.exports = {
    title: 'Aurora',

    //主题 设置
    themeConfig:{
        //仓库配置
        repo: '/aurora-go/aurora',
        //仓库分支
        docsBranch: 'master',
        smoothScroll: true,
        //README 侧边导航配置
        sidebar: {
            title: '开始',
            '/start/':[
                '',
                'analysis',
                'result',
                'static',
                'catch',
                'config',
                'component',
            ],
        },
        nav: [
            { text: '首页', link: '/' },
            { text: '开始', link: '/start/' },
            {
                text: '语言',
                ariaLabel: 'Language Menu',
                items: [
                    { text: '中文', link: '/start/' },
                    { text: '英语', link: '/en/' }
                ]
            }
        ]
    },
}