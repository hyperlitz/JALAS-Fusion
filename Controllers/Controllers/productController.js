import slugify from "slugify";
import productModel from "../Models/productModel.js";
import fs from 'fs';
import categoryModel from "../Models/categoryModel.js";
import braintree from "braintree";
import dotenv from 'dotenv';
import orderModel from "../Models/orderModel.js";
import Razorpay from 'razorpay'
dotenv.config()

// payment gateway


// payment token
export const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (error, response) {
            if (error) {
                res.status(400).send({ error })
            } else {
                res.status(200).send({ token: response.clientToken })
            }
        })
    } catch (err) {
        console.log(err)
    }
}

// payment
export const braintreePaymentController = async () => {
    console.log("Brain tree payment called")
    try {
        const { cart, nonce } = req.body;
        let total = 0;
        cart?.map(i => {
            total += i.price
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        }, function (err, result) {
            if (result) {
                const order = new orderModel({
                    products: cart,
                    payments: result,
                    buyer: req.user.id
                }).save();
                res.json({ ok: true })
            } else {
                res.status(500).send(err)
            }
        });

    } catch (err) {
        console.log(err)
    }
}

// create product
export const createProductController = async (req, res) => {

    try {
        console.log(req.fields)
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        // validation
        switch (true) {
            case !name:
                return res.status(500).send({ message: "Name is Required" });
            case !description:
                return res.status(500).send({ message: "Description is Required" });
            case !price:
                return res.status(500).send({ message: "Price is Required" });
            case !category:
                return res.status(500).send({ message: "category is required" });
            case !quantity:
                return res.status(500).send({ message: 'quantity is Required' });
            case !photo && photo.size > 1000000:
                return res.status(500).send({ message: "photo is required and photo is less than 1MB" })
        }
        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(200).send({
            success: true,
            message: "product added Successfully",
            products
        })
    } catch (err) {
        console.log("error is ", err.message);
        res.status(500).send({
            success: false,
            message: "Error while Creating Product",
            err
        })
    }
}


// get product 

export const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").populate("category").limit(12).sort({ createdAt: -1 });
        // sort decending order product newly created product appear first and old created product appear on the last
        res.status(200).send({
            success: true,
            message: "product give successfully",
            products,
            countTotal: products.length
        })
    } catch (err) {
        console.log(" error is ", err.message);
        res.status(500).send({
            success: false,
            message: "error while get The product",
            err
        })
    }
}

// get single produt

export const getSingleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category");
        console.log("product Object ", product)
        res.status(200).send({
            success: true,
            message: "successfuly get the product",
            product
        })
    } catch (err) {
        console.log("Error is ", err.message);
        res.status(500).send({
            success: false,
            message: 'Error while fetching a single product',
            err
        })
    }
}

// get product photo
export const getProductPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo');
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (err) {
        console.log(" error is ", err.message);
        res.status(500).send({
            success: false,
            message: "error while getting  photo",
            err
        })
    }
}

// delete product controller

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "product deleted successfully"
        })
    } catch (err) {
        console.log("error is ", err.message);
        res.status(500).send({
            success: false,
            message: "Error while deleting the product",
            err
        })
    }
}

// update product controller

export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        console.log(photo)
        switch (true) {
            case !name:
                return res.status(500).send({ message: "name is required" })
            case !description:
                return res.status(500).send({ message: "Description is Required" })
            case !price:
                return res.status(500).send({ message: "Price is Required" })
            case !category:
                return res.status(500).send({ message: "category is Required" })
            case !quantity:
                return res.status(500).send({ message: "Quantity is Required" })
        }

        const product = await productModel.findByIdAndUpdate(req.params.pid,
            { ...req.fields, slug: slugify(name) }, { new: true });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save()
        res.status(200).send({
            success: true,
            message: "product updated successfully",
            product
        })

    } catch (err) {
        console.log("error is ", err.message);
        res.status(500).send({
            message: "Error While updating Product",
            success: false,
            err
        })
    }
}

