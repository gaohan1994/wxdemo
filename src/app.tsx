import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Home from './pages/home/home'
import 'taro-ui/dist/style/index.scss';
import configStore from './store'

import './app.less'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/home',
      // 'pages/news/news',
      'pages/user/user',
      'pages/user/detail',
      'pages/user/login',
      'pages/user/device',
      'pages/user/set',
      'pages/user/change-pwd',

      'pages/trade/history',
      'pages/trade/statistic',
      'pages/trade/detail',
      'pages/trade/sort',
      'pages/trade/calendar',

      'pages/manage/staff',
      'pages/manage/staff-add',
      'pages/manage/staff-edit',
      'pages/manage/manage',
      'pages/manage/product/list',
      'pages/manage/product/edit',
      'pages/manage/product/add',
      'pages/manage/inventory/warn-list',
      'pages/manage/history',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#2eaaf8',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: "#ACACAC",
      selectedColor: "#2EAAF8",
      backgroundColor: "#ffffff",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/home/home",
        iconPath: "./assets/tab-bar/icon_nav_home.png",
        selectedIconPath: "./assets/tab-bar/icon_nav_home_xuan.png",
        text: "首页"
      }, {
        pagePath: "pages/user/user",
        iconPath: "./assets/tab-bar/icon_nav_user.png",
        selectedIconPath: "./assets/tab-bar/icon_nav_user_xuan.png",
        text: "个人中心"
      }]
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
