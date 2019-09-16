import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { AtGrid } from 'taro-ui';

import './index.less'

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  userInfo: any;
}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Home {
  props: IProps;
}

@connect(state => state.user)
class Home extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps () {
    
  }

  componentDidMount () {
    if (!this.props.userInfo.username) {
      // Taro.navigateTo({url: '/pages/user/login'});
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  public navigateTo = (url: string) => {
    Taro.navigateTo({
      url: `/pages/${url}`
    })
  }

  public onNavClick = (item: any) => {
    switch (item.value) {
      case '店员管理': {
        this.navigateTo('manage/staff');
        return;
      }
      case '进销存管理': {
        this.navigateTo('manage/manage');
        return;
      }
      default: {
        Taro.showToast({
          icon: 'loading',
          title: '权限未开放',
        });
        return;
      }
    }
  }

  render () {
    return (
      <View className='ct-home'>
        <View className="ct-home-bg" />
        <View className="ct-home-card">
          <View className="ct-home-card-content">
            <Text className="ct-home-card-content-title">今日收款（元）</Text>
            <Text className="ct-home-card-content-number">99.99</Text>
            <Text className="ct-home-card-content-subtitle">收款共10笔</Text>
          </View>
          <View className="ct-home-card-buttons ct-home-card-buttons-radius">
            <View 
              onClick={() => this.navigateTo('trade/history')}
              className="ct-home-card-buttons-button border-right"
            >
              <Image src="http://net.huanmusic.com/wx/icon_record.png" className="ct-home-card-buttons-button-img" />
              <Text className="ct-home-card-content-subtitle ">交易记录</Text>
            </View>
            <View 
              onClick={() => this.navigateTo('trade/statistic')}
              className="ct-home-card-buttons-button"
            >
              <Image src="http://net.huanmusic.com/wx/icon_revenue.png" className="ct-home-card-buttons-button-img" />
              <Text className="ct-home-card-content-subtitle ">收入统计</Text>
            </View>
          </View>
        </View>

        <View className="ct-home-container">
          <AtGrid 
            hasBorder={false}
            data={[
              {
                image: 'http://net.huanmusic.com/wx/icon_menu_clerk.png',
                value: '店员管理',
              },
              {
                image: 'http://net.huanmusic.com/wx/icon_menu_purchase.png',
                value: '进销存管理'
              },
              {
                image: 'http://net.huanmusic.com/wx/icon_menu_sales.png',
                value: '销量统计'
              },
              {
                image: 'http://net.huanmusic.com/wx/icon_menu_promotion.png',
                value: '满减促销'
              },
              {
                image: 'http://net.huanmusic.com/wx/icon_menu_flow.png',
                value: '流量查询'
              },
              {
                image: 'http://net.huanmusic.com/wx/icon_menu_all.png',
                value: '全部'
              }
            ]} 
            onClick={this.onNavClick}
          />
        </View>
        
      </View>
    )
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>
