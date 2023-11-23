import express from 'express';
import { isAdmin, requireSignIn } from '../Middleware/authMiddleware.js';
import { braintreePaymentController, braintreeTokenController, createOrderController, createProductController, createRazoPayOrderController, deleteProductController, filterProductController, getAllOrderController, getOrdersController, getProductByCategoryWise, getProductController, getProductListController, getProductPhotoController, getSingleProductController, getTotalProductController, searchProductController, similarProductController, updateOrderStatusController, updateProductController } from '../Controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router();

// create product

router.post("/create-product", requireSignIn, isAdmin, formidable(),createProductController);

// get products

router.get('/get-product', getProductController)

// get single prouduct

router.get("/get-product/:slug", getSingleProductController);

// get photo

router.get("/product-photo/:pid", getProductPhotoController);

// delete product 

router.delete('/delete-product/:pid',requireSignIn, isAdmin, deleteProductController);

// update product
 
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(),  updateProductController);

//  get filtered products

router.post('/filter-product', filterProductController)

// get the total number of product

router.get('/total', getTotalProductController);

// get product list as per page

router.get('/product-list/:page', getProductListController);

// get search product

router.get('/search-product/:keyword', searchProductController);

// controller Similar product

router.post('/similar-product', similarProductController);

// get Products by category wise

router.get('/category-product/:slug', getProductByCategoryWise)

// payment routes\
// token
router.get('/braintree/token', braintreeTokenController)

// payments
router.post('/braintree/payment', requireSignIn, braintreePaymentController)

// razopay payment order
router.post('/create-razorpay-order', requireSignIn, createRazoPayOrderController)

// create Order

router.post('/create-order', requireSignIn, createOrderController)

// get all order

router.get('/orders', requireSignIn, getAllOrderController)

// all users orders
router.get('/all-orders', requireSignIn, isAdmin,getOrdersController);

// order status update
router.put('/update-order/:orderId', requireSignIn, isAdmin, updateOrderStatusController);

export default router; 