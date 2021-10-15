export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/',
        routes: [
          {
            name: 'login',
            path: '/login',
            component: './login',
          },
          {
            name: 'register',
            path: '/register',
            component: './register',
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
        path: '/manage/predict',
        name: 'predict',
        component: './ModelPredict',
      },
      {
        path: '/manage/image',
        name: 'image',
        component: './HistoryManage',
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