// filter product controller (POST)

export const filterProductController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let arg = {};
        if (checked.length) {
            arg.category = [...checked]
        }
        if (radio.length) {
            arg.price = {
                $gte: radio[0],
                $lte: radio[1]
            }
        }
        const product = await productModel.find(arg).select("-photo");
        res.status(200).send({
            success: true,
            message: "Successfully filtered product",
            product
        })
    } catch (err) {
        console.log("error is", err.message);
        res.status(400).send({
            success: false,
            message: 'Error while filtering product',
            err
        })
    }
}

// get product list as per page
export const getProductListController = async (req, res) => {
    try {
        const page = req.params.page ? req.params.page : 1;
        const numberPerPage = 6;
        const product = await productModel.find({}).select("-photo").skip(numberPerPage * (page - 1)).limit(numberPerPage);
        res.status(200).send({
            success: true,
            product,
            message: "successfully completed"
        })
    } catch (err) {
        console.log(err.message);
        res.status(400).send({
            success: false,
            message: "Error while Fetching product List",
            err
        })
    }
}

// get Total number of product

export const getTotalProductController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            message: "successfully get the total number of product",
            total
        })
    } catch (err) {
        console.log("error is ", err.message);
        res.status(500).send({
            success: false,
            message: "error while get number of product",
            err
        })
    }
}

// Search product in Database
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const products = await productModel.find({}).select("-photo").populate("category").or([
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { 'category.name': { $regex: keyword, $options: 'i' } }
        ])
        res.status(200).send({
            success: true,
            message: "Search Product is Recieved",
            products, 
            keyword
        })

    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            success: false,
            message: "Error while seraching product",
            error
        })
    }
}
// get Similar Product List
export const similarProductController = async (req, res) => {
    try {
        const { cId, pId } = req.body;
        const products = await productModel.find({ category: cId, _id: { $ne: pId } }).select("-photo").populate("category");
        res.status(200).send({
            success: true,
            message: "get similar prouduct successfully",
            products
        })
    } catch (err) {
        console.log(err.message)
        res.status(400).send({
            success: false,
            message: "error while get similar products",
            err
        })
    }
}

// get Product by category wise

export const getProductByCategoryWise = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category: category._id }).select("-photo");
        res.status(200).send({
            success: true,
            message: "successfully get products by categorywise",
            products,
            category
        })
    } catch (er) {
        console.log(err.message)
        res.status(400).send({
            success: false,
            message: "Error while getting products by categorywise"
        })
    }
}

const razorpay = new Razorpay({
    key_id: "rzp_test_XMXO3SrPxms6c8",
    key_secret: 'l6oZLX1MJ1okRVXDfROVVZFG'
})

export const createRazoPayOrderController = async (req, res) => {
    console.log(req.body.amount)
    try {
        const amount = req.body.amount
        const options = {
            amount: amount * 100, 
            currency: 'INR',
            receipt: 'order_rcptid_' + Date.now(),
        };
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'An error occurred while creating the Razorpay order.' });
    }
}

// create order
export const createOrderController = async(req, res) => {
    console.log(req.body)
    try{
        const {cart, result} = req.body;
        const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user.id
        }).save()
        res.json({ok: true})
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
// getAllOrderController

export const getAllOrderController = async(req, res) =>{
    try{
        const order = await orderModel.find({buyer: req.user.id }).populate("products", "-photo").populate("buyer", "name")
        res.status(200).send({
            order,
            success: true
        }) 
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
} 

// get osrder
export const getOrdersController = async(req, res) => {
    try {
        const orders = await orderModel.find({}).populate("products", "-photo").populate("buyer", "name").sort({ createdAt :-1 })
        res.status(200).send({
            success: true,
            orders
        })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export const updateOrderStatusController = async(req, res) => {
    console.log("update function called ", req.body)
    try {
        const { orderId } = req.params;
        const {status} = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, {new: true})
        res.status(200).json({
            orders
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message:"error while Updating Order status",
            err
        })
    }
}