

let pp = document.querySelector('.pp');
let btn = document.getElementById('btn');
btn.onclick = async () => {
  let prayt = document.querySelector('.prayt')
  pp.style.display = 'block'
  let city = document.getElementById('city');
  let country = document.getElementById('country');
  let c = city.value;
  let co = country.value;
  let whc = document.querySelector('.whc');
  let whco = document.querySelector('.whco');
  whc.innerHTML = c;
  whco.innerHTML = co;
  let ptif = document.querySelector('.ptif');
  let ptisun = document.querySelector('.ptisun');
  let ptiD = document.querySelector('.ptiD');
  let ptiA = document.querySelector('.ptiA');
  let ptisuns = document.querySelector('.ptisuns');
  let ptiM = document.querySelector('.ptiM');
  let ptiI = document.querySelector('.ptiI');
  if (c === '') {
   return prayt.innerHTML = 'please enter city name'; 
  } 
  else {
    try {
      let api = `http://localhost:5000/adhanTime/${c}`; //http://localhost:5000/adhanTime/cairo
      let res = await fetch(api);
      let data = await res.json();
      console.log(res.status);
      if(res.status===500){
        console.log('ahmed');
       return prayt.innerHTML='invalid city';
      }else{
        let time = data;
     
        //let time=data.data.timings;
        //console.log(time);
        // console.log(time.asr);
       // console.log(typeof time);
        ptif.innerHTML = time['fajr'];
        ptisun.innerHTML = time['sunrise'];
        ptiD.innerHTML = time['dhuhr'];
        ptiA.innerHTML = time['asr'];
        ptisuns.innerHTML = time['sunset'];
        ptiM.innerHTML = time['maghrib'];
        ptiI.innerHTML = time['isha'];
      }
    

     
    } 
    catch(err)
    { 
      console.log(err);
     // return prayt.innerHTML = err;
      }
    
    
  }

}







let counter = document.querySelector('.counter');
let hold = document.querySelector('.chold')
let restart = document.querySelector('.zero')
let alter = document.querySelector('#alla');
let tot = document.querySelector('.tot')
counter.onclick = () => {
  if (hold.innerHTML == 33) {
    hold.innerHTML = 1;
  }
  else {
    hold.innerHTML++;
  }
  if (tot.innerHTML == 33) {
    alter.innerHTML = '    (الحمد لله)';
  } else if (tot.innerHTML == 66) {
    alter.innerHTML = '(الله اكبر)';
  } else if (tot.innerHTML == 99) {
    alter.innerHTML = '(لا حول ولاقوة الا بالله)';
  } else if (tot.innerHTML == 100) {
    tot.innerHTML = 0;
  } else if (tot.innerHTML == 1) {
    alter.innerHTML = '(سبحان الله)'
  }

  tot.innerHTML++;
}

restart.onclick = () => {
  hold.innerHTML = 0;
  tot.innerHTML = 0;
  alter.innerHTML = '(سبحان الله)'
}




























































/*
btn.onclick= async function(){
    
    var city=document.getElementById('city');
    var country=document.getElementById('country');
    var c=city.value;
    var co=country.value;
  const container = document.getElementById('prayer-times-container');
  container.innerHTML = '';
    let api=`https://api.aladhan.com/v1/timingsByCity?city=${c}&country=${co}&method=2`;
    const response=await fetch(api);
    const data=await response.json();
    console.log(data.data.timings);
    console.log(typeof data.data.timings);
    const timeing=data.data.timings;
    for(let po of Object.entries(timeing)){
     console.log(typeof po);
     const div = document.createElement('div');
     div.textContent = `${po}`;
     container.appendChild(div);
     
    } 
}
*/