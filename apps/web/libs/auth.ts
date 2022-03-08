import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string) => {
    const hash = await bcrypt.hash(password, 14)
    return hash
}

export const verifyPassword = async (password: string, hash: string) => {
    const result = await bcrypt.compare(password, hash);
    return result;
}
