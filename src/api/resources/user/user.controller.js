import userService from "./user.service";
import User, { STANDARD_ROLE } from "./user.model";
import jwt from "../../helpers/jwt";

export default {
    async signup(req, res){
        try{
            const { value, error } = userService.validateSignup(req.body);
            if(error){
                return res.status(400).json(error);
            }
            const encryptedPass = userService.encryptPassword(value.password);
            const user = await User.create({
                firstName : value.firstName,
                lastName : value.lastName,
                email : value.email,
                password : encryptedPass,
                role : value.role || STANDARD_ROLE
            });
            return res.json({ success : true });
        } catch (err){
            console.error(err);
            return res.status(500).send(err);
        }
    },

    async login(req, res){
        try {
            const {value, error} = userService.validateLogin(req.body);
            if (error){
                return res.status(400).json(error);
            } 

            const user = await User.findOne({ email : value.email});
            if (!user){
                return res.status(401).json({err : "Invalid email"});
            }

            const authenticated = userService.comparePassword(value.password, user.password);
            if (!authenticated){
                return res.status(401).json({err : "Wrong Password"}); 
            }

            const token = jwt.issue({id : user._id}, '1d');
            return res.json({ token });
        } catch (err) {
            console.error(err);
            return res.status(500).send(err);
        }
    },

    async authenticate(req, res){
        return res.json(req.user);
    }
}