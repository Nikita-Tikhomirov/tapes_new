// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },

  ssr: false,

  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'css/bootstrap.min.css' },
        { rel: 'stylesheet', href: 'css/fonts.css' },
        { rel: 'stylesheet', href: 'css/icons.css' },
        { rel: 'stylesheet', href: 'css/style.css' },
        { rel: 'stylesheet', href: 'css/responsive.css' },
        { rel: 'stylesheet', href: 'css/custom.css' }
      ],
      script: [
        // { src: "widjet.js",  async: true, },
        { src: "https://cdn.jsdelivr.net/npm/@cdek-it/widget@3.10.4/dist/cdek-widget.umd.min.js" },
      ],
    },
  },
  
  typescript: {
    strict: true,
    shim: false,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler'
      },
    },
  }
})
