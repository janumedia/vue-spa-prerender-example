import {mapState} from 'vuex'
import axios from 'axios'
import Body from '@/components/body.vue'
import Extras from '@/components/extras.vue'

const getData = async ({path, params}) => {
  return new Promise(async (resolve, reject) => {
    path = path == "/" ? "/index" : path;
    if(path.slice(-1) == "/") path = path.substr(0, path.length - 1);
    try {
      let {data} = await axios.get(`/data/${path}.json`);
      document.title = data.title;
      resolve(data);
    } catch(e) {
      reject(e);
    }
  })
}

export default {
  components: {
    Body, Extras
  },
  data() {
    return {
      title: "",
      desc: "",
      body: null,
      extras: null
    }
  },
  methods: {
    setData(data) {
      Object.keys(data).map(key => this[key] = data[key])
    },
    resetData() {
      this.title = "";
      this.desc = "";
      this.body = null;
      this.extras = null;
    }
  },
  async beforeRouteUpdate(to, from, next) {
    this.resetData();//reset data allow data refresh
    try {
      window.scrollTo(0, 0);
      const data = await getData(to);
      this.setData(data);
      next();
    } catch(e) {
      next(e);
    }
  },
  async beforeRouteEnter (to, from, next) {
    try {
      const data = await getData(to);
      next(vm => vm.setData(data));
    } catch(e) {
      next(e);
    }
  }
}