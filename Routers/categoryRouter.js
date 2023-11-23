import express from 'express';
import { isAdmin, requireSignIn } from '../Middleware/authMiddleware.js'
import { createCategoryController, deleteCategoryController, getCategoryController, singleCategoryController, updateCategoryController } from '../Controllers/categoryController.js';
const router = express.Router();

// create category

router.post("/create-category", requireSignIn, isAdmin, createCategoryController); 

// update category

router.put("/update-category/:id", requireSignIn, isAdmin, updateCategoryController );

// get All category

router.get('/get-category', getCategoryController);


// get single category

router.get('/single-category/:slug', singleCategoryController);

// delete 

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router