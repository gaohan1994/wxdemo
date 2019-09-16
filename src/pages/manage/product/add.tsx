import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'
import { AtInput, AtButton } from 'taro-ui';
import * as actions from '../../../actions/manage';
import { connect } from '@tarojs/redux';

type PageStateProps = {
  userInfo: any;
}

type PageDispatchProps = {
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
type State = {
  name: string;
  qrcode: string;
  inventory: string;
  dangerInventory: string;
  price: string;
  oriPrice: string;
}
@connect(state => state.manage, actions)
class ProductAdd extends Component<IProps, State> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '新增商品'
  }

  constructor (props: any) {
    super(props);
    this.state = {
      name: '',
      qrcode: '',
      oriPrice: '',
      inventory: '0',
      dangerInventory: '0',
      price: '0.00',
    }
  }

  public changeName = (value: string) => {
    this.setState({ name: value });
  }
  public changeQrcode = (value: string) => {
    this.setState({ qrcode: value });
  }
  public changeInventory = (value: string) => {
    this.setState({ inventory: value });
  }
  public changeDangerInventory = (value: string) => {
    this.setState({ dangerInventory: value });
  }
  public changePrice = (value: string) => {
    this.setState({ price: value.replace('￥', '') });
  }
  public changeOriPrice = (value: string) => {
    this.setState({ oriPrice: value.replace('￥', '') })
  }
  public onCancel = () => {
    Taro.navigateBack({});      
  }
  public onConfirm = () => {
    Taro.showToast({
      icon: 'success',
      title: '修改成功！',
      duration: 1000
    });

    setTimeout(() => {
      Taro.navigateBack({});      
    }, 1000);
  }

  render () {
    return (
      <View className='index'>
        <AtInput
          name="name"
          title="商品名称"
          value={this.state.name}
          onChange={this.changeName}
        />
        <AtInput
          name="qrcode"
          title="商品条码"
          value={this.state.qrcode}
          onChange={this.changeQrcode}
        >
            <Image src="http://net.huanmusic.com/wx/icon_code.png" className="ct-product-input-box-qrcode" />
        </AtInput>
        
        <AtInput
          className="ct-input-price"
          name="price"
          title="商品售价"
          value={`￥${this.state.price}`}
          onChange={this.changePrice}
        />
        <AtInput
          className="ct-input-price"
          name="price"
          title="进货价"
          value={`￥${this.state.oriPrice}`}
          onChange={this.changeOriPrice}
        />
        <AtInput
          className="ct-input-price"
          name="price"
          title="可用库存"
          value={this.state.inventory}
          onChange={this.changeInventory}
        />
        <AtInput
          className="ct-input-price"
          name="price"
          title="预警库存"
          value={this.state.dangerInventory}
          onChange={this.changeDangerInventory}
        />

        <View className="ct-button-contaienr ct-product-button">
          <AtButton
            className="ct-button"
            type="primary"
            onClick={this.onConfirm}
          >
            新增
          </AtButton>
        </View>
        <View className="ct-button-contaienr ct-product-button-cancel">
          <AtButton
            type="secondary"
            className="ct-sec-button"
            onClick={this.onCancel}
          >
            取消
          </AtButton>
        </View>
      </View>
    )
  }
}

export default ProductAdd;
