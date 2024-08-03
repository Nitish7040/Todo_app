import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"

function App() {
  // const [count, setCount] = useState(0)

  useEffect(() =>{
    axios.get('/api')
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.error(error)
    })
  })

  return (
    <>
      <h1>hello</h1>
      {/* <p>name: {nitish }</p> */}
    </>
  )
}

export default App
