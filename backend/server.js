import app from "./app.js";

const port = process.env.PORT || 5001;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
