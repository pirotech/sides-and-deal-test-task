requirejs.config({
  baseUrl: '',
  paths: {
    Vue: 'bower_components/vue/dist/vue',
    axios: 'node_modules/axios/dist/axios.min'
  }
});

requirejs(['app']);
