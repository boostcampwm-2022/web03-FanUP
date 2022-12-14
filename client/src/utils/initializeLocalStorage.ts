export const InitializeLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
};
