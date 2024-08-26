// Mysql connection
import { QueryTypes } from "sequelize";
import db from "../db/connectionMysql.js";

const getAllDocumentsById = async (userId) => {
    const data = await db.query(`SELECT * FROM get_all_user_documents WHERE id_user = ?`, {
        logging: console.log,
        replacements: [userId],
        type: QueryTypes.SELECT,
        raw: true,
    });
    return data;
}

const getDocumentByType = async (userId, type) => {
    const data = await db.query(`SELECT * FROM get_all_user_documents WHERE id_user = ? AND type = ?`, {
        logging: console.log,
        replacements: [userId, type],
        type: QueryTypes.SELECT,
        raw: true,
    });
    return data;
}

export {
    getAllDocumentsById,
    getDocumentByType
}