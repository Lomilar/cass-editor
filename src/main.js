import Vue from 'vue';
import App from './App.vue';
import './../node_modules/bulma/css/bulma.css';
import router from './router';
import store from './lode/store';
require("cassproject");
Vue.use(require('vue-moment'));

EcRepository.caching = true;
window.repo = new EcRepository();
window.repo.selectedServer = "https://dev.cassproject.org/api/";

global.jsonld = require('jsonld');

Vue.config.productionTip = false;
// Vue.config.silent = true;
Vue.config.warnHandler = function(msg, vm, trace) {
    if (msg === 'Invalid prop: type check failed for prop "clickToLoad". Expected Boolean, got String with value "true".') return;
    if (msg === 'Avoid using non-primitive value as key, use string/number value instead.') return;
    if (msg === "Duplicate keys detected: '[object Object]'. This may cause an update error.") return;
    console.error(("[Vue warn]: " + msg + trace));
    // `trace` is the component hierarchy trace
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
