// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

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
        { src: "widjet.js",  async: true, },
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
