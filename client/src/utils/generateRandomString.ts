//이메일 연동이 되기전까지, 내 이메일을 랜덤으로 생성하기 위한 것
const generateRandomString = (num: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
};

export const MyEmail = generateRandomString(10);
export const MyNickName = generateRandomString(6);
