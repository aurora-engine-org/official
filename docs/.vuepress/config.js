module.exports = {
    title: 'Aurora',

    //主题 设置
    themeConfig:{
        //仓库配置
        repo: '/aurora-go/aurora',
        //仓库分支
        docsBranch: 'master',
        //README 侧边导航配置
        sidebar: {
            title: '开始',
            '/start/':[
                '',
                'register',
                'analysis',
                'result',
                'static',
                'catch',
                'component',
                'config',
                'project',
            ],
        },
        nav: [
            {
                text: '文档',
                items: [
                    { text: '教程', link: '/start/' },
                ]
            },
            {
                text: '生态系统',
                items: [
                    { text: '加入组织', link: '/org/' },
                ]
            },
            {
                text: '多语言',
                items: [
                    { text: 'English', link: '/en/' }
                ]
            }
        ]
    },
}