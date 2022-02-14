const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.get("/", (req, res) => {
  res.json({ hello: "bitches" })
})

app.post("/run", (req, res) => {
  const { language = "cpp", code } = req.body
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "empty code body" })
  }

  return res.json({ language, code })
})

app.listen(5000, () => {
  console.log("Listening on port: 5000");
})