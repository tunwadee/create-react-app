import React, { useEffect, useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import queryString from 'query-string'
import { Buffer } from 'buffer'

function Authorize(params) {
  const [authenOK, setAuthenOK] = useState(false)
  let { authorize } = useParams()
  let navigate = useNavigate()
  console.log(authorize)

  useEffect(() => {
    let base64ToString = Buffer.from(authorize, 'base64').toString()
    const extractToken = queryString.parse(base64ToString)
    console.log("extractToken->".extractToken)
    setAuthenOK(true)
    localStorage.setItem('token', JSON.stringify(extractToken))

    return navigate('/')
  }, [authenOK, params])
console.log(authenOK)
  return <></>
}
export default Authorize