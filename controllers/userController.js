const User = require("../models/user");
const { registerUser, loginUser } = require("../validators/userValidator");
const bcrypt = require("bcrypt");
const transporter = require("../config/mail");
const generateToken = require("../utils/generateToken");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: `Xatolik yuz berdi: ${error.message}`,
    });
  }
};
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `User topilmadi!`,
      });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: `Xatolik yuz berdi: ${error.message}`,
    });
  }
};
exports.registerUser = async (req, res) => {
  try {
    const validation = registerUser.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: validation.error.issues.map((issue) => issue.message),
      });
    }
    const { name, age, email, password } = validation.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: `Bu email allaqachon ro'yxatdan o'tgan!`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      age,
      email,
      password: hashedPassword,
    });
    res.status(201).json({
      message: `Ro'yxatdan muvaffaqqiyatli o'tdingiz!`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Xatolik yuz berdi: ${error.message}`,
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const validation = loginUser.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        message: validation.error.issues.map((issue) => issue.message),
      });
    }
    const { email, password } = validation.data;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: `User topilmadi!`,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: `Email va Parol to'g'ri kirtilishi shart!`,
      });
    }
    const token = generateToken(user);
    res.status(200).json({
      message: `Kirish amalga oshdi!`,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: `Xatolik yuz berdi: ${error.message}`,
    });
  }
};
exports.editUser = async (req, res) => {
  try {
    const { name, age, email, password } = req.body;
    const updateData = { name, age, email };
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({
        message: `User topilmadi!`,
      });
    }
    res.status(200).json({
      message: `User muvaffaqqiyatli yangilandi!`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: `Xatolik yuz berdi: ${error.message}`,
    });
  }
};
exports.delUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: `User topilmadi!`,
      });
    }
    res.status(200).json({
      message: `User o'chirildi!`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Xatolik yuz berdi: ${error.message}`,
    });
  }
};
const otpStore = {};
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(404).json({
        message: `Email topilmadi!`,
      });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    otpStore[email] = otp;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Sizing kodingiz: ${otp}`,
    });
    res.status(200).json({
      message: `Kod yuborildi!`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Xatolik yuz berdi: ${error.message}`,
    });
  }
};
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        message: `Email va kod kirtilishi shart!`,
      });
    }
    if (otpStore[email] == otp) {
      return res.status(200).json({
        message: `Kirish kodi tasdiqlandi!`,
      });
    }
    res.status(400).json({
      message: `Kod xato iltimos qaytda urinib ko'ring!`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Xatolik yuz berdi: ${error.message}`,
    });
  }
};
exports.profile = async (req, res) => {
    try {
         res.status(200).json({
    message: "Profilingizga kirdingiz!",
    user: req.user,
  });
    } catch (error) {
        res.status(500).json({
      message: `Xatolik yuz berdi: ${error.message}`,
    });
    }
 
};
