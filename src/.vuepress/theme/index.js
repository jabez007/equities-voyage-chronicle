const path = require('path');

module.exports = themeConfig => {
  const config = {
    define: {
      THEME_BLOG_PAGINATION_COMPONENT: themeConfig.paginationComponent
        ? themeConfig.paginationComponent
        : 'Pagination',
    },
    alias: {
      'fonts': path.resolve(__dirname, 'fonts'),
    },
  }

  return config
};
