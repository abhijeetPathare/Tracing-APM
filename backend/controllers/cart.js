// Import functions from Cart model
import {
    getAllItems,
    getAItem,
    insertToCart,
    updateCartItemQty,
    deleteItemInCart,
    deleteAllItemsByUser
} from "../models/CartModel.js";
import logger from '../logger.js'; 

// Get all Items in cart by User ID
export const allItems = (req, res) => {
    const userId = req.params.id;
    getAllItems(userId, (err, results) => {
        if (err) {
            logger.error(`Error fetching all items for user ${userId}: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info(`Fetched all items for user ${userId}`);
            res.json(results);
        }
    });
};

// Get a specific Item in cart by User ID and Food ID
export const getItem = (req, res) => {
    const user_id = req.params.user_id;
    const food_id = req.params.food_id;
    getAItem(user_id, food_id, (err, results) => {
        if (err) {
            logger.error(`Error fetching item in cart for user ${user_id} and food ${food_id}: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info(`Fetched item in cart for user ${user_id} and food ${food_id}`);
            res.json(results);
        }
    });
};

// Add an Item to cart
export const addItems = (req, res) => {
    const data = req.body;
    insertToCart(data, (err, results) => {
        if (err) {
            logger.error(`Error adding item to cart: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info(`Added item to cart: ${results.insertId}`);
            res.json(results);
        }
    });
};

// Update quantity of an Item in cart
export const updateItem = (req, res) => {
    const data = req.body;
    updateCartItemQty(data, (err, results) => {
        if (err) {
            logger.error(`Error updating item in cart: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info(`Updated item in cart`);
            res.json(results);
        }
    });
};

// Delete a specific Item in cart by User ID and Food ID
export const deleteItem = (req, res) => {
    const user_id = req.params.user_id;
    const food_id = req.params.food_id;
    deleteItemInCart(user_id, food_id, (err, results) => {
        if (err) {
            logger.error(`Error deleting item in cart for user ${user_id} and food ${food_id}: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info(`Deleted item in cart for user ${user_id} and food ${food_id}`);
            res.json(results);
        }
    });
};

// Delete all Items in cart for a User
export const deleteItems = (req, res) => {
    const userId = req.params.id;
    deleteAllItemsByUser(userId, (err, results) => {
        if (err) {
            logger.error(`Error deleting all items in cart for user ${userId}: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info(`Deleted all items in cart for user ${userId}`);
            res.json(results);
        }
    });
};
