import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.less'
import { AtInput, AtButton, AtModal } from 'taro-ui';
import * as actions from '../../../actions/manage';
import { connect } from '@tarojs/redux';

type PageStateProps = {
  userInfo: any;
}

type PageDispatchProps = {
  addStaff: (payload: any) => void;
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
type State = {
  name: string;
  qrcode: string;
  inventory: string;
  checkInventory: string;
  price: string;
  oriPrice: string;
  confirmOpen: boolean;
  type: string;
}
@connect(state => state.manage, actions)
class ProductList extends Component<IProps, State> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '编辑商品'
  }

  constructor (props: any) {
    super(props);
    const item = this.$router.params && this.$router.params.item && JSON.parse(this.$router.params.item) || {};
    const type = this.$router.params.type || '';
    this.state = {
      ...item,
      oriPrice: '1.00',
      changeCheckInventory: '',
      confirmOpen: false,
      type,
    }
  }

  componentWillReceiveProps () {
    
  }

  public componentDidShow = () => {
    const type = this.$router.params.type || '';

    if (type === 'inventory') {
      Taro.setNavigationBarTitle({title: '库存调整'});
    } else if (type === 'price') {
      Taro.setNavigationBarTitle({title: '商品调价'});
    }
  }

  public onScrollToUpper = () => {

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
  public changePrice = (value: string) => {
    console.log('value: ', value);
    this.setState({ price: value.replace('￥', '') });
  }
  public changeOriPrice = (value: string) => {
    console.log('value: ', value);
    this.setState({ oriPrice: value.replace('￥', '') });
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
  public changeCheckInventory = (value: string) => {
    this.setState({checkInventory: value});
  }
  public changeConfirmModal = (value: boolean) => {
    this.setState({ confirmOpen: value });
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
        {this.state.type === 'price' && (
          <View>
            <AtInput
              className="ct-input-price"
              name="price"
              title="现售价"
              value={`￥${this.state.price}`}
              onChange={this.changePrice}
            />
            <AtInput
              className="ct-input-price"
              name="price"
              title="调价为"
              value={`￥${this.state.oriPrice}`}
              onChange={this.changeOriPrice}
            />
          </View>
        )}

        {this.state.type !== 'price' && this.state.type !== 'inventory' && (
          <View>
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
              name="inventory"
              title="可用库存"
              value={this.state.inventory}
              onChange={this.changeInventory}
            />
            <AtInput
              name="changeCheckInventory"
              title="预警库存"
              value={'10'}
              // onChange={this.changeCheckInventory}
            />
          </View>
        )}

        {this.state.type === 'inventory' && (
          <View>
            <AtInput
              name="inventory"
              title="现库存"
              value={this.state.inventory}
              onChange={this.changeInventory}
            />
            <AtInput
              name="changeCheckInventory"
              title="调整为"
              value={'10'}
              // onChange={this.changeCheckInventory}
            />
          </View>
        )}
        

        <View className="ct-button-contaienr ct-product-button">
          <AtButton
            className="ct-button"
            type="primary"
            onClick={this.onConfirm}
          >
            保存
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
        <AtModal
          isOpened={this.state.confirmOpen}
          cancelText='取消'
          confirmText='确认'
          onClose={() => this.changeConfirmModal(false)}
          onCancel={() => this.changeConfirmModal(false)}
          onConfirm={ this.onConfirm }
          content='确认修改该商品吗'
        />
      </View>
    )
  }
}

export default ProductList;
