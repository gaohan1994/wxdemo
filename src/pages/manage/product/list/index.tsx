import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.less'
import { AtButton } from 'taro-ui';

type PageProps = {
  list: any[];
}

type PageState = {
  
}
export default class List extends Component<PageProps, PageState> {
  state = {

  }

  public onScrollToUpper = () => {

  }

  public productEdit = (item: any) => {
    Taro.navigateTo({
      url: `/pages/manage/product/edit?item=${JSON.stringify(item)}`
    });
  }

  render () {
    const { list } = this.props;
    return (
      <View className='ct-product-list'>
        <View className="ct-product-list-type">
          <Text className="ct-product-list-title">冠军面包</Text>
        </View>
        {list && list.length > 0 ? list.map((item, index: number) => {
          return (
            <View 
              key={item.id} 
              className={`ct-product-list-item ${index + 1 !== list.length ? 'ct-product-list-item-border' : ''}`}
            >
              <Text className="ct-product-list-name" >{item.name}</Text>
              <Text className="ct-product-list-font ct-product-list-margin" >条码:{item.qrcode}</Text>
              <View className="ct-product-list-item-row ct-product-list-margin-row" >
                <Image src="http://net.huanmusic.com/wx/icon_inventory.png" className="ct-product-list-item-row-img" />
                <Text className="ct-product-list-detail" >{`可用库存: ${item.inventory}`}</Text>
              </View>
              <View className="ct-product-list-item-row ct-product-list-margin" >
                <Image src="http://net.huanmusic.com/wx/icon_seli.png" className="ct-product-list-item-row-img" />
                <Text className="ct-product-list-detail" >{`商品售价: ${item.price}`}</Text>
              </View>

              <View
                onClick={() => this.productEdit(item)}
                className="ct-product-list-item-button"
              >
                <Text className="ct-product-list-detail ct-product-list-detail-edit">编辑</Text>
              </View>
            </View>
          )
        }) : (
          <View/>
        )}
      </View>
    )
  }
}
