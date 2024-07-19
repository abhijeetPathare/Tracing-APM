import db from "../config/database.js";
import logger from '../logger.js'; // Adjust path as per your project structure

// Get all Foods
export const getFoods = (result) => {
    db.query("SELECT * FROM food", (err, results) => {
        if (err) {
            logger.error(`Error fetching foods: ${err.message}`);
            result(err, null);
        } else {
            logger.info(`Fetched all foods successfully`);
            result(null, results);
        }
    });
};

// Get single Food by ID
export const getFoodById = (id, result) => {
    db.query("SELECT * FROM food WHERE food_id = ?", [id], (err, results) => {
        if (err) {
            logger.error(`Error fetching food with ID ${id}: ${err.message}`);
            result(err, null);
        } else {
            logger.info(`Fetched food with ID ${id} successfully`);
            result(null, results[0]);
        }
    });
};

// Insert Food
export const insertFood = (data, result) => {
    db.query("INSERT INTO food SET ?", data, (err, results) => {
        if (err) {
            logger.error(`Error inserting food: ${err.message}`);
            result(err, null);
        } else {
            logger.info(`Inserted new food with ID ${results.insertId}`);
            result(null, results);
        }
    });
};

// Update Food by ID
export const updateFoodById = (data, id, result) => {
    db.query("UPDATE food SET food_name = ?, food_price = ? WHERE food_id = ?", [data.food_name, data.food_price, id], (err, results) => {
        if (err) {
            logger.error(`Error updating food with ID ${id}: ${err.message}`);
            result(err, null);
        } else {
            logger.info(`Updated food with ID ${id} successfully`);
            result(null, results);
        }
    });
};

// Delete Food by ID
export const deleteFoodById = (id, result) => {
    db.query("DELETE FROM food WHERE food_id = ?", [id], (err, results) => {
        if (err) {
            logger.error(`Error deleting food with ID ${id}: ${err.message}`);
            result(err, null);
        } else {
            logger.info(`Deleted food with ID ${id} successfully`);
            result(null, results);
        }
    });
};
