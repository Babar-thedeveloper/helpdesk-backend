import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "QMS Backend",
            version: "1.0.0",
            description: "QMS Backend API documentation",
        },
        servers: [
            { url: "http://localhost:5000/api", description: "Local server" },
            { url: "https://ims-backend-five.vercel.app/", description: "Production server" }
        ]
    },
    apis: ["./src/routes/*.js"] 
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerUi, swaggerSpec };