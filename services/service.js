require("dotenv").config();
const { databaseQuery } = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cookies = require ('../node_modules/universal-cookie')

const cookie = new Cookies();

const register = async (nama, email, password, alamat) => {
    try {
        const query = `INSERT INTO users VALUES (DEFAULT, $1, $2, $3, DEFAULT, $4)` ;
        const hash = await bcrypt.hash(password,10)
        const result = await databaseQuery(query, [nama, email, hash, alamat]);
        if (!result){
			throw new Error('Register Error');
		}
		return ("Data Register Success")
    } catch (error) {
        return error
    }
}

const login = async (email,password) => {
    try {
        const query = `SELECT * FROM users WHERE email=$1`;
        const result = await databaseQuery(query, [email]);
        const compares = bcrypt.compare(password, result.rows[0].password)
        if (!compares){
			throw new Error('Login Error');
		}
        else {
            const token = jwt.sign((result.rows[0]), process.env.SECRET);
            result.rows[0].token = token
            return (
                result.rows[0]
            )
        }
    } catch (error) {
        return error
    }
}

const profile = async (id_user) => {
    try {
        const query = `SELECT * FROM users where id_user=$1`;
        const result = await databaseQuery(query, [id_user]);
        return (
            result.rows[0]
        )

    } catch (error) {
        return error
    }
    
}

const addcart = async (id_user, id_item, jumlah, nama_item, harga, url) => {
    try{
        const query = `INSERT INTO CART VALUES(DEFAULT, $1, $2, $3, $4, $5, $6)`;
        const result = await databaseQuery(query,[id_user, id_item, jumlah, nama_item, harga, url])
        return ("SUKSES")
    } catch (error) {
        return error
    }
}

const checkout = async (id_user) => {
    try {
        const query = `SELECT DISTINCT ON (nama_item,harga,url) id_user,id_item,nama_item as nama,sum(jumlah) as jumlah,harga,url FROM CART WHERE id_user = $1 GROUP BY id_user, id_item,nama_item,harga,url `;
        const result = await databaseQuery(query, [id_user])
        if (result.rows[0] == undefined ){
            const data = {
                id_users: id_user,
                id_item: 0,
                quantity: 0

            }
            return data
        } else {
            return result.rows
        }
    } catch (error) {
        return error
    }
}

const removecart = async (id_user, id_item) => {
    try {
        const query = `DELETE FROM CART WHERE id_user = $1 and id_item = $2`;
        const query2 = `SELECT * FROM CART`;
        const result = await databaseQuery(query, [id_user, id_item])
        const result2 = await databaseQuery(query)
        return (result2.rows)
    } catch (error) {
        return error
    }
}

module.exports = {
    register,
    login,
    profile,
    addcart,
    checkout,
    removecart
}