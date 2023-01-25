const User = require("./../models/Users");
const colors = require("colors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName) {
      return res.status(500).json({ errorMessage: "First Name is required!" });
    }
    if (!lastName) {
      return res.status(500).json({ errorMessage: "Last Name is required!" });
    }
    if (!email) {
      return res.status(500).json({ errorMessage: "Email is required!" });
    }
    if (!password) {
      return res.status(500).json({ errorMessage: "Password id required!" });
    }
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(500).json({ errorMessage: "Email already exists!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    const saveUser = await newUser.save();

    const token = jwt.sign(
      {
        user: saveUser._id,
      },
      process.env.JWT_SECRET
    );

      res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({status:'Registration Successful!',data:saveUser});
  } catch (error) {
    return res.json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
    if (!email) {
      return res.status(500).json({ errorMessage: "Email is required!" });
    }
    if (!password) {
      return res.status(500).json({ errorMessage: "Password id required!" });
    }
  try {
    
    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(500).json({ errorMessage: "Wrong email or password!" });
    }

    const verifyPassword = await bcrypt.compare(password, exist.password);
    if (!verifyPassword) {
      return res.status(500).json({ errorMessage: "Wrong email or password!" });
    }
    const token = jwt.sign(
      {
        user: exist._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({status:'Login Successful!',data:exist});
  } catch (error) {
    return res.json(error);
  }
};

const checkLoggedIn = async(req,res,next)=>{
  try {
    const token = req.cookies.token;
    if(!token){
        return res.json(false)
    }
       jwt.verify(token,process.env.JWT_SECRET)
        res.json(true)
    } catch (error) {
        res.json(false)
    }
}

const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  })
  .send('logged out successfully');
};

const getProfile = async (req, res) => {
  try {
    const id = req.user.user;
    console.log(id)
    const user =await User.findById(id).select('-password');
    if (!user) {
      res.status(404).json({ errorMessage: "User not found!" });
    }
    res.status(200).json(user)
  } catch (error) {
     res.status(404).json({ errorMessage: "User not found!" });
  }
};

const getUsers= async(req,res)=>{
    try {
        const users = await User.find()
        if(!users){
            res.status(404).json({errorMessage:"Users not found!"})
        }
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json({errorMessage:"Users not found!"})
    }
}

module.exports = {
  createUser,
  loginUser,
  getProfile,
  logoutUser,
  getUsers,
  checkLoggedIn
};
