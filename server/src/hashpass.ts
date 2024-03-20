import bcrypt from 'bcrypt';


export const hashpass = async (pasword: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPassword = await bcrypt.hash(pasword, salt);

    return hashedPassword;
}


export const comparehashedPass = async (password: string, hashedPassword: string) => {
    const result = await bcrypt.compare(password, hashedPassword);
    return result
}