import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'
import { AtButton } from 'taro-ui';

type PageProps = {
  list: any[];
  type: string;
}

type PageState = {
  
}

const cssprefix = 'ct-inventory';
export default class WarnList extends Component<PageProps, PageState> {
  config = {
    navigationBarTitleText: '库存预警'
  }
  state = {

  }

  public onScrollToUpper = () => {

  }

  public productEdit = (item: any) => {
    Taro.navigateTo({
      url: `/pages/manage/product/edit?item=${JSON.stringify(item)}&type=inventory`
    });
  }

  render () {
    const list = new Array(2).fill({}).map((_, index) => {
      return {
        id: index + 1,
        name: '香芋甜心（面包）',
        price: '3.00',
        qrcode: '1034789456',
        inventory: 10,
      };
    })
    return (
      <View className={`${cssprefix}`}>
        {list.map((item, index) => {
          return (
            <View 
              key={item.id} 
              className={`${cssprefix}-item ${index + 1 < list.length ? `${cssprefix}-item-border` : ''}`}
            >
              <Text className={`${cssprefix}-name`}>商品名称：{item.name}</Text>
              <Text className={`${cssprefix}-font ct-mar-t-20`}>条码：{item.qrcode}</Text>
              <Text className={`${cssprefix}-font ${cssprefix}-font-number ct-mar-t-40`}>可用库存：{item.inventory}</Text>

              <AtButton
                type='secondary'
                size="small"
                className={`${cssprefix}-item-button`}
                onClick={() => this.productEdit(item)}
              >
                库存调整 
              </AtButton>
            </View>
          )
        })}
      </View>
    )
  }
}
