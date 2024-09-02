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

const addDocument = async (body) => {
    const data = await db.query(`call upload_user_document_st(:type, :path, :document, :data, :id_user)`,{
        logging: console.log,
        replacements: {...body},
        type: QueryTypes.INSERT,
        raw: true,
    });
    return data;
}

const downloadDocument = async (userId, type) => {
    const data = await db.query(`SELECT id, type, path, document, data from user_documents where id_user = ? and type = ?`,{
        logging: console.log,
        replacements: [userId, type],
        type: QueryTypes.SELECT,
        raw: true,
    });
    return data;
}

export {
    getAllDocumentsById,
    getDocumentByType,
    addDocument,
    downloadDocument
}