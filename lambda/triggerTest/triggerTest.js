const fetch = require('node-fetch')

const handler = async function (event) {
  let parameters = event.queryStringParameters;
  parameters.adhoc_run = true;
  if (parameters.adhoc_parallelism) {
    parameters.adhoc_parallelism *= 1;
  }
  const headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Circle-token": process.env.CIRCLE_TOKEN,
    "project-slug": "github/electro-creative-workshop/qa-automation-selenide"
  }

  const body = {
    "branch": process.env.CIRCLE_BRANCH,
    "parameters": parameters
  }

  try {
    const response = await fetch('https://circleci.com/api/v2/project/github/electro-creative-workshop/qa-automation-selenide/pipeline', {
      headers: headers,
      method: "POST",
      body: JSON.stringify(body)
    })
    if (!response.ok) {
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
