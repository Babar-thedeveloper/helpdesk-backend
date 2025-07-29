import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import expres from "express";


const middlewares=(app)=>{
    app.use(expres.json());
    app.use(cors({ origin: 'http://localhost:5173' }));
    
    app.use(helmet());
    app.use(morgan("dev"));
};

export default middlewares;