import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideNav from "./sideNav";
import axios from "axios";

const WeatherDetail = () => {

    const [apiDetailData, setAPIDetailData] = useState(null)
    const [apiWindSpeed, setAPIWindSpeed] = useState([])
    const [apiHumitity, setAPIHumitiy] = useState([])

    const {Date,hour,index} = useParams()    
    const more_detail_url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m"

    const fetchData = async () => {
        const response2 = await axios.get(more_detail_url)
        setAPIDetailData(response2.data)
    }
    
    useEffect( () => {
        fetchData()
    }, [])

    useEffect( () => {
        if(apiDetailData != null){
          setAPIHumitiy(apiDetailData.hourly.relativehumidity_2m)
          setAPIWindSpeed(apiDetailData.hourly.windspeed_10m)
        }
    
      }, [apiDetailData])



    return(

        <div>
            <SideNav/>
            <h1>{Date}</h1>
            <h2>{hour}</h2>
            <table>
                <tbody> 
                    <tr>
                        <th>Wind Speed:</th>
                        <td>{apiWindSpeed[index]} km/h</td>
                    </tr>

                    <tr>
                        <th>Humidity:</th>
                        <td>{apiHumitity[index]} %</td>
                    </tr>
                </tbody>
            </table>    
        </div>

        

    )

}

export default WeatherDetail