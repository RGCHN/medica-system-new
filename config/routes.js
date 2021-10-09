export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: 'register',
            path: '/user/register',
            component: './user/Register',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'areaChart',
    component: './Welcome',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/manage',
    name: 'manage',
    icon: 'team',
    component: './Patient',
    routes: [
      {
        path: '/manage/message',
        name: 'message',
        component: './PatientManage',
      },
      {
        path: '/manage/image',
        name: 'image',
        component: './ImageManage',
      },
      {
        path: '/manage/predict',
        name: 'predict',
        component: './ModelPredict',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
