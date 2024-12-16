const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const registerUser = async(req, res) => {
    const {name, email, password} = req.body
    try {
        const existingUser = await User.findOne({email})
        if (existingUser) return res.status(400).json({message: 'User already exist'})
        
        const user = new User({name, email, password})
        await user.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(201).json({token})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const loginUser = async(req, res) =>{
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user) return res.status(404).json({ message: "User not found" });
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {registerUser, loginUser}