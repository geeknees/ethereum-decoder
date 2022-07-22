import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import './App.css'

function App() {
  const [abiData, setAbiData] = useState<string[]>([])
  const [encodedData, setEncodedData] = useState('')
  const [decodedData, setDecodedData] = useState({})

  const handleAbiChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    event.preventDefault()
    setAbiData(event.target.value.replace(/['"\[\]]+/g, '').split(','))
  }

  const handleEncodeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    event.preventDefault()
    setEncodedData(event.target.value)
  }

  const handleSubmit = (event: React.SyntheticEvent): void => {
    // Stop the defaults from the browser
    event.preventDefault()
  }

  useEffect(() => {
    try {
      let data = ethers.utils.hexDataSlice(encodedData, 4)
      let decodeData = ethers.utils.defaultAbiCoder.decode(abiData, data)
      console.log(decodeData)
      setDecodedData(decodeData)
    } catch (error) {
      console.log(error)
    }
  }, [abiData, encodedData])

  return (
    <div className='App'>
      <h1>ethereum-decoder</h1>
      <div className='card'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>ABI</label>
          <div className='encoded-data'>
            <textarea onChange={handleAbiChange} rows={10} cols={50} required />
          </div>
          <label htmlFor='name'>Input Data</label>
          <div className='encoded-data'>
            <textarea
              value={encodedData}
              onChange={handleEncodeChange}
              rows={20}
              cols={50}
              required
            />
          </div>
        </form>
      </div>

      <div className='card'>
        <h2>decoded data</h2>
        <pre>{JSON.stringify(decodedData, null, 2)}</pre>
      </div>
    </div>
  )
}

export default App
