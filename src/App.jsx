import React from 'react';
import { useState, useEffect } from 'react';

import './App.css'
import { DailyWeatherCard } from './DailyWeatherCard';
import { HourlyWeatherCard } from './HourlyWeatherCard';

import {Input} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faWater } from '@fortawesome/free-solid-svg-icons';
import { faGauge } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import Sunrise from './assets/sunrise.svg';

// OpenWeather API Key
// fc8a9d1968339d8ce6d94ae1681f4648


function App() {
  const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const API_key = 'fc8a9d1968339d8ce6d94ae1681f4648'
  const [weather, setWeather] = useState(undefined)
  const [date, setDate] = useState(undefined)

  function titleCase(str) {
    if (!str) {
      return 'Description'
    }

    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1); 
    }
    return splitStr.join(' '); 
  }

  function handleImageLink() {
    var link = 'https://openweathermap.org/img/wn/01d@2x.png'
    if (weather != undefined) {
      link = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`
    }

    return link
  }

  var cityName = ''
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      cityName = e.target.value
      fetchWeather()
    }
  }

  useEffect(() => {
    
  }, [weather])

  const fetchWeather = async () => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`)
      .then((response) => response.json())
      .then((_weather) => {
        setWeather(_weather)
        console.log(_weather)
        const d = new Date()
        const localOffset = d.getTimezoneOffset() * 60000
        const utc = d.getTime() + localOffset
        const city = utc + (1000 * _weather.timezone)
        const nd = new Date(city)
        setDate(nd)
      })
  }

  return (
    <>
      <Input
        className='mb-4'
        placeholder='Enter a city...'
        startContent={<FontAwesomeIcon icon={faMagnifyingGlass}/>}
        onKeyDown={handleKeyDown}/>

      <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-4">
        <Card className='flex p-auto'> {/* City name and time card */}
          <CardBody className='flex justify-center'>
            <span className='text-center'>{weather?.name || 'City'}, {weather?.sys.country || 'Country'}</span>
            <span className='text-6xl text-center'>{date?.getHours?.() || "00"}:{date?.getMinutes?.() || "00"}</span>
            <br />
            <span className='text-center'>{dayOfWeek.at(date?.getDay?.()) || "Date"}, {months.at(date?.getMonth?.()) || "Month"} {date?.getDate?.() || "Day"}</span>
          </CardBody>
        </Card>
        <Card className='p-5'> {/*Weather info card*/}
          <CardBody className='lg:grid lg:grid-cols-3 lg:px-10 xl:px-0 md:flex md:flex-col gap-10 lg:gap-0'>
            <div className='m-auto'>
              <span className='text-center text-5xl block'>{Math.round(weather?.main.temp - 273.15) || '--'}°C</span>
              <span className='text-center block'>Feels like {Math.round(weather?.main.feels_like - 273.15) || '--'}°C</span>
            </div>
            <div className='mx-auto'>
              <img src={handleImageLink()} alt='sunny' className='-mb-5' width={'150px'}/>
              <span className='block text-center text-xl'>{titleCase(weather?.weather[0].description)}</span>
            </div>
            <div className='grid grid-cols-2'>
              <div className='grid grid-rows-2 gap-10'>
                <div className='flex flex-col justify-center'>
                  <FontAwesomeIcon icon={faWater} className='fa-2x mb-1 fa-regular'/>
                  <p className='text-center text-xl'>{weather?.main.humidity || '--'}%</p>
                  <p className='text-center text-sm'>Humidity</p>
                </div>
                <div className='flex flex-col justify-center'>
                  <FontAwesomeIcon icon={faGauge} className='fa-2x mb-1 fa-regular'/>
                  <p className='text-center text-xl'>{weather?.main.pressure || '--'}hPa</p>
                  <p className='text-center text-sm'>Pressure</p>
                </div>
              </div>
              <div className='grid grid-rows-2 gap-10'>
                <div className='flex flex-col justify-center'>
                  <FontAwesomeIcon icon={faWind} className='fa-2x mb-1'/>
                  <p className='text-center text-xl'>{Math.round((weather?.wind.speed * 3.6)) || '--'}km/h</p>
                  <p className='text-center text-sm'>Wind Speed</p>
                </div>
                <div className='flex flex-col justify-center'>
                  <FontAwesomeIcon icon={faArrowUp} className='fa-2x mb-1' style={{ transform: `rotate(${weather?.wind.deg || 0}deg)` }}/>
                  <p className='text-center text-xl'>{weather?.wind.deg || '-'}°</p>
                  <p className='text-center text-sm'>Wind Direction</p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <br />
      <div className='grid grid-cols-3 gap-4'>
      </div>
    </>
  )
}

export default App
