/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState || {};

  return {
    // userListFilter: currentUser && currentUser.userType === 1,
  };
}
