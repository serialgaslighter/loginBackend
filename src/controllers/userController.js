import { User } from "../models/userModel.js";
import { hashPassword } from "../apps/hashPassword.js";
import { comparePassword } from "../apps/comparePassword.js";

export const registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
        email: email,
        username: username,
        password: hashedPassword
    })

    res.status(200).json({
      msg: 'User registration successful.',
      registeredUser: newUser
    })
  } catch (error) {
    next(error)
  }
}

export const loginUser = async (req, res, next) => {
  try {
    const { emailOrUsername, password } = req.body;

    const user = await User.findOne({
      $or: [{email: emailOrUsername}, {username: emailOrUsername}]
    })

    if (!user) {
      return res.json({msg: 'User not found.'})
    }
    
    const passwordMatches = await comparePassword(password, user.password);

    if (!passwordMatches) {
      return res.json({msg: 'Incorrect Password.'})
    }

    res.status(200).json({msg: 'Login successful.'})
  } catch (error) {
    next(error);
  }
}