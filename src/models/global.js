import { queryNotices } from '../services/api';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    fetchingNotices: false,
  },

  effects: {
    *fetchNotices(_, { call, put }) {
      yield put({
        type: 'changeNoticeLoading',
        payload: true,
      });
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
        fetchingNotices: false,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
    changeNoticeLoading(state, { payload }) {
      return {
        ...state,
        fetchingNotices: payload,
      };
    },
  },

  subscriptions: {
    setup({dispatch, history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      // `/` 需要判断用户是否是登录状态，（检测 cookie的存在，判断status的值是true 还是 false）
      // 其他状态
      return history.listen(({ pathname, search }) => {
        if(pathname === '/'){
           let dd = document.cookie.split(';');
           var obj={};
           var listdd = dd.filter(item=>{ let items = item.split("=");obj[items[0].trim()] = items[1] });
           var {status,username} = obj;
          console.log('sssss');
          console.log(obj);
          console.log(status);
           if(!status || !username){
             dispatch(routerRedux.push('/user/login'));
           }else{
             dispatch(routerRedux.push('/dashboard/analysis'));
           }
        }
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
