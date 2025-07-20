import express, { Request, Response, NextFunction } from "express";
import { authHandler } from "./handlers/auth";

const app = express();

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true }));


app.use("*", authHandler);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something broke!",
    timestamp: new Date().toISOString(),
    error: err?.message,
    err,
    stack: err?.stack,
    requestData: {
      method: req.method,
      url: req.url,
      query: req.query,
      params: req.params,
      headers: req.headers,
      body: req.body,
    },
  });
});
// Export the app for Lambda
export { app };

// Only start the server if this file is run directly (not imported)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
