/*
const express = require('express');
const books = require('./data')
const app = express();
const port = 3000;

//to handle body
app.use(express.json());

//get all-books
app.get('/books', (req, res) => {

    res.json(books)
});


//get one book

app.get('/books/:id', (req, res) => {
    const bookId = Number(req.params.id)
    console.log(bookId);
    const book = books.find((one) => {

        return one.id === bookId
    });
    if (!book) {
        return res.status(400).json('not added yet , sorry...');
    }
    res.status(200).json(book)
})

//add new book

app.post('/books', (req, res) => {
    console.log(req.body);
    const newBook = {
        id: books.length + 1,
        name: req.body.name,
        price: req.body.price,
    };
    books.push(newBook);
    res.status(200).json(books)
})

//update book

app.patch('/books/:id', (res, req) => {
    const bookId = +req.params.id;
    let book=books.find((one)=>one.id===bookId);
    if (!book) {
        return res.status(404).json('not founded book , sorry...');
    }
    book={...book,...req.body}
    console.log(book);
    res.status(200).json(book)
})

//delete book

app.delete('/books/:id',(req,res)=>{
    const bookId= +req.params.id;
    let book=books.filter((one)=>{
        return one.id!==bookId;
    });
    console.log(book);
    console.log(books);
    res.status(200).json(book)
})

// server running
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})*/
/*
const express=require('express');
const app=express();
const port=5000;
 app.use(express.json());
app.get('/',(req,res)=>{
    res.json('hello')
});
app.get('/weather/:city',(req,res)=>{
    const city=req.params.city;
})

const express=require('express');
const app = express();
const apiKey = '40d5e99f83089298ed959d9af26769f2'; // ادخل API Keyكنت اخذتها من OpenWeatherMap ở الخطوة 1
const port=5000;
app.get('/weather', (req, res) => {
    const city = req.query.city;
    if (!city) {
      return res.status(400).send('Please provide a city name as query parameter');
    }
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    const request = require('request');
  
    request(url, { json: true }, (err, response, body) => {
      if (err) {
        return res.status(500).send('Error fetching weather data');
      }
      if (response.statusCode === 200) {
        res.send(body);
      } else {
        res.status(response.statusCode).send(body.message);
      }
    });
  });


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});
*/




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
            const cname = new adhan.Coordinates(Ddata.lat, Ddata.lon); //بتحول الاحداثيات لموقع جغرافي
            // console.log(cname);
            const date = new Date();
            const para = adhan.CalculationMethod.Other(); // حساب اوقات الصلاة بناءا علي منظمة ما
            const adhanT = new adhan.PrayerTimes(cname, date, para);
            const times = {
                fajr: adhanT.fajr.toLocaleTimeString(),  // عشان احول الوقت الي حروف 
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







































































/*




  try {
    // جلب الموقع الجغرافي للمدينة المُدخلة
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
    const location = response.data.coord;
    const coordinates = new adhan.Coordinates(location.lat, location.lon);

    // تعريف التاريخ الحالي
    const date = new Date();

    // تعريف المعاملات اللازمة لاسترجاع أوقات الصلاة
    const params = adhan.CalculationMethod.Other(); // يمكنك استخدام طريقة حساب أخرى إذا رغبت

    // استرجاع أوقات الصلاة
    const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

    // إرجاع أوقات الصلاة كاستجابة API
    res.json({
      fajr: prayerTimes.fajr.toLocaleTimeString(),
      sunrise: prayerTimes.sunrise.toLocaleTimeString(),
      dhuhr: prayerTimes.dhuhr.toLocaleTimeString(),
      asr: prayerTimes.asr.toLocaleTimeString(),
      maghrib: prayerTimes.maghrib.toLocaleTimeString(),
      isha: prayerTimes.isha.toLocaleTimeString()
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); */

/*
app.get('/prayer-times', (req, res) => {
  const { city } = req.query;

  // تعريف الموقع الجغرافي للمدينة المُدخلة
  const coordinates = new adhan.Coordinates(37.7749, -122.4194); // مثال: سان فرانسيسكو

  // تعريف التاريخ الحالي
  const date = new Date();

  // تعريف المعاملات اللازمة لاسترجاع أوقات الصلاة
  const params = adhan.CalculationMethod.Other(); // يمكنك استخدام طريقة حساب أخرى إذا رغبت

  // استرجاع أوقات الصلاة
  const prayerTimes = new adhan.PrayerTimes(coordinates, date, params);

  // إرجاع أوقات الصلاة كاستجابة API
  res.json({
    fajr: prayerTimes.fajr.toLocaleTimeString(),
    sunrise: prayerTimes.sunrise.toLocaleTimeString(),
    dhuhr: prayerTimes.dhuhr.toLocaleTimeString(),
    asr: prayerTimes.asr.toLocaleTimeString(),
    maghrib: prayerTimes.maghrib.toLocaleTimeString(),
    isha: prayerTimes.isha.toLocaleTimeString()
  });
});

*/
