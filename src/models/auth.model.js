import { QueryTypes } from "sequelize";
import bcrypt from "bcryptjs";
import pkg from 'jsonwebtoken';

// Mysql connection
import db from "../db/connectionMysql.js";

const loginModel = async ({ email, password }) => {
    try {
        const result = await db.query(`SELECT id, code, password, name, lastname, lastname_2 FROM get_all_data_user WHERE email ='${email}'`, {
            type: QueryTypes.SELECT,
            raw: true,
        });
        const match = await bcrypt.compare(password, result[0].password);
        if (match) {
            // Create JWTs
            const accessToken = pkg.sign(
                {userCode : result[0].code, userId: result[0].id},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: 4860}
            );
            return { message: 'Login successful.', match: match, code: 200, token: accessToken };
        } else {
            return { message: 'Invalid username or password.', match: match, code: 401};
        }
    } catch (error) {
        return { error: 'Failed to authenticate user.', message: error.message };
    }
}

export {
    loginModel
}
