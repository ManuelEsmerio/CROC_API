import { QueryTypes } from "sequelize";

// Mysql connection
import db from "../db/connectionMysql.js";

// Bcrypt
import { compareDate } from "../helpers/handleBcrypt.js";

// HandleError
import { CustomAPIError } from "../shared/customHandleError.js";
import { StatusCodes } from "http-status-codes";

const loginRepository = async ({ email, password }) => {
    const [ user ] = await db.query(`SELECT id, code, password, name, lastname, lastname_2 FROM get_all_data_user WHERE email ='${email}'`, {
        type: QueryTypes.SELECT,
        raw: true,
    });
    if(!user) throw new CustomAPIError("Invalid email", StatusCodes.UNAUTHORIZED, "Incorrect email, please verify your email and try again.");

    const isValid = await compareDate(password, user.password);
    if(!isValid) throw new CustomAPIError("Invalid password.", StatusCodes.UNAUTHORIZED, "Incorrect password, please verify your password and try again.");

    return user;
}

export {
    loginRepository
}
