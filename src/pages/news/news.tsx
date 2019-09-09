
import { ComponentClass } from 'react';
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import "./news.less";
import { getNews } from '../../reducers/store';

type PageStateProps = {
  news: any[];
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps;


interface News {
  props: IProps
};

const newsPrefix = 'ct-news';

@connect(
  (store) => ({
    news: getNews(store),
  })
)
class News extends Component {
  render () {
    const { news } = this.props;
    return (
      <View className={newsPrefix}>
        <View className={`${newsPrefix}-list`}>
          {
            news && news.length > 0 && news.map((newsItem: any, index: number) => {
              return (
                <View 
                  key={index}
                  className={`${newsPrefix}-list-item`}
                >
                  <View className={`${newsPrefix}-list-item-content`}>
                    <Text className={`${newsPrefix}-list-item-title`}>{newsItem.title}</Text>
                    <Text className={`${newsPrefix}-list-item-subtitle`}>{newsItem.time}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
    );
  }
}

export default News as ComponentClass<PageOwnProps, PageState>;