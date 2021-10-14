import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import logo from './pages/assets/image/logo.svg';
const loginPath = '/user/login';
const registerPath = '/user/Register';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState() {
  return {
    userName: 'xxx'
  }
}

export const layout = ({ initialState }) => {
  return {
    title: '脑卒中AI助诊',
    logo: logo,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: localStorage.getItem('currentUser')
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const currentUser = localStorage.getItem('currentUser');
      console.log(currentUser);
      const { location } = history;
      if ( !currentUser && location.pathname !== loginPath && location.pathname !== registerPath) {
        history.push(loginPath);
      }
    },
    links: [],
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    ...initialState?.settings,
  };
};
