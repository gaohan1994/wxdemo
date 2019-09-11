import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';
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

interface Detail {
  props: IProps;
}

@connect(state => state.user)
class Detail extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '交易信息'
  }

  componentWillReceiveProps () {
    
  }

  render () {
    return (
      <View className='ct-trade'>
        <View className="ct-trade-card">
          <View className="ct-trade-card-content">
            <Text className="ct-trade-title ">交易金额(元)</Text>
            <Text className="ct-trade-number ct-trade-card-content-margin">66.66</Text>
          </View>
        </View>
        <View className="ct-trade-card">
          <View className="ct-trade-card-item">
            <Text className="ct-trade-font">交易状态</Text>
            <Text className="ct-trade-font ct-trade-font-black">收款成功</Text>
          </View>
          <View className="ct-trade-card-item">
            <Text className="ct-trade-font">收款时间</Text>
            <Text className="ct-trade-font ct-trade-font-black">2019-05-20 21:20:59</Text>
          </View>
          <View className="ct-trade-card-item ct-trade-card-border">
            <Text className="ct-trade-font">订单金额</Text>
            <Text className="ct-trade-font ct-trade-font-black">66.66</Text>
          </View>
          <View className="ct-trade-card-item">
            <Text className="ct-trade-font">付款方式</Text>
            <Text className="ct-trade-font ct-trade-font-black">微信</Text>
          </View>
          <View className="ct-trade-card-item">
            <Text className="ct-trade-font">付款人</Text>
            <Text className="ct-trade-font ct-trade-font-black">centerm</Text>
          </View>
          <View className="ct-trade-card-item">
            <Text className="ct-trade-font">交易门店</Text>
            <Text className="ct-trade-font ct-trade-font-black">升腾小铺</Text>
          </View>
          <View className="ct-trade-card-item">
            <Text className="ct-trade-font">收款流水号</Text>
            <Text className="ct-trade-font ct-trade-font-black">升腾小铺</Text>
          </View>
        </View>
        <View className="ct-trade-card">
          <View className="ct-trade-card-item ct-trade-card-border">
            <Text className="ct-trade-font ct-trade-font-black">交易说明</Text>
          </View>
          <View className="ct-trade-card-item">
            <Text className="ct-trade-font">晨光签字笔</Text>
            <View className="ct-trade-card-item-detail">
              <Text className="ct-trade-card-item-detail-number ct-trade-font ct-trade-font-black">X1</Text>
              <Text className="ct-trade-card-item-detail-price ct-trade-font ct-trade-font-black">￥1.00</Text>
            </View>
          </View>
          <View className="ct-trade-card-item">
            <Text className="ct-trade-font">伊利原味酸奶</Text>
            <View className="ct-trade-card-item-detail">
              <Text className="ct-trade-card-item-detail-number ct-trade-font ct-trade-font-black">X1</Text>
              <Text className="ct-trade-card-item-detail-price ct-trade-font ct-trade-font-black">￥3.50</Text>
            </View>
          </View>
          <View className="ct-trade-card-item">
            <Text className="ct-trade-font">可乐听装</Text>
            <View className="ct-trade-card-item-detail">
              <Text className="ct-trade-card-item-detail-number ct-trade-font ct-trade-font-black">X1</Text>
              <Text className="ct-trade-card-item-detail-price ct-trade-font ct-trade-font-black">￥3.00</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Detail as ComponentClass<PageOwnProps, PageState>
