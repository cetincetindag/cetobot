const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post('/sync-licence', (req, res) => {
  console.log('Sync Licence request received');
  res.json({ success: true });
});

app.post('/check-token', (req, res) => {
  console.log('Check Token request received');
  res.json({ valid: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
