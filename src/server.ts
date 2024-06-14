import app from "./apps/app";
const port = process.env.APP_PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})