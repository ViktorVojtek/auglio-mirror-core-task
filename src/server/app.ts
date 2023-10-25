import express from "express";
import path from "path";

const app = express();
const PORT = 3000;
const publicDirectory = path.join(__dirname, "../public");

export default function App() {
  app.use(express.static(publicDirectory));

  app.get("/", (_, res) => {
    const indexPath = path.join(__dirname, "./views/index.html");

    res.sendFile(indexPath);
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
