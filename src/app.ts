import express from "express";
import { authHandler } from "./handlers/auth";

const app = express();

app.use(express.json()); // To parse JSON bodies

app.get("/auth", authHandler);

// Export the app for Lambda
export { app };

// Only start the server if this file is run directly (not imported)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
