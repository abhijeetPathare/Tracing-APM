// import functions from Food model

// Import functions from Food model
import {
    getFoods,
    getFoodById,
    insertFood,
    updateFoodById,
    deleteFoodById,
} from "../models/FoodModel.js";
import logger from '../logger.js'; 

// Get all Foods
export const showFoods = (req, res) => {
    getFoods((err, results) => {
        if (err) {
            logger.error(`Error fetching all foods: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info('Fetched all foods');
            res.json(results);
        }
    });
};

// Get single Food by ID
export const showFoodById = (req, res) => {
    const id = req.params.id;
    getFoodById(id, (err, results) => {
        if (err) {
            logger.error(`Error fetching food by ID ${id}: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info(`Fetched food by ID ${id}`);
            res.json(results);
        }
    });
};

// Create new Food
export const createFood = (req, res) => {
    const data = req.body;
    insertFood(data, (err, results) => {
        if (err) {
            logger.error(`Error creating food: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info(`Created new food with ID: ${results.insertId}`);
            res.status(201).json(results);
        }
    });
};

// Update Food by ID
export const updateFood = (req, res) => {
    const id = req.params.id;
    const data = req.body;
    updateFoodById(data, id, (err, results) => {
        if (err) {
            logger.error(`Error updating food with ID ${id}: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info(`Updated food with ID ${id}`);
            res.json(results);
        }
    });
};

// Delete Food by ID
export const deleteFood = (req, res) => {
    const id = req.params.id;
    deleteFoodById(id, (err, results) => {
        if (err) {
            logger.error(`Error deleting food with ID ${id}: ${err.message}`);
            res.status(500).json({ error: err.message });
        } else {
            logger.info(`Deleted food with ID ${id}`);
            res.json(results);
        }
    });
};
