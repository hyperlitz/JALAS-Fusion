import { comparePassword, hashPassword } from "../Helpers/authHelper.js";
import userModel from "../Models/userModel.js";
import JWT from 'jsonwebtoken';

// REGISTER | POST
export const registerController = async (req, res) => {
    console.log("request is recieved",req.body);
    try {
        const { name, email, password, phone, address , answer} = req.body;
        
        // validation
        if (!name) {
            return res.send({ message: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: 'Email is Required' }); 
        }
        if(! password){
            return res.send({ message: "password is Required"});
        }
        if(!phone){
            return res.send({ message: "Phone Number is Required"});
        }
        if(!address){
            return res.send({ message : "Address is Required"}); 
        }
        if(!answer){
            return res.send({ message : "Answer is Required"})
        }

        // check user
        const existingUser = await userModel.findOne({email});

        // existing the user
        if(existingUser){
            return res.status(200).send({
                success : false,
                message : "Already Registered Please Login"
            })
        }

        // register the User
        const hashedPassword = await hashPassword(password);

        // save 
        const user = await new userModel({name, email, phone, address, answer,  password: hashedPassword}).save();
        
        res.status(200).send({ 
            success: true,
            message: "User Register successfully..",
            user
        })

    } catch (error) {
        console.log("error ", error.message);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    } 
};

// LOGIN | POST
export const loginController = async (req, res) => {
    console.log("Login POST API CALLED ****");
    try {
        const {email, password} = req.body;

        // validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: "Invalid email or password"
            })
        }

        // check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:"Email doesnot exist"
            })
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(404).send({
                success: false,
                message: "Invalid Password"
            })
        }
        // token
        const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "2d"});
        res.status(200).send({
            success: true,
            message:"Login successfully..",
            user: {
                name : user.name,
                email : user.email,
                phone : user.phone,
                address : user.address,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log("error occur ", error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }
}

//  Test controller
export const testController = (req, res) => {
    res.send("Protected Routes")
}


// forgote password
export const forgotPasswordController = async (req, res) => {
    console.log("data ", req.body)
    try{
        const {email, answer, newPassword} = req.body;
        if(!email){
            return res.status(400).send("email is Required")
        } if (!answer) {
            return res.status(400).send("answer is Required")
        } if (!newPassword) {
            return res.status(400).send("new password is Required")
        }
        // check the email and the answer 
        const  user = await userModel.findOne({email, answer});
        // validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {password : hashed});
        res.status(200).send({
            success:true,
            message:"Passwoord Reset successfully"
        })
    }catch(err){
        console.log("error ", err.message);
        res.status(500).send({
            success:false,
            message:"something went wrong",
            err
        })
    }
}
// update profile controller

export const updateProfileController = async(req, res) => {
    
    try {
        const {name, password, phone, address} = req.body;
        console.log(name, password, phone, address, req.user.id)
        const user = await userModel.findById(req.user.id);
        if(password && password.length < 1){
            console.log("passwors is required", password)
            return res.status(400).send({
                success:false,
                message: "Password is Required"
            })
        }
        const hashedPassword  = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user.id , {
            name : name || user.name,
            password : hashedPassword || user.password,
            phone: phone || user.phone,
            address : address || user.address

        }, {new: true})
        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser
        })
    } catch (error) {
        console.log(error.message)
        res.status(400).send({
            message: "Error while Updating profile",
            success:false,
            error
        })
    }
}