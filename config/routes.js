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
    name: 'manage',
    icon: 'radarChart',
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
    path: '/userList',
    name: 'userList',
    icon: 'cloudServer',
    component: './UserList',
    access: 'userListFilter'
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
