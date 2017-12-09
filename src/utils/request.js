import fetch from 'dva/fetch';
import { notification } from 'antd';
const Cookie = document.cookie;


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  // notification.error({
  //   message: `请求错误 ${response.code}: ${response.msg}`,
  //   description: response.msg,
  // });
  const error = new Error(response.status);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    newOptions.headers = {
      Accept: 'application/json',
      //   'Content-Type': 'application/x-www-form-urlencoded',
     'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers,
    };
    newOptions.body = JSON.stringify(newOptions.body);
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response =>response.json()
    ).then(data=>{
      console.log(data);
      console.log(JSON.parse(newOptions.body));
      if(data.code== 400){
        if(JSON.parse(newOptions.body).type === 'out'){
          document.cookie="username="+'';
          document.cookie="status="+false;
          return {
            username: JSON.parse(newOptions.body).username,
            status: true
          }
        }else if(JSON.parse(newOptions.body).type === 'in'){
          document.cookie="username="+JSON.parse(newOptions.body).username;
          document.cookie="status="+true;
          return {
            username: JSON.parse(newOptions.body).username,
            status: true
          }
        }

      }else{
        notification.error({
          message: data.msg,
          // description: data.code,
        });
      }
    })
    .catch((error) => {
      console.log('error');
        console.log(error);
      if (error.code) {
        notification.error({
          message: error.name,
          description: error.message,
        });
      }
      if ('stack' in error && 'message' in error) {
        notification.error({
          message: `请求错误: ${url}`,
          description: error.message,
        });
      }
      return error;
    });
}
