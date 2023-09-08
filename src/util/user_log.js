import axios from 'axios'

export const createUserLog = async (json) => {
  // let url = 'http://localhost:9000/api/v2/user_log'
  let url = 'http://10.1.2.48:9000/api/v2/user_log'

  const jsonStr = JSON.stringify(json)

  await axios
    .post(url, json, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(
      (response) => {
        //console.log(response)
      },
      (error) => {
        //console.log(error)
      },
    )
}