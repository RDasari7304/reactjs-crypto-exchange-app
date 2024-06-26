const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const axios = require('axios');
const { sq } = require('date-fns/locale');
const app = express();
const port = 3001;

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
});

const queryDB = (query) => {
    return new Promise((reject, resolve) => {
        conn.query(query, (result, err) => {
            if(err){
                reject(err);
            }

            resolve(result);
        })
    })
}

conn.connect((err) => {
    if(err) throw err;
    console.log("Connected to the database server.");
})

app.use(cors());

app.get('/fetchUser/:id', async (req, res) => {
    const {id} = req.params;
    
    try{
        const sql = `SELECT * FROM mysql.user_profiles where pk_users = ${id}`;
        const result = await queryDB(sql);
        
        const unpacked_meta_data = JSON.parse(result[0].meta_data);
        const user = {...result[0], ...unpacked_meta_data};
        delete user['meta_data'];

        res.status(200).json(user);
    }catch(err){
        console.log('Database fetch failed: ', err);
        res.status(500).send('Internal server error.');
    }
});

app.get('/fetchAPI', async (req, res) => {
    const {endpoint, headers} = req.query;


    const response = await axios.get(endpoint, {headers: headers});
    res.json(response.data);
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});