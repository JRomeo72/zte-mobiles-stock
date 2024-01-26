import jwt from 'jsonwebtoken';

export const authorized = (req, res, next) => {
    if(!req.headers.cookie) return res.status(403).redirect('/');

    let token = req.headers.cookie.slice(6);
    try {
        let authorization = jwt.verify(token, process.env.JWT_SECRET)
        if(!authorization) return res.status(401).redirect('/login');
    } catch (error) {
        if(error.message === 'jwt expired') res.redirect('/login')
    }
    
    req.token=true
    next()
};

export const authorize = (req, res, next) => {
    if(req.headers.cookie) {
        let token = req.headers.cookie.slice(6);
        try {
            let authorization = jwt.verify(token, process.env.JWT_SECRET)
            if(authorization) {
                return res.redirect('/stock')
            };
        } catch (error) {
            if(error.message === 'jwt expired') { req.token=false; return next() }
        }
    }
    
    req.token=false
    next()
    // try {
    //     if(req.headers.cookie) {
    //         let token = req.headers.cookie.slice(6);
    //         let authorization = await jwt.verify(token, process.env.JWT_SECRET)

    //         if(authorization) {
    //             return res.redirect('/stock');
    //         } else {
    //             req.token=false;
    //             next()
    //         }
    //     }

    //     req.token=false;
    //     next()
    // } catch (error) {
    //     res.status(401).redirect('/');
    // }
}