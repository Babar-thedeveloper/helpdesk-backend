import { ZodError } from "zod";

 const validate = (schema) => (req, res, next) => {
    try {
        console.log("Validation running for:", req.method, req.originalUrl);
        console.log("Request body:", req.body ?? "No body provided");
        console.log("Request params:", req.params ?? "No params provided");
        console.log("Schema received:", schema);

        if (!schema) {
            console.log("No schema provided, skipping validation");
            return next();
        }

        let validatedData = {};

        //  Validate req.body if schema exists
        if (schema.body && typeof schema.body.parse === "function") {
            validatedData.body = schema.body.parse(req.body||{});
        }

        //  Validate req.params if schema exists
        if (schema.params && typeof schema.params.parse === "function") {
            validatedData.params = schema.params.parse(req.params);
        }

        req.validatedData = validatedData;
        console.log("Validated data:", req.validatedData);

        next();
    } catch (error) {
        if (error instanceof ZodError) {
            console.log("Zod validation errors:", error.errors);
            return res.status(400).json({
                success: false,
                message: "Validation failed. Please check the required fields.",
                errors: error.errors.map((err) => ({
                    field: err.path.join(".") || "unknown_field",
                    message: err.message,
                    code: err.code,
                })),
            });
        }

        console.log("Non-Zod error:", error.stack);
        next(error);
    }
};

export default validate;