
const express = require('express')
const axios = require('axios');
const secrets = require('./da')
const adhan = require('adhan');
//const geocoder=require('geocoder');
//const Nominatim = require('nominatim-geocoder')
//const geocoder = new Nominatim()
const app = express();
const port = 5000;
const path = require('path');
app.use(express.static('public'))

//console.log(adhan);
//console.log(geocoder);


/*===========weather api =============*/
app.get('/we/:city', async (req, res) => {
    const city = req.params.city;
    let key = secrets.key;
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

    if (!city || city === '') {
        return res.status(400).json('not found city name try agine')
    } else {
        try {
            const data = await axios.get(api);
            const weData = await data.data;
            res.status(200).send(weData);
            console.log(data);

        } catch (err) {
            console.log(err);
            res.status(500).json(' Invalid city name. ');
        }
    }

});



/*=============azantime api============*/

app.get('/adhanTime/:city', async (req, res) => {
    const city = req.params.city;
    let key = secrets.key;
    let api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    try {

        if (!city) {
            return res.status(400).json('not found city by this name');
        } else {
            let AData = await axios.get(api);
            let Ddata = await AData.data.coord;
            //  console.log(response.data);
            const cname = new adhan.Coordinates(Ddata.lat, Ddata.lon); 
            // console.log(cname);
            const date = new Date();
            const para = adhan.CalculationMethod.Other(); 
            const adhanT = new adhan.PrayerTimes(cname, date, para);
            const times = {
                fajr: adhanT.fajr.toLocaleTimeString(),  
                sunrise: adhanT.sunrise.toLocaleTimeString(),
                dhuhr: adhanT.dhuhr.toLocaleTimeString(),
                asr: adhanT.asr.toLocaleTimeString(),
                sunset: adhanT.sunset.toLocaleTimeString(),
                maghrib: adhanT.maghrib.toLocaleTimeString(),
                isha: adhanT.isha.toLocaleTimeString(),
            };
            res.status(200).json(times);
            console.log(times + `at ${cname}`);
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json('invalid city')
    }
})

/*=============location api ===========*/


app.get('/address/:lat/:long', async (req, res) => {
    const lat = req.params.lat;
    const long = req.params.long;
    const api = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;

    try {
        if (!lat || !long) {
            return res.status(400).json('can not get location enter lat and long');
        } else {
            const data = await axios.get(api);
            const addData = await data.data;
            console.log(addData);
            res.status(200).json(addData);
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json('invalid coord')
    }



})






app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
})
app.get('*', (req, res) => {
    res.status(404).send('page not found ')
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});








































































