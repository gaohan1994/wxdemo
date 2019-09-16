import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import './index.less'
import HistoryItem from './history-item';
import * as actions from '../../actions/trade';
import { getWindowHeight } from '../../utils/style';

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
  tradeHistory: any[];
}

type PageDispatchProps = {
  fetchTradeHistory: (field: any) => void;
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface History {
  props: IProps;
}

@connect(state => state.trade, actions)
class History extends Component {

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

  state = {
    page: 1,
    loading: false,
  }

  componentWillReceiveProps () {
    
  }

  async componentDidShow () {
    await this.changePage(1);
    this.props.fetchTradeHistory({page: this.state.page});
  }

  public changePage = (page: number) => {
    return this.setState({page});
  }

  public changeLoading = (loading: boolean) => {
    return this.setState({ loading });
  }

  public fetchData = async () => {
    Taro.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    });
    if (this.state.loading === true) {
      return;
    }
    this.changeLoading(true);
    await this.props.fetchTradeHistory({page: this.state.page});
    this.changeLoading(false);
    this.changePage(this.state.page + 1);
  }

  public onScrollToLower = () => {
    console.log('onScrollToLower: ');
    this.fetchData();
  }

  render () {
    const { tradeHistory } = this.props;
    return (
      <View className="ct-trade">
        <ScrollView
          scrollY={true}
          onScrollToLower={this.onScrollToLower}
          style={{ height: getWindowHeight() }}
        >
          {tradeHistory && tradeHistory.length > 0 ? tradeHistory.map((historyItem: any, index: number) => {
            return <HistoryItem item={historyItem} key={historyItem.totalMoney} itemNumber={index} />
          }) : (
            <Text>暂无交易记录</Text>
          )}
        </ScrollView>
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

export default History as ComponentClass<PageOwnProps, PageState>
