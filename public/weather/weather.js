//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
//api key====>40d5e99f83089298ed959d9af26769f2
let search=document.querySelector('.find');
let weather=document.querySelector('.weather');
search.onclick=async()=>{
weather.style.display='block'
let inp=document.querySelector('.inp');
let temp=document.querySelector('.temp');
let city=document.querySelector('.city');
let per=document.querySelector('.per');
let wind=document.querySelector('.win');
let photo=document.querySelector('.ph');
let country=document.querySelector('.country');
let inp2=document.querySelector('.inp2');
let co=inp2.value;
let c=inp.value; 
  //  console.log('hdhdhhd');
    if(c===''){
        weather.innerHTML='please enter city name';
        return;
   }else{
    try{
        let api=`http://localhost:5000/we/${c}`;
        let res=await fetch(api);
        let data= await res.json();
       
        console.log(data);
       
        city.innerHTML=c;
        country.innerHTML=co;
        temp.innerHTML= Math.round(data.main.temp)+'°c';
        per.innerHTML=data.main.humidity+'%';
       wind.innerHTML=data.wind.speed+' km/h';
   
    console.log(data.weather[0].main);
    console.log(photo.getAttribute('src'));
    
    if(data.weather[0].main=="Clouds"){
        photo.setAttribute('src','../imgs/clouds.png')
    }else if(data.weather[0].main=="Clear"){
        photo.setAttribute('src','../imgs/clear.png')
    }
    else if(data.weather[0].main=="Rain"){
        photo.setAttribute('src','../imgs/rain.png')
    }
    else if(data.weather[0].main=="Mist"){
        photo.setAttribute('src','../imgs/mist.png')
    }
    else if(data.weather[0].main=="Drizzle"){
        photo.setAttribute('src','../imgs/drizzle.png')
    }
    }catch(err){
        console.log(err);
        return weather.innerHTML='not found city by this name';
        
    }
   }
   

//console.log(photo.getAttribute('src'));
}

