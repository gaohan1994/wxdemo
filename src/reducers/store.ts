import { RECEIVE_NEWS } from '../constants/constants';

const time = Date.now();
const INITIAL_STATE = {
  news: [{
    title: '消息标题',
    time: time
  }, {
    title: '消息标题',
    time: time
  }, {
    title: '消息标题',
    time: time
  }, {
    title: '消息标题',
    time: time
  }],
}

export default function store (state = INITIAL_STATE, action) {
  switch (action.type) {
    case RECEIVE_NEWS:
      const { payload: { newsPage, news } } = action;

      if (newsPage === 1) {
        return {
          ...state,
          news
        };
      } else {
        return {
          ...state,
          news: state.news.concat(news)
        }
      }


    default:
      return state
  }
}

export const getNews = (state: any) => state.store.news;