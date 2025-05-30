const db = require('../db');

const createDestination = async(req,res) => {
    try {
        const { accountId, url, http_method, headers } = req.body;
        const destination = await db.runAsync('INSERT INTO destinations (url,method,account_id,headers) VALUES (?,?,?,?)', [url,http_method,accountId,JSON.stringify(headers)]);
        res.status(201).json(destination);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const getDestinationsByAccount = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id: ', id);
        const data = await db.allAsync('select * from destinations WHERE account_id=?;',[id]);
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

}
module.exports = { createDestination, getDestinationsByAccount }