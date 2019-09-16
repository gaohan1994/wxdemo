import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import { AtCalendar } from 'taro-ui';
import './index.less'
import '../home/index.less';

type Props = {}
type State = {
  type: string;
}

class Calendar extends Component<Props, State> {
  config: Config = {
    navigationBarTitleText: '日历'
  }

  constructor (props: any) {
    super(props);
    const type = this.$router.params.type || '';
    this.state = {
      type
    }
  }
  public onDayClick = ({value}: any) => {
    Taro.showToast({
      icon: 'success',
      title: '切换日期成功'
    });
    setTimeout(() => {
      Taro.navigateBack({});
    }, 1000);
  }
  render () {
    return (
      <View className="ct-trade-calendar">
        <AtCalendar 
          onDayClick={this.onDayClick}
        />
      </View>
    )
  }
}

export default Calendar;