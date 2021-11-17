export default function access(initialState) {
  const { currentUser } = initialState || {};

  return {
    showUserList: currentUser && currentUser.userType !== 3,
    showModelList: currentUser && currentUser.userType === 1,
  };
}
