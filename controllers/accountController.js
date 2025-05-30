const db = require('../db');
const generateToken = require('../utils/generateToken');

const createAccount = async (req, res) => {
    try {
        const { email, account_name, website } = req.body;
        const app_secret_token = generateToken();
         await db.runAsync(`insert into accounts ( email, name, website, secret_token) VALUES (? ,? ,? ,?);`, [ email, account_name, website, app_secret_token]);
        res.status(201).json(app_secret_token);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
module.exports.createAccount = createAccount;


const getAccounts = async (req, res) => {
    try {
        const accountDetails = await db.allAsync('select * from accounts;');
        res.status(200).json(accountDetails);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports.getAccounts = getAccounts;


const deleteAccount = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.runAsync(`DELETE FROM accounts WHERE id = ?`, [id]);
        res.status(200).json({ message: `Deleted account with id ${id}` });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
module.exports.deleteAccount = deleteAccount;