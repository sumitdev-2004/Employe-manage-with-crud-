

module.exports = (req,res,next)=>{
    if(!req.session.getemp){
        return res.status(401).json({loggedIn:false})
    }

    next();
}