const User = require('../models/User');

const alertError = err => {
    let errors = { name: '', email: '', password: '' };
    // console.log(err.message)
    if (err.message.includes('user validation failed')) {
        console.log('err.errors', err.errors)
        console.log('err.errors values 0', Object.values(err.errors)[0])
        console.log('err.errors values 1', Object.values(err.errors)[1])
        Object.values(err.errors).forEach(error => {
            console.log(error.properties)
        })
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    console.log(errors)
    return errors
}
module.exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ user });
    } catch (error) {
        const errors = alertError(error)
        // res.status(400).send('Fail to create user')
        res.status(400).json({ errors })
    }

}
module.exports.login = (req, res) => {
    res.send('login')
}
module.exports.logout = (req, res) => {
    res.send('logout')
}