

const erorrHandler=(err,req,res,next)=>{
    console.error("Error Handler:",err.message);
    const statusCode=err.status||500;
    res.status(statusCode).json({
        success:false,
        message:err.message||"Internal Server Error",
        erorrs:err.erros||[],
        stack:process.env.NODE_ENV==="development"?err.stack:"Env is not development",   
    });
};
export default erorrHandler;
