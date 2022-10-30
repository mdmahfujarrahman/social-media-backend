import bcrypt from "bcrypt";

export const hashing = (password) => {
    console.log(password);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};
