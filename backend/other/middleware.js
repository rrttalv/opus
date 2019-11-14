import config from 'config';
import jsonwebtoken from 'jsonwebtoken';

export const authUser = (req, res, next) => {
    let token = req.header('x-auth-token');
    if(!token){
        res.status(401).json({success: false, message: "You are not authorized"});
        try{
            const decoded = jsonwebtoken.verify(token, config.get('jwtS'));
            req.user = decoded;
            next();
        }catch(err){
            res.status(400).json({success: false, message: "Please login again"})
        }
    }
}