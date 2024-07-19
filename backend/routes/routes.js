// import express 
import express from "express";
//import apm from "@/apm"; // Ensure this imports your APM setup
import apm from 'elastic-apm-node';
// import functions from controller 
import {
    showFoods,
    showFoodById,
    createFood,
    updateFood,
    deleteFood,
} from "../controllers/food.js";

import {
    showAUser,
    createAccount
} from "../controllers/user.js";

import {
    addItems,
    getItem,
    updateItem,
    allItems,
    deleteItem,
    deleteItems
} from "../controllers/cart.js";

import {
    createBooking
} from "../controllers/booktable.js";

import {
    createBillDetails,getBillDetailsById
} from "../controllers/billdetails.js";

import {
    showNewestStatusId,
    createBillStatus, 
    getAllBillsByUser,
    getAllBillsByBill,
    getAllBills,
    updateBillStatus,
    updateBillPaid,
    cancelBillStatus
} from "../controllers/billstatus.js";

// init express router
const router = express.Router();

const wrapWithTransaction = (handler, name) => {
    return async (req, res, next) => {
        const transaction = apm.startTransaction(name, 'request');
        try {
            await handler(req, res, next);
            transaction.setOutcome('success');
        } catch (error) {
            transaction.setOutcome('failure');
            apm.captureError(error);
            next(error);
        } finally {
            transaction.end();
        }
    };
};

////////////////////////// FOOD ////////////////////////////////
// get all Food
router.get("/api/foods", wrapWithTransaction(showFoods, 'showFoods'));

// get single Food 
router.get("/api/foods/:id", wrapWithTransaction(showFoodById, 'showFoodById'));

// create Food
router.post("/api/foods", wrapWithTransaction(createFood, 'createFood'));

// update Food 
router.put("/api/foods/:id", wrapWithTransaction(updateFood, 'updateFood'));

// delete Food
router.delete("/api/foods/:id", wrapWithTransaction(deleteFood, 'deleteFood'));

////////////////////////// USER ////////////////////////////////
// get user by email
router.get("/api/users/:email", wrapWithTransaction(showAUser, 'showAUser'));

// create account
router.post("/api/users/", wrapWithTransaction(createAccount, 'createAccount'));

////////////////////////// CART ////////////////////////////////
// add to cart
router.post("/api/cartItem", wrapWithTransaction(addItems, 'addItems'));

// get a item in cart
router.get("/api/cartItem/:user_id/:food_id", wrapWithTransaction(getItem, 'getItem'));

// get all items by user id
router.get("/api/cartItem/:id", wrapWithTransaction(allItems, 'allItems'));

// update item qty
router.put("/api/cartItem/", wrapWithTransaction(updateItem, 'updateItem'));

// delete a item in cart
router.delete("/api/cartItem/:user_id/:food_id", wrapWithTransaction(deleteItem, 'deleteItem'));

// delete all items in cart
router.delete("/api/cartItem/:id", wrapWithTransaction(deleteItems, 'deleteItems'));

////////////////////////// Booking ////////////////////////////////
router.post("/api/booking", wrapWithTransaction(createBooking, 'createBooking'));

////////////////////////// Bill Details ////////////////////////////////
router.post("/api/billdetails", wrapWithTransaction(createBillDetails, 'createBillDetails'));
router.get("/api/billdetails/:id", wrapWithTransaction(getBillDetailsById, 'getBillDetailsById'));

////////////////////////// Bill Status ////////////////////////////////
router.get("/api/billstatus/new", wrapWithTransaction(showNewestStatusId, 'showNewestStatusId'));
router.post("/api/billstatus", wrapWithTransaction(createBillStatus, 'createBillStatus'));
router.get("/api/billstatus/user/:id", wrapWithTransaction(getAllBillsByUser, 'getAllBillsByUser'));
router.get("/api/billstatus/bill/:id", wrapWithTransaction(getAllBillsByBill, 'getAllBillsByBill'));
router.get("/api/billstatus", wrapWithTransaction(getAllBills, 'getAllBills'));
router.put("/api/billstatus/:id", wrapWithTransaction(updateBillStatus, 'updateBillStatus'));
router.put("/api/billstatus/paid/:id", wrapWithTransaction(updateBillPaid, 'updateBillPaid'));
router.put("/api/billstatus/cancel/:id", wrapWithTransaction(cancelBillStatus, 'cancelBillStatus'));

export default router;
