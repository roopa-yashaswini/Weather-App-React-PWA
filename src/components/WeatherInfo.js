import React, {useEffect, useState} from 'react';
import { Card} from 'react-bootstrap';
import {FormControl, Container} from 'react-bootstrap';
import { isMobile } from "react-device-detect";
import { showError } from '../functions/location';
import { fetchWeatherbyLoc, fetchWeatherByZip } from '../functions/weather';
import AlertDismissible from './Alert';

const WeatherInfo = () => {
    const [pincode, setPincode] = useState('');
    const [weather, setWeather] = useState(null);
    const [data, setData] = useState('Loading');
    const [show, setShow] = useState(false);
    const [errData, setErrData] = useState('');

    useEffect(() => {
        function getError(error) {
            let res = showError(error);
            setData(res);
        }
        function showPosition(position) {
            fetchWeatherbyLoc(position.coords.latitude, position.coords.longitude, setWeather, setShow, setErrData);
          }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, getError);
          }else{
            setData('Geolocation not supported by the device');
          }
    }, []);

    const pincodeHandler = (e) => {
        setPincode(e.target.value);
    }

    const keyHandler = (e) => {
        if(e.code === 'Enter'){
            console.log(pincode);
            fetchWeatherByZip(pincode, setWeather, setShow, setErrData);
        }
    }

    if(!weather){
        return (
            <Card style={{textAlign: 'center', padding: '2rem', borderRadius: '1rem'}} className={`${isMobile ? 'w-75' : 'w-25'}`}>
                <Card.Body>
                    <h3>{data}</h3>
                </Card.Body>
            </Card>
        );
    }
    return (
        <>
            <Container  className={`${isMobile ? 'w-75' : 'w-25'} m-4`}>
                {show && <AlertDismissible setShow={setShow} data={errData} />}
                <FormControl type="text" placeholder="Pincode" value={pincode} onChange={pincodeHandler} onKeyDown={keyHandler} />
            </Container>
            <Card style={{textAlign: 'center', padding: '2rem', borderRadius: '1rem'}} className={`${isMobile ? 'w-75' : 'w-25'}`}>
                <Card.Body>
                    <Card.Title style={{fontWeight: 'bolder'}}>{weather && weather.name}</Card.Title>
                    <Card.Img src={ weather.weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                    <p>{weather && weather.weather[0].main}</p>
                    <h2>
                        {weather && weather.main.temp}
                        <span>&#x2103;</span>
                    </h2>
                </Card.Body>
            </Card>
        </>
    );
};

export default WeatherInfo;