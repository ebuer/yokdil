// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle';

// Import Framework7 Vue
import Framework7Vue from 'framework7-vue';

// Import F7 Style
import Framework7CSS from 'framework7/css/framework7.bundle.min.css';

// Import F7 iOS Icons
import Framework7Icons from 'framework7-icons/css/framework7-icons.css';

// Import Material Icons
import MaterialIcons from 'material-design-icons/iconfont/material-icons.css';

// Import Fontawesome Theme Styles
import FontAwesome from '@fortawesome/fontawesome-free/css/all.min.css';

// Import fastClick
import FastClick from 'fastclick';

// Import App Custom Styles
// import AppStyles from './assets/sass/main.scss'

// Import App Component
import app from './main.vue';


// Import Vuex Storage
import store from './assets/vuex/storage.js';


// Different F7-Vue plugin initialization with f7 v3.0
Framework7.use(Framework7Vue);

window.local = {
  set: function (name, value) {
    window.localStorage.setItem(name, value);
  },
  get: function (name) {
    return window.localStorage.getItem(name);
  },
  remove: function (name) {
    window.localStorage.removeItem(name);
  },
  clear: function () {
    localStorage.clear();
  },
};



let localstorage = local.get('app');
if (localstorage === null || localstorage === undefined || localstorage === '') {
  Framework7.request.get('http://yakakartim.net/api/OyunYokdil/info.php', function (data) {

    // create starter object

    let starterObject = {
      info: {
        questionsCount: 0,
        trueQuestionsCount: 0,
        falseQuestionsCount: 0,
        falseQuestions: [],
      },
      idList: [],
      darkmode:false,
      levelList: {}

    };

    // create levels object settings

    let result = JSON.parse(data).results;
    let keys = Object.keys(result)

    const getLevelsArray = function (numb, limit) {
      let array = []
      let s = limit
      let levels = 0
      let first = true;

      for (let i = 0; i <= numb; i++) {

        if (i === s) {

          let isOpen = false
          if(first){
            isOpen = true;
            first = false;
          }



          levels++
          s = s + limit

          array.push({
            level: levels,
            numb: limit,
            count:0,
            percent:'0%',
            trueQuestionsCount:0,
            falseQuestionsCount:0,
            currentLevel:false,
            isOpen:isOpen,
          });
        }

        if (i === numb) {
          let u = numb - (s - limit)
          levels++

          array.push({
            level: levels,
            numb: u,
            count:0,
            percent:'0%',
            trueQuestionsCount:0,
            falseQuestionsCount:0,
            currentLevel:false,
            isOpen:false,
          });

        }
      }

      return array;
    }

    keys.forEach(function (item) {

      let obj = {
        name: item,
        count: result[item],
        levels: getLevelsArray(result[item], 1000),
        questionNumb: 0,
        percent: '0%',
      };

      starterObject.levelList[item] =obj;

    });

    //  end level object setting

    //  set localstorage
    local.set('app', JSON.stringify(starterObject));
    location.reload();
    // Framework7.view.main.router.refreshPage();

  });


}// endif localstorage


// Init Vue App
export default new Vue({
  // Root Element
  el: '#app',
  store,
  render: c => c('app'),
  components: {
    app
  },
  pushState: true,
  mounted() {
    window.addEventListener('load', () => {
      // run after everything is in-place
      FastClick.attach(document.body);
    });
  },
});
