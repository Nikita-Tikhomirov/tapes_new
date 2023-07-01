// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: false },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'css/bootstrap.min.css' },
        { rel: 'stylesheet', href: 'css/nice-select.css' },
        { rel: 'stylesheet', href: 'css/style.css' },
        { rel: 'stylesheet', href: 'css/style-1.css' },
        { rel: 'stylesheet', href: 'css/responsive.css' },
        { rel: 'stylesheet', href: 'css/custom.css' }
      ]
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
