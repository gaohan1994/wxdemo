import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { AtGrid } from 'taro-ui';

import './index.less';
import '../home/index.less';

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

interface Manage {
  props: IProps;
}

@connect(state => state.user)
class Manage extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '进销存管理'
  }

  componentWillReceiveProps () { }

  componentDidMount () { }

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
      case '商品管理': {
        this.navigateTo('manage/product/list');
        return;
      }
      case '库存预警': {
        this.navigateTo('manage/inventory/warn-list');
        return;
      }
      case '库存调整': {
        this.navigateTo('manage/product/list?type=inventory');
        return;
      }
      case '商品调价': {
        this.navigateTo('manage/product/list?type=price');
        return;
      }
      default: {
        Taro.showToast({
          icon: 'loading',
          title: '权限未开放'
        })
        return;
      }
    }
  }

  render () {
    return (
      <View className='ct-manage'>
        <View className="ct-home-bg" />
        <View className='ct-home-card'>
          <AtGrid 
            hasBorder={false}
            data={[
              {
                image: 'http://net.huanmusic.com/wx/icon_pirchase_admin.png',
                value: '商品管理',
              },
              {
                image: 'http://net.huanmusic.com/wx/icon_pirchase_early.png',
                value: '库存预警'
              },
              {
                image: 'http://net.huanmusic.com/wx/icon_pirchase_price.png',
                value: '商品调价'
              },
              {
                image: 'http://net.huanmusic.com/wx/icon_pirchase_adjust.png',
                value: '库存调整'
              },
              {
                image: 'http://net.huanmusic.com/wx/icon_pirchase_check.png',
                value: '库存盘点'
              }
            ]} 
            onClick={this.onNavClick}
          />
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default Manage as ComponentClass<PageOwnProps, PageState>
