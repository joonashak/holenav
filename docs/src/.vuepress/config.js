module.exports = {
  title: "Holenav Documentation [WIP]",
  description:
    "Holenav is an open-source wormhole mapper for EVE Online players.",
  dest: "build",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "joonashak/holenav",
    editLinks: true,
    docsDir: "docs/src",
    docsBranch: "main",
    lastUpdated: true,
    nav: [
      {
        text: "Hosting",
        link: "/hosting/",
      },
      {
        text: "Developing",
        link: "/developing/",
      },
    ],
    sidebar: [
      "/introduction",
      {
        title: "Hosting",
        path: "/hosting",
        sidebarDepth: 2,
        children: [
          "/hosting/requirements",
          "/hosting/updates",
          {
            title: "Guides",
            path: "/hosting/guides",
            children: ["/hosting/guides/guide-vps-cdn-cd"],
          },
        ],
      },
      {
        title: "Developing",
        path: "/developing",
        sidebarDepth: 2,
        children: [
          "/developing/development-environment",
          "/developing/command-reference",
          "/developing/database",
          "/developing/roles",
        ],
      },
    ],
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: ["@vuepress/plugin-back-to-top", "@vuepress/plugin-medium-zoom"],
};
