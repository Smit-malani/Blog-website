const jwt = require('jsonwebtoken')

module.exports.verifyJwtToken = async (token) => {
    try {
        let isValid = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        return true
    } catch (err) {
        return false
    }
    
}