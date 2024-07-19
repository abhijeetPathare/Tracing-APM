// ../controllers/user.js

import {
    getAllUser,
    getUserByEmail,
    insertUser
} from "../models/UserModel.js";

import logger from '../logger.js'; // Import your Winston logger

// Get all users
export const allUsers = (req, res) => {
    getAllUser((err, results) => {
        if (err) {
            logger.error(`Error fetching all users: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info('Fetched all users');
            res.json(results);
        }
    });
};

// Get a single user by email
export const showAUser = (req, res) => {
    const email = req.params.email;
    getUserByEmail(email, (err, results) => {
        if (err) {
            logger.error(`Error fetching user by email ${email}: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info(`Fetched user by email ${email}`);
            res.json(results);
        }
    });
};

// Create a new user
export const createAccount=(req,res)=>{
    const data = req.body;
    insertUser(data,(err,results)=> {
        if (err) {
            res.send(err);
        }else {
            res.json(results);
        }
    });
};