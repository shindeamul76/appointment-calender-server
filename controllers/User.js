const User = require('../models/User')


exports.Register = async (req, res) => {

    try {
        
        const {username, email, password} = req.body;
        
        let user = await User.findOne({email});
        
        if (user) {
            return res
            .status(400)
            .json({
                message: 'User already exits',
            })
        }

        user = await User.create({ 
            username , 
            email, 
            password, 
        });


        res.status(201).json({
            user,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            massage: error.massage,

        })
    }
}


exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email}).select('+password');

        if (!user) {
            return res.status(400).json({
                message: "User does not exits"
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Incorrect Password"
            })
        }

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        res.status(200).cookie("token", token, options).json({
            user,
            token,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.logOut = async (req, res) => {
    try {
        
        res.status(200)
        .cookie("token", null, {expires: new Date(Date.now()), httpOnly: true})
        .json({
            success: true,
            message: "Logged Out",
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}