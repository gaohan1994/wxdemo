import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
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

const cssPrefix = 'ct-history-item';

type PageStateProps = {
  itemNumber: number;
  item: {
    id: string;
    totalNumber: number;
    totalMoney: number;
    trandeList: any[];
  }
}

type IProps = PageStateProps;

interface Index {
  props: IProps;
}

class Index extends Component {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '交易记录'
  }

  componentWillReceiveProps () {
    
  }

  public navigateToDetail = () => {
    Taro.navigateTo({
      url: `/pages/trade/detail?id=${this.props.item.id}`
    })
  }

  public onSort = () => {
    console.log('onSort');
  }

  render () {
    return (
      <View 
        className={`${cssPrefix}`}
      >
        <View className={`${cssPrefix}-title`}>
          {/* <Text className={`${cssPrefix}-font`}>2019年5月21日</Text> */}
          {this.props.itemNumber === 0 
            ? <Text className={`${cssPrefix}-font`}>2019年5月21日（今天）</Text>
            : <Text className={`${cssPrefix}-font`}>2019年5月21日</Text>}
          {this.props.itemNumber === 0 && (
            <View 
              className={`${cssPrefix}-title-sort`}
              onClick={this.onSort}
            >
              <Image src="http://net.huanmusic.com/wx/icon_shaixuan.png" className={`${cssPrefix}-title-img`} />
              <Text className={`${cssPrefix}-font ${cssPrefix}-font-sort`}>筛选</Text>
            </View>
          )}
        </View>

        <View className={`${cssPrefix}-content`}>
          <View className={`${cssPrefix}-content-item`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>
              {`交易笔数 ${this.props.item && this.props.item.totalNumber || 0}`}
            </Text>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>
              {`交易金额(元) ${this.props.item && this.props.item.totalMoney || `0.00`}`}
            </Text>
          </View>
          {this.props.item && this.props.item.trandeList && this.props.item.trandeList.length > 0 
            ? this.props.item.trandeList.map((listItem: any, index: number) => {
              return (
                <View 
                  key={`${listItem.id}-${index}`}
                  onClick={this.navigateToDetail}
                  className={`${cssPrefix}-content-item ${cssPrefix}-content-item-border`}
                >
                  <View className={`${cssPrefix}-content-item-left`}>
                    <Image 
                      src={listItem.way === 'wechat' ? 'http://net.huanmusic.com/wx/icon_wechat.png' : 'http://net.huanmusic.com/wx/icon_alipay.png'} 
                      className={`${cssPrefix}-content-item-img`} 
                    />
                    <View className={`${cssPrefix}-content-item-detail`}>
                      <Text className={`${cssPrefix}-font ${cssPrefix}-font-title`}>{listItem.type === 1 ? '收款' : '退款'}</Text>
                      <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>{listItem.time || Date.now()}</Text>
                    </View>
                  </View>
                  <Text 
                    className={`${cssPrefix}-number ${listItem.type === 1 ? `${cssPrefix}-number-red` : `${cssPrefix}-number-black`}`}
                  >
                    {listItem.type === 1 ? `${listItem.money}` : `-${listItem.money}`}
                  </Text>
                </View>
              )
            }) 
            : (
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>今日暂无交易记录</Text>
          )}
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

export default Index;
