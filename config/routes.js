export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './login',
      },
      {
        path: '/user/register',
        name: 'register',
        component: './register',
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
    icon: 'radarChart',
    component: './Patient',
    hideMenu: true,
    routes: [
      {
        path: '/manage/message',
        name: 'message',
        component: './PatientManage',
      },
      {
        path: '/manage/predict',
        name: 'predict',
        component: './ShowPredict',
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
    path: '/models',
    access: 'showModelList',
    name: 'models',
    icon: 'CodeOutlined',
    component: './ModelManage',
  },
  {
    path: '/useList',
    access: 'showUserList',
    name: 'userList',
    icon: 'cloudServer',
    component: './UserList',
  },
  {
    path: '/selfCenter',
    name: 'selfCenter',
    icon: 'team',
    component: './SelfCenter',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
