import Navbar from '../components/Navbar'
import Header from '../components/Header'
import WeatherInfo from '../components/WeatherInfo'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <WeatherInfo />
    </div>
  )
}

export default App