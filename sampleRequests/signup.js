const axios = require('axios')

async function login () {
  const postUrl = `http://localhost:4000/signup`

  const response = await axios.post(postUrl, {
    name: "signup-test-create",
    email: "signup@testsss.com",
    password: "test@signup.com",
    action: "create",
    householdName: "Sequoia25",
    startDate: new Date(),
    recurrence: 7
  })

  console.log(response.data)
}

login()