const { name, description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#base
   */
  base: process.env.NODE_ENV === 'production' ? `/${name}/` : '/',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: name.split('-').join(' '),
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#dest
   */
  dest: 'dist',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Whether to show line numbers to the left of each code blocks.
   * 
   * ref: https://v1.vuepress.vuejs.org/config/#markdown-linenumbers
   */
  markdown: {
    lineNumbers: true
  },

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
      {
        text: 'Tags',
        link: '/tag/',
      },
      {
        text: 'Indicators',
        link: '/indicators.html',
      },
      {
        text: 'VuePress',
        link: 'https://v1.vuepress.vuejs.org'
      }
    ],
    footer: {
      contact: [
        {
          type: "gift",
          link: "https://a.webull.com/TfjteFx13oyvRL6SfX",
          title: "Join me on Webull",
        }
      ]
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/search',
    '@vuepress/plugin-back-to-top',
    [
      '@vuepress/medium-zoom',
      {
        selector: '.content__default :not(a) > img',
      }
    ],
    [
      '@vuepress/blog',
      {
        directories: [
          {
            id: 'post',
            dirname: 'posts',
            path: '/',
          }
        ],
        frontmatters: [
          {
            id: 'tag',
            keys: [
              'tag',
              'tags'
            ],
            path: '/tag/',
          },
        ],
        globalPagination: {
          lengthPerPage: 5,
        },
      }
    ]
  ],
}
