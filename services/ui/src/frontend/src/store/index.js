import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import auth from './modules/auth';
import ui from './modules/ui';
import drones from './modules/drones';
import farms from './modules/farms';
import grid from './modules/grid';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: { auth, ui, drones, farms, grid },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
