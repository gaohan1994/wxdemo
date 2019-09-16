import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import './index.less'
import '../home/index.less';
import { AtTabs, AtTabsPane } from 'taro-ui';

const cssprefix = 'ct-trade';

type PageStateProps = {
  userInfo: any;
}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {
  current: number;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps;

@connect(state => state.user)
class Statistic extends Component<IProps, PageState> {
  state = {
    current: 0,
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '交易统计'
  }

  componentWillReceiveProps () {
    
  }

  handleChange = (value: number) => {
    console.log('value: ', value);
    this.setState({current: value});
  }

  public changeDate = (type: 'day' | 'month') => {
    if (type === 'month') {
      Taro.showToast({
        icon: 'loading',
        title: '权限未开放'
      });
      return;
    }
    Taro.navigateTo({
      url: `/pages/trade/calendar?type=${type}`
    });
  }

  render () {
    const tabList = [
      {title: '日报'},
      {title: '月报'},
    ]
    return (
      <View className={`${cssprefix}-statistic`}>
        <AtTabs current={this.state.current} tabList={tabList} onClick={this.handleChange}>
          <AtTabsPane current={this.state.current} index={0}>
            <View className={`${cssprefix}-statistic-box`}>
              <View className="ct-home-card-content">
                <View className={`${cssprefix}-statistic-date`} onClick={() => this.changeDate('day')}>
                  <View className={`${cssprefix}-statistic-date-time ${cssprefix}-statistic-date-center`}>
                    <Text className={`${cssprefix}-time`}>2019年05月20日（昨天）</Text>
                  </View>
                  <View className={`${cssprefix}-statistic-date-icon ${cssprefix}-statistic-date-center`}>
                    <Image className={`${cssprefix}-statistic-date-icon-img`} src="http://net.huanmusic.com/wx/icon_calendar.png" />
                  </View>
                </View>
                <Text className="ct-home-card-content-title">共收到(元)</Text>
                <Text className="ct-home-card-content-number">99.99</Text>
              </View>
              <View className={`ct-home-card-buttons ${cssprefix}-statistic-buttons`}>
                <View 
                  className="ct-home-card-buttons-button border-right"
                  style={{padding: 0}}
                >
                  <Text className={`${cssprefix}-title`}>收款笔数</Text>
                  <Text className={`${cssprefix}-title ${cssprefix}-title-number`}>10</Text>
                </View>
                <View 
                  className="ct-home-card-buttons-button"
                  style={{padding: 0}}
                >
                  <Text className={`${cssprefix}-title`}>单笔均价</Text>
                  <Text className={`${cssprefix}-title ${cssprefix}-title-number`}>10.00</Text>
                </View>
              </View>
            </View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View className={`${cssprefix}-statistic-box`}>
              <View className="ct-home-card-content">
                <View className={`${cssprefix}-statistic-date`} onClick={() => this.changeDate('month')}>
                  <View className={`${cssprefix}-statistic-date-time ${cssprefix}-statistic-date-center`}>
                    <Text className={`${cssprefix}-time`}>2019年05月20日（昨天）</Text>
                  </View>
                  <View className={`${cssprefix}-statistic-date-icon ${cssprefix}-statistic-date-center`}>
                    <Image className={`${cssprefix}-statistic-date-icon-img`} src="http://net.huanmusic.com/wx/icon_calendar.png" />
                  </View>
                </View>
                <Text className="ct-home-card-content-title">共收到(元)</Text>
                <Text className="ct-home-card-content-number">99.99</Text>
              </View>
              <View className={`ct-home-card-buttons ${cssprefix}-statistic-buttons`}>
                <View 
                  className="ct-home-card-buttons-button border-right"
                  style={{padding: 0}}
                >
                  <Text className={`${cssprefix}-title`}>收款笔数</Text>
                  <Text className={`${cssprefix}-title ${cssprefix}-title-number`}>10</Text>
                </View>
                <View 
                  className="ct-home-card-buttons-button"
                  style={{padding: 0}}
                >
                  <Text className={`${cssprefix}-title`}>单笔均价</Text>
                  <Text className={`${cssprefix}-title ${cssprefix}-title-number`}>10.00</Text>
                </View>
              </View>
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    )
  }
}

export default Statistic;
