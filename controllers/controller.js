const { Services } = require('../services');
const { responseHelper } = require('../helper');


const register = async (req, res) => {
    try {
        const { nama, email, password, alamat} = req.body;
        const result = await Services.register( nama, email, password, alamat);
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(responseHelper.status.success).json(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

const login = async (req, res) => {
    try {
        const { email, password} = req.body;
        const result = await Services.login( email, password);
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.cookie('token',result.token).status(responseHelper.status.success).send(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

const profile = async (req, res) => {
    try{
        const id_user = req.verified
        const result = await Services.profile(id_user);
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(responseHelper.status.success).json(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

const addcart = async (req, res) => {
    try{
        const id_user = req.verified
        const id_item = req.body.id_item
        const jumlah = req.body.count
        const nama_item = req.body.nama
        const harga = req.body.harga
        const url = req.body.url
        const result = await Services.addcart(id_user, id_item, jumlah, nama_item, harga, url)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(responseHelper.status.success).json(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

const checkout = async (req, res) => {
    try {
        const id_user = req.verified
        const result = await Services.checkout(id_user)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(responseHelper.status.success).json(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

const removecart = async (req, res) => {
    try {
        const id_user = req.verified
        const {id_item} = req.body.id_item
        const result = await Services.removecart(id_user, id_item)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(responseHelper.status.success).json(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

const productlog = async (req, res) => {
    try {
        const id_user = req.verified
        const id_item = req.body.id_item
        const jumlah = req.body.jumlah
        const harga = req.body.jumlah
        const result = await Services.productlog(id_user, id_item, jumlah, harga)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(responseHelper.status.success).json(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

const discount = async (req, res) => {
    try {

    } catch (error) {

    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie('token').status(responseHelper.status.success).send("Berhasil Logout");
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

const verify = async (req, res, next) => {
    try {
        const verified = req.verified
        const result = await Services.verify(verified)
        if (result instanceof Error) {
            throw new Error(result);
        }
        res.status(responseHelper.status.success).json(result);
    } catch (error) {
        res.status(responseHelper.status.error).json(error.message);
    }
}

module.exports = {
    register,
    login,
    profile,
    addcart,
    checkout,
    removecart,
    productlog,
    logout,
    verify
}