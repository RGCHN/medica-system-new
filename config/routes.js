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
    icon: 'smile',
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
    icon: 'crown',
    component: './PatientManage',
    routes: [
      {
        path: '/manage/message',
        name: 'message',
        icon: 'smile',
        component: './Welcome',
      },{
        path: '/manage/image',
        name: 'image',
        icon: 'smile',
        component: './Welcome',
      },{
        path: '/manage/predict',
        name: 'predict',
        icon: 'smile',
        component: './Welcome',
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
