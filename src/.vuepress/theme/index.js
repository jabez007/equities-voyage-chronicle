const path = require('path');
const removeMd = require('remove-markdown');

module.exports = themeConfig => {
  const config = {
    define: {
      THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
        ? themeConfig.paginationComponent
        : 'Pagination',
    },
    summary:
      typeof themeConfig.summary === 'boolean' ? themeConfig.summary : true,
    summaryLength:
      typeof themeConfig.summaryLength === 'number'
        ? themeConfig.summaryLength
        : 200,
    alias: {
      'fonts': path.resolve(__dirname, 'fonts'),
    },
    /**
     * Generate summary.
     */
    extendPageData(pageCtx) {
      const strippedContent = pageCtx._strippedContent
      if (!strippedContent) {
        return
      }
      if (config.summary) {
        pageCtx.summary =
          removeMd(
            strippedContent
              .trim()
              .replace(/^#+\s+(.*)/, '')
          )
          .replace(/(\r?\n)+/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim()
          .slice(0, config.summaryLength) + ' ...'
        pageCtx.frontmatter.description = pageCtx.summary
      }
      if (pageCtx.frontmatter.summary) {
        pageCtx.frontmatter.description = pageCtx.frontmatter.summary
      }
    },
  }

  return config
};
