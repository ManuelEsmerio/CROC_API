import bcrypt from "bcryptjs"

const encryptData = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

const compareDate = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

export {
    encryptData,
    compareDate
}