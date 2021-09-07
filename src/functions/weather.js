import axios from 'axios';

export const fetchWeatherbyLoc = async(lat, long, setWeather, setShow, setErrData) => {
    try{
        const result = await axios.get('https://api.openweathermap.org/data/2.5/weather',{
            params: {
                lat: lat,
                lon: long,
                units: 'metric',
                appid: 'a9e72a597ccdb94c6dd5d0fefdbe33af'
            }
        });
        setWeather(result.data);
    }catch(err){
        if(err.response.status === 404){
            setErrData('Invalid Pincode of India.');
        }else if(err.response.status === 401 || err.response.status === 500 || err.response.status === 502 || err.response.status === 503 || err.response.status === 504){
            setErrData('API issue. Try again later');
        }
        setShow(true);
    }
    
    
};

export const fetchWeatherByZip = async(pincode, setWeather, setShow, setErrdata) => {
    try{
        const result = await axios.get('https://api.openweathermap.org/data/2.5/weather',{
            params: {
                zip: pincode+',in',
                units: 'metric',
                appid: 'a9e72a597ccdb94c6dd5d0fefdbe33af'
            }
        });
        setWeather(result.data);
    }catch(err){
        if(err.response.status === 404){
            setErrdata('Invalid Pincode of India.');
        }else if(err.response.status === 401 || err.response.status === 500 || err.response.status === 502 || err.response.status === 503 || err.response.status === 504){
            setErrdata('API issue. Try again later');
        }
        setShow(true);
    }
    
};