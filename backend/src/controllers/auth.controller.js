import { onboardValidation, signinValidation, signupValidation } from "../../types.js";
import { upsertStreamUser } from "../lib/stream.config.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/schema.js";
import bcrypt, { genSalt } from "bcryptjs"


export async function signup(req, res) {

    const Validation = signupValidation.safeParse(req.body);

    try {
        if (!Validation.success) {
            return res.status(400).json({ message: "Error signing up! Invalid inputs" })
        }
        const { fullname, email, password } = Validation.data;
        if(password.length < 6) {
            return res.status(400).json({ message: "password must be atleast 6 characters" });
        }
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(403).json({ message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        });
            await newUser.save();

             if (newUser) {
            generateToken(newUser._id, res)
          
            await upsertStreamUser({
            id: newUser._id.toString(),
            name: newUser.fullname,
            image: newUser.profilePic || "",
        });
            
             console.log(`Stream user created for ${newUser.fullname}`);

            return res.status(201).json({
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic
            })
        }
       
  
    } catch (error) {
        console.log("Error in signup", error.message);
        res.status(500).json({ message: "Internal server error" })
    }

}
export async function signin(req, res) {

    const Validation = signinValidation.safeParse(req.body);

    try {
          if (!Validation.success) {
        return res.status(403).json({ message: "Invalid Inputs" })
    }

    const {email, password} = Validation.data;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    const checkedPassword = await bcrypt.compare(password, user.password);

    if (!checkedPassword) {
        return res.status(401).json({ message: "Invalid credentials" })
    }

    generateToken(user._id, res);
    
    return res.status(201).json({
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profilePic: user.profilePic
    })
    } catch (error) {
        console.log("error in signingin" , error.message);
        return res.status(500).json({message : "Internal server error"})
    }
}
export async function logout(req, res) {
    try {
    res.clearCookie("jwt")
    return res.status(201).json({message : "logout succesfull"})
    } catch (error) {
    console.log("Error logging out" , error.message);
    return res.status(500).json({message : "Error logging out"})
    }
}
export async function onboard(req , res) {
  const userId = req.user._id;
  const Validation = onboardValidation.safeParse(req.body)
  try {
  if(!Validation.success){
    return res.status(401).json({message : "Invalid input"})
  }
  const {fullname , bio , nativeLanguage , learningLanguage , location} = Validation.data
  if(!(fullname && bio && nativeLanguage && learningLanguage && location)){
    return res.status(401).json({
        message : "Error! All fields are required",
        missingFields : [
            !fullname && "fullname",
            !bio && "bio",
            !nativeLanguage && "nativeLanguage",
            !learningLanguage && "learningLanguage",
            !location && "location"
        ].filter(Boolean)
    });
    
  }
  const updatedUser = await User.findByIdAndUpdate(userId , {
    ...req.body,
    isOnboarded : true
  } , {new : true});

  if(!updatedUser) {
    return res.status(404).json({message : "Error! User not found"})
  }

  try {
    await upsertStreamUser({
        id : updatedUser._id.toString(),
        name : updatedUser.fullname,
        image : updatedUser.profilePic || ""
    })
    console.log(`Stream user updated for ${updatedUser.fullname}`)
  } catch (streamError) {
    console.log("Error updating streamUser" , streamError.message)
  }
  res.status(200).json({message : "User Updated!!"})
  } catch (error) {
    console.log("Error in Upadate User" , error);
    return res.status(500).json({ message : "Internal server error"})
  }
}