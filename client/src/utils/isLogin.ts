export const IsLogin = () => {
    if (localStorage.getItem('token')) return true;

    alert('로그인 후 이용 가능합니다');
    return false;
};
