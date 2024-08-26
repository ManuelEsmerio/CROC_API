import { StatusCodes } from 'http-status-codes';
import pkg  from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    if(!bearerToken) return res.status(StatusCodes.FORBIDDEN).json({ message: 'Forbidden' });

    try {
        const bearerTokenList = bearerToken.split(" ");
        const token = bearerTokenList[1]
        pkg.verify(token.trim(), process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if(err) return res.status(StatusCodes.FORBIDDEN).json({
                // path: __dirname,
                status: StatusCodes.UNAUTHORIZED,
                message: 'Unauthorized',
                error: err.message
            });
            next();
        });
    } catch (error) {
        return res.status(401).json({
                // path: __dirname,
                status: 401,
                message: 'Unauthorized',
                error: error.message
            });
    }
}