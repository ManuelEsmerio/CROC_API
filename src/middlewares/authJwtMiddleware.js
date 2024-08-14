import pkg  from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {

    const token = req.headers('auth-token');
    if(!token) return res.status(403).json({ message: 'Forbidden' });

    try {
        pkg.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if(err) return res.status(403).json({
                // path: __dirname,
                status: 401,
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