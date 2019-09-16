import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import './index.less';
import "../trade/history-item/index.less";
import * as actions from '../../actions/trade';
import { getWindowHeight } from '../../utils/style';

const cssPrefix = 'ct-history-item';

type PageStateProps = {

}

type PageDispatchProps = {

}

type PageOwnProps = {}

type PageState = {
  type: string;
  page: number;
  loading: boolean;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(state => state.trade, actions)
class History extends Component<IProps, PageState> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '调价记录'
  }

  constructor (props) {
    super(props);
    const type = this.$router.params.type || '';
    this.state = {
      type,
      page: 1,
      loading: false,
    }
  }
  componentWillReceiveProps () {
    
  }

  public componentDidShow = () => {
    if (this.$router.params.type === 'inventory') {
      Taro.setNavigationBarTitle({title: '库存纪录'});
    }
  }

  async componentDidMount () {

  }

  render () {
    const products = new Array(3).fill({}).map((_, index) => {
      return {
        id: index + 1,
        name: '香芋甜心（面包）',
        oldPrice: '10.00',
        price: '15.00',
        qrcode: '1034789456',
        time: '09:40:22',
        inventory: 10,
      }
    });
    const list = new Array(8).fill({}).map((_, index) => {
      return {
        id: index + 1,
        date: '2019年5月15日',
        data: products
      };
    })
    return (
      <View className="ct-trade">
        <ScrollView
          scrollY={true}
          style={{ height: getWindowHeight() }}
        >
          {list.map((item) => {
            return (
              <View key={item.id} className={`${cssPrefix}`}>
                <View className={`${cssPrefix}-title`}>
                  <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>{item.date}</Text>
                </View>
                {
                  item.data.map((dataItem, index) => {
                    return (
                      <View 
                        key={dataItem.id} 
                        className={`ct-manage-history-item  ${index + 1 < item.data.length ? 'ct-manage-history-item-border' : ''}`}
                      >
                        <View className='ct-manage-history-item-box'>
                          <Text  className='ct-manage-history-item-name'>{dataItem.name}</Text>
                          <Text  className='ct-manage-history-item-time'>{dataItem.time}</Text>
                        </View>
                        <View className='ct-manage-history-item-box ct-mar-t-20'>
                          <Text className='ct-manage-history-item-qrcode'>条码：{dataItem.qrcode}</Text>
                          {this.state.type === 'price' && (
                            <Text  className='ct-manage-history-item-number'>调价：{dataItem.oldPrice}-{dataItem.price}</Text>  
                          )}
                          {this.state.type === 'inventory' && (
                            <Text  className='ct-manage-history-item-number'>库存：{dataItem.inventory}-{dataItem.inventory + 5}</Text>
                          )}
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            )
          })}
        </ScrollView>
      </View>
    )
  }
}

export default History;
