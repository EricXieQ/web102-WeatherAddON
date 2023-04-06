import { useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'
import DailyTemperature from '../Components/DailyTemperature'
import SideNav from '../Components/sideNav'

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function App() {

  const [apiData, setData] = useState(null)
  const [apiTime, setAPITime] = useState([])
  const [apiTemp, setAPITemp] = useState([])

  const [searchInput, setSearchInput] = useState("")
  const [filteredResults, setFilteredResults] = useState([]); 

  const URL = "https://api.open-meteo.com/v1/forecast?latitude=42.89&longitude=-78.88&hourly=temperature_2m"

  const fetchData = async () => {
    const response = await axios.get(URL)
    setData(response.data)
  }
    
  useEffect( () => {
      fetchData()
  }, [])

  useEffect( () => {
    if(apiData != null){
      setAPITemp(apiData.hourly.temperature_2m)
      setAPITime(apiData.hourly.time)
    }

  }, [apiData])

  const searchItems = searchValue => {

    setSearchInput(searchValue);
    if(searchValue !== ""){

      const filteredData = apiTime.filter((time) => {

        return time.includes(searchValue)

      })
      setFilteredResults(filteredData)

    }else{

      setFilteredResults(apiTime)
    }
  }

  function dataList (apiTime, apiTemp) {
    let list = []

    apiTime.forEach((time, index)=> {
      let obj = {}
      obj['name'] = time
      obj["temperature"] = apiTemp[index]

      console.log(obj)
      list.push(obj)
    })
    return list
  }

  const data = dataList(apiTime, apiTemp)

  //<WeatherDetail windSpeed = {apiWindSpeed} humility = {apiHumitity} total = {apiTime.length} sum_temp = {apiTemp.reduce((x,y) => {return (x+y)},0)} max = {Math.max(...apiTemp)}/>
  return (
    <div className="App">
      <SideNav total = {apiTime.length} sum_temp = {apiTemp.reduce((x,y) => {return (x+y)},0)} max = {Math.max(...apiTemp)}/>
      <h1 className="header">Buffalo Weather!</h1>
      <div className='whole-page'>
        <input
            type="text"
            placeholder="Search..."
            onChange={(inputString) => searchItems(inputString.target.value)}
        />
        <div className='main-list'>

          {searchInput.length > 0
            ? <ul>{filteredResults.map((time, index) => <DailyTemperature key ={index} time = {time} temp = {apiTemp[index]} index = {index} />)}</ul>
            : <ul>{apiTime.map((time, index) =>
              <DailyTemperature key ={index} time = {time} temp = {apiTemp[index]} index = {index} />        
            )}</ul>
            
          }

        </div>
        <div>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="temperature" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
      </div>
      </div>
    </div>

  )
}

export default App
