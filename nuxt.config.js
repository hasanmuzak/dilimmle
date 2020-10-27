export default {

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'dilimmle',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href : 'https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'}
    ],
    script : [
      {src : 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js'}
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/index.scss'
  ],


  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src : '~/plugins/AtUi.js', ssr : false},
    {src : '~/plugins/Vuelidate.js'}
  ],


  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)


  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/auth/login', method: 'post', propertyName: 'token' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/auth/user', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
        // globalToken: true,
        // autoFetchUser: true
      }
    }
  },

  axios : {
    baseURL : 'https://dilimmle-backend.herokuapp.com'
  },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
