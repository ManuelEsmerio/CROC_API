// Mysql connection
import { QueryTypes } from "sequelize";
import db from "../db/connectionMysql.js";

// Get all companies
const getAllCompanies = async () => {
    const data = await db.query(`SELECT * FROM get_all_data_companies WHERE is_deleted = 0`, {
        type: QueryTypes.SELECT,
        raw: true,
    });
    return data;
}

// Get company by id
const getCompanyById = async (companyId) => {
    const data = await db.query(`SELECT * FROM get_all_data_companies WHERE id = ?`, {
        logging: console.log,
        replacements: [companyId],
        type: QueryTypes.SELECT,
        raw: true,
    });
    return data;
}

// Add company
const addCompany = async (body) => {
    const data = await db.query(`call add_company_st (:company, :id_country, :id_state, :id_municipality, :id_suburb, :is_deleted, :address, :ext, :ins);`
        ,{
            logging: console.log,
            replacements: {...body},
            raw: true,
            type: QueryTypes.INSERT
        });
    return data;
}

// Update company
const updateCompany = async (body, companyId) => {
    const data = await db.query(`call edit_company_st (:id, :company, :id_country, :id_state, :id_municipality, :id_suburb, :is_deleted, :address, :ext, :ins);`
        ,{
            logging: console.log,
            replacements: {id: companyId, ...body},
            raw: true,
            type: QueryTypes.UPDATE
        });
    return data;
}

// Delete company
const deleteCompany = async (companyId) => {
    const data = await db.query(`UPDATE companies SET is_deleted = 1 WHERE id = ?`
        ,{
            logging: console.log,
            replacements: [companyId],
            raw: true,
            type: QueryTypes.UPDATE
        });
    return data[1];
}

export {
    getAllCompanies,
    getCompanyById,
    addCompany,
    updateCompany,
    deleteCompany
}