// Mysql connection
import { QueryTypes } from "sequelize";
import db from "../db/connectionMysql.js";
import { encryptData } from "../helpers/handleBcrypt.js";

const getAllUsers = async () => {
    const data = await db.query(`SELECT * FROM get_all_data_user WHERE is_deleted = 0`, {
        type: QueryTypes.SELECT,
        raw: true,
    });
    return data;
}

const getUserById = async (userId) => {
    const data = await db.query(`SELECT * FROM get_all_data_user WHERE id = ?`, {
        logging: console.log,
        replacements: [userId],
        type: QueryTypes.SELECT,
        raw: true,
    });
    return data;
}


const getUserByEmail = async (email) => {
    const data = await db.query(`SELECT * FROM get_all_data_user WHERE email = ?`, {
        logging: console.log,
        replacements: [email],
        type: QueryTypes.SELECT,
        raw: true,
    });
    return data;
}
// add User
const addUser = async (body) => {
    body.password = await encryptData(body.password);
    const data = await db.query(`call add_edit_user_st (:code, :name, :lastname, :lastname_2, :birthdate, :curp, :rfc, :nss, :phone, :cellphone, :email, :gender, :marital_status, :id_suburb, :id_state, :id_municipality, :blood_type, :union_registration, :system_registration, :photo, :signature, :id_company, :is_deleted, :id_country, :password, :address, :ext, :ins);`
        ,{
            logging: console.log,
            replacements: {...body},
            raw: true,
            type: QueryTypes.INSERT
        });
    return data;
}

const updateUser = async (body) => {
    body.password = await encryptData(body.password);
    const data = await db.query(`call add_edit_user_st (:code, :name, :lastname, :lastname_2, :birthdate, :curp, :rfc, :nss, :phone, :cellphone, :email, :gender, :marital_status, :id_suburb, :id_state, :id_municipality, :blood_type, :union_registration, :system_registration, :photo, :signature, :id_company, :is_deleted, :id_country, :password, :address, :ext, :ins);`
        ,{
            logging: console.log,
            replacements: {...body},
            raw: true,
            type: QueryTypes.UPDATE
        });
    return data;
}

const deleteUser = async (userId) => {
    const data = await db.query(`UPDATE users SET is_deleted = 1 WHERE id = ?`
        ,{
            logging: console.log,
            replacements: [userId],
            raw: true,
            type: QueryTypes.UPDATE
        });
    return data[1];
}

export {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUserByEmail
}