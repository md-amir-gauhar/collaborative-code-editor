const express = require("express");
const { generateFile } = require('./generateFile')
const { executeCpp } = require('./executeCpp')
const app = express();

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.get("/", (req, res) => {
  return res.json({ hello: "bitches" })
})

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "empty code body" })
  }

  // need to generate cpp file with content from the request
  const filepath = await generateFile(language, code)

  //run the file and send the response
  const output = await executeCpp(filepath).then(data => console.log(data)).catch(err => console.log(err))
  return res.json({ filepath, output })
})

app.listen(5000, () => {
  console.log("Listening on port: 5000");
})