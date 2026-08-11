import { useState } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import WeatherInfo from '../components/WeatherInfo'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
      <Header />
      <WeatherInfo />
    </div>
  )
}

export default App
