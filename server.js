const express = require("express")
const cors = require("cors")
const atob = require("atob")
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.post("/sync-licence", (req, res) => {
  console.log("Sync Licence request received")
  const { playerCode, validationToken } = req.body

  if (!validationToken) {
    return res
      .status(400)
      .json({ success: false, message: "Validation token is missing" })
  }

  try {
    const decodedToken = JSON.parse(atob(validationToken))
    res.json({ success: true, licenseKey: decodedToken.licenseKey })
  } catch (error) {
    console.error("Error decoding validation token:", error)
    res
      .status(500)
      .json({ success: false, message: "Failed to decode validation token" })
  }
})

app.post("/check-token", (req, res) => {
  console.log("Check Token request received")
  const { token } = req.body

  if (!token) {
    return res.status(400).json({ success: false, message: "Token is missing" })
  }

  try {
    const decodedToken = atob(token)

    const [licenseKey, playerCode, version, flag] = decodedToken.split("|")

    const response = {
      data: {
        playerCode: playerCode,
        licenseKey: licenseKey,
        version: version,
        flag: flag,
      },
      checksum: "expected-checksum",
      shouldUpdate: false,
    }

    res.json(response)
  } catch (error) {
    console.error("Error decoding token:", error)
    res.status(500).json({ success: false, message: "Failed to decode token" })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
