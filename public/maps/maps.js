//https://maps.googleapis.com/maps/api/js?key=your_api_key&callback=initMap

//https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=29.9825607&lon=31.3162377

;
let find=document.querySelector('#btn');
let mapp=document.querySelector('#map')
let mapOp={
  center:[30.031, 31.201],
  zoom:13,
};
find.onclick=async()=>{
  let lat=document.querySelector('.latit');
let long=document.querySelector('.longi')
let la=lat.value;
let lo=long.value;
console.log(la,lo, 'is your location');
let mapOp={
  center:[la, lo],
  zoom:13,
};
try{
  if(la&&lo){
    let map=new L.map(mapp,mapOp);
    let layer=new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
    map.addLayer(layer);
    let marker=new L.Marker([la, lo]);
    marker.addTo(map);
    let address=document.querySelector('.address');
    let addDet=document.querySelector('.allAdd')
    const api=`http://localhost:5000/address/${la}/${lo}`; //http://localhost:5000/address/30.30/31.321
    let res=await fetch(api);
    let data=await res.json();
    console.log(data);
    console.log(res);
    address.innerHTML=data.name;
    addDet.innerHTML=data.display_name;
  }else{
  mapp.innerHTML=`please enter latitude and longitude`;
  }
}catch(err){
  //console.log(err);
 return mapp.innerHTML=`your coord is invalid ${err}` ;
}


}

//31.0500°N 31.3833°E


/*    fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=30.0444&lon=31.2357')
      .then(response => response.json())
      .then(data => {
        var placeName = data.display_name;
        console.log("اسم المكان: " + placeName);
      });*/

//https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=31.0500&lon=31.3833
//http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png;


/*
let lat = document.querySelector('.latit');
let long = document.querySelector('.longi');
let find = document.querySelector('#btn');
find.onclick=()=>{
  let startObj={
    center:[30.031, 31.201],
    zoom:9,
  }
let la=lat.value;
let lo=long.value;
let mymap=new L.map('map',startObj);
let layer=new L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png;');
let mark=new L.Marker([la,lo])
mymap.addLayer(layer);
mark.addTo(mymap);
}
*/