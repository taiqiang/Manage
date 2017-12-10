import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});

// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '工作台', // for breadcrumb
    path: '/',
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        component: dynamicWrapper(app, ['form'], () => import('../routes/Dashboard/Analysis')),
      },
      {
        name: '表单页',
        path: 'form',
        icon: 'form',
        children: [
          {
            name: '基础表单',
            path: 'basic-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/SearchForm')),
          },
          {
            name: '分步表单',
            path: 'step-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm')),
            children: [
              {
                path: 'confirm',
                component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step2')),
              },
              {
                path: 'result',
                component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/StepForm/Step3')),
              },
            ],
          },
          {
            name: '高级表单',
            path: 'advanced-form',
            component: dynamicWrapper(app, ['form'], () => import('../routes/Forms/AdvancedForm')),
          },
        ],
      },
      {
        name: '列表页',
        path: 'list',
        icon: 'table',
        children: [
          {
            name: '标准列表',
            path: 'basic-list',
            component: dynamicWrapper(app, ['list'], () => import('../routes/List/BasicList')),
          },
        ],
      },
      {
        name: '异常',
        path: 'exception',
        icon: 'warning',
        children: [
          {
            name: '403',
            path: '403',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
          },
          {
            name: '404',
            path: '404',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
          },
          {
            name: '500',
            path: '500',
            component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
          }
        ],
      },
    ],
  },
];
