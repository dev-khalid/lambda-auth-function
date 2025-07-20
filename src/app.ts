import express, { Request, Response, NextFunction } from "express";
import { authHandler } from "./handlers/auth";

const app = express();

app.use(express.json()); // To parse JSON bodies

app.get("/auth", authHandler);

app.use("*", (req: Request, res: Response) => {
  res
    .status(404)
    .json({
      message: "Not Found",
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString(),
    });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something broke!", timestamp: new Date().toISOString() });
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
