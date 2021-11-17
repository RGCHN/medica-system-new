import { PageLoading } from '@ant-design/pro-layout';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import logo from './pages/assets/image/logo.svg';
import avatar from './pages/assets/image/avatar.png';
import { getUser } from '@/services/api';
const loginPath = '/user/login';
const registerPath = '/user/register';

export const initialStateConfig = {
  loading: <PageLoading />,
};

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const res = await getUser();
      return {
        ...res.data.data,
        avatar: avatar,
      };
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 非登录页面，获取用户信息
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    currentUser: undefined,
    settings: {},
  };
}

export const layout = ({ initialState }) => {
  return {
    title: '脑卒中AI助诊',
    logo: logo,
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.username || '',
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const currentUser = initialState.currentUser;
      const { location } = history;
      if (!currentUser && location.pathname !== loginPath && location.pathname !== registerPath) {
        history.push(loginPath);
      }
    },
    ...initialState?.settings,
  };
};
