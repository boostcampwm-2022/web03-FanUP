interface domainPath {
    [key: string]: string;
}

const socialLoginURL: domainPath = {
    naver: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`,
    google: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&scope=openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/auth/google/callback`,
    kakao: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/auth/kakao/callback`,
    facebook: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`,
};

const socialLogin = (domain: string): void => {
    (window as Window).location = socialLoginURL[domain];
};

export { socialLoginURL, socialLogin };
