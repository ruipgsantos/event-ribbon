import ribbon from "./Ribbon.vue"

/*let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}*/

//ribbon.install = install;

const eventribbon = {
  install(Vue, options) {
    if (install.installed) return;
    install.installed = true;
    Vue.component("v-ribbon", ribbon);
    Vue.use(options.router)
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(eventribbon);
}

export default eventribbon