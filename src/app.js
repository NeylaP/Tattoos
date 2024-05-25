const express = require('express')
const dotenv = require('dotenv')
dotenv.config();

const app = express()

const PORT = process.env.PORT || 4000

app.get('/api/healthy', (req, res) => {
  res.status(200).json(
    {
      success: true,
      message: "My APP server is healthy" 
    }
  )
})

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
})