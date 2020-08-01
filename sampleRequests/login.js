const axios = require('axios')
const moment = require('moment')

async function login (email="test@test.com", password="test123") {
  const postUrl = `http://localhost:4000/login`

  const response = await axios.post(postUrl, {
    email,
    password
  })

  console.log(response.data)
}

login()