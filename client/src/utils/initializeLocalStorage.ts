export const InitializeLocalStorage = () => {
    console.log('InitializeLocalStorage');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
};
