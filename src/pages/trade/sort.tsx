
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Picker, PickerView, PickerViewColumn } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import "./index.less";
import "../manage/index.less";
import "../trade/history-item/index.less";

const cssPrefix = 'ct-history-item';

class Sort extends Component<any, any> {
  constructor () {
    super(...arguments);
    const date = new Date();
    const years: any[] = [];
    const months: any[] = [];
    const days: any[] = [];
    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i)
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i)
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i)
    }
    this.state = {
      years: years,
      year: date.getFullYear(),
      months: months,
      month: 2,
      days: days,
      day: 2,
      value: [9999, 1, 1],

      date: '2019-01-01',
      endDate: '2019-01-01',
    }
  }

  config: Config = {
    navigationBarTitleText: '筛选'
  }

  public onSort = () => {
    Taro.navigateBack({});
  }

  public onChange = e => {
    const val = e.detail.value
    // this.setState({
    //   year: this.state.years[val[0]],
    //   month: this.state.months[val[1]],
    //   day: this.state.days[val[2]],
    //   value: val
    // })
  }

  onDateChange = e => {
    this.setState({
      date: e.detail.value
    })
  }

  onEndDateChange = e => {
    this.setState({
      endDate: e.detail.value
    })
  }

  render () {
    return (
      <View className={`ct-trade-container`}>
        <View className={`${cssPrefix}-content`}>
          <Picker 
            mode="date" 
            start="2000-01-01" 
            end="2019-01-01" 
            value={this.state.date}
            onChange={this.onDateChange}
          >
            <View className={`${cssPrefix}-content-item ct-user-detail-border`}>
              <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>开始时间</Text>
              <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>{this.state.date}</Text>
            </View>
          </Picker>
          
          <Picker 
            mode="date" 
            start="2000-01-01" 
            end="2019-01-01" 
            onChange={this.onEndDateChange}
            value={this.state.endDate}
          >
            <View className={`${cssPrefix}-content-item ct-user-detail-border`}>
              <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>结束时间</Text>
              <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>{this.state.endDate}</Text>
            </View>
          </Picker>
          
        </View>

        <View className="ct-button-container ct-manage-staff-add" >
          <AtButton
            type="primary"
            className="ct-button"
            onClick={this.onSort}
          >
            查询
          </AtButton>
        </View>

        

        {/* <PickerView indicatorStyle='height: 50px;' style='width: 100%; height: 300px;' value={this.state.value} onChange={this.onChange}>
          <PickerViewColumn>
            {this.state.years.map(item => {
              return (
                <View>{item}年</View>
              );
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {this.state.months.map(item => {
              return (
                <View>{item}月</View>
              )
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {this.state.days.map(item => {
              return (
                <View>{item}日</View>
              )
            })}
          </PickerViewColumn>
        </PickerView> */}
      </View>
    );
  }
}

export default Sort;