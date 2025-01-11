import bcrypt from 'bcrypt';

export const checkPassword = async (password: string, rePassword: string) => {
    try {
        const isMatch = await bcrypt.compare(password,rePassword);
        if (!isMatch)
            return false;
        else {
            return true;
        }
    } catch (error) {
        throw new Error(error);
    }
}