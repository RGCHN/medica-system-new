export default function access(initialState) {
  const { currentUser } = initialState || {};

  return {
    showUserList: currentUser && currentUser.userType === 1,
  };
}
