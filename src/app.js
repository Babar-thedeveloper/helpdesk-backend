import express from 'express';
import middlewares from './middlewares/index.js';
import routes from './routes/index.js';
import erorrHandler from './middlewares/erorr.handler.js';
import {swaggerUi,swaggerSpec} from './config/swagger.js';
import path from 'path';

const app = express();

app.use('/uploads', express.static('uploads'));

middlewares(app);


app.use("/api",routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 



app.use((req, res, next) => {
    res.status(404).json({ success: false, message: "Route Not Found" });
  });


app.use(erorrHandler);



export default app;