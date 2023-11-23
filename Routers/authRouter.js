import express from "express";
import { loginController, registerController, testController, forgotPasswordController, updateProfileController } from "./../Controllers/authController.js";
import { requireSignIn, isAdmin } from "../Middleware/authMiddleware.js";

// router object
const router = express.Router();

// routing


// register router
router.post("/register", registerController);

// login router
router.post("/login", loginController);

// test  routes
router.get("/test", requireSignIn , isAdmin, testController);

// forgotten password

router.post("/forgot-password", forgotPasswordController);


// protected User route 
router.get('/user-auth', requireSignIn, (req, res) => {
    console.log("User AUthenticated...")
    res.status(200).send({ ok : true});
})

// protected Admin Route
router.get('/admin-auth', requireSignIn, isAdmin , (req, res) => {
    console.log("User AUthenticated...")
    res.status(200).send({ ok: true });
})

// update prodfile
router.put('/update-profile', requireSignIn, updateProfileController)

export default router;
