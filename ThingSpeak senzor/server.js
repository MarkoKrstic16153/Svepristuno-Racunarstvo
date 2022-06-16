var express = require("express");
var cors = require("cors");
const axios = require('axios');
var rxjs = require("rxjs");

var app = express();

const port = 3000;

app.use(cors());

app.listen(port, () => {
    console.log();
  });

  app.get("/", (req, res) => {
    res.send("Hello world!");
  });

var podaci = [];

const readLine = require('readline');
const f = require('fs');
var file = './weatherHistory.csv';
var rl = readLine.createInterface({
    input : f.createReadStream(file),
    output : process.stdout,
    terminal: false
});
rl.on('line', function (text) {
 podaci.push(text);
});
var count = 0;

const timer = rxjs.interval(3000);
timer.subscribe(()=>{
    try{
    let podatak = podaci[count++].split(",");
    let temp = podatak[3]*1;
    let tempOsecaj = podatak[4]*1;
    let vlaznost = podatak[5] * 100;
    let vetar = podatak[6]*1;
    let vidljivost = podatak[8]*1;
    let pritisak = podatak[10]*1;
    
    if(temp)
    posaljiPodatke(1, temp);
    if(tempOsecaj)
    posaljiPodatke(2, tempOsecaj);
    if(vlaznost)
    posaljiPodatke(3, vlaznost);
    if(vetar)
    posaljiPodatke(4, vetar);
    if(vidljivost)
    posaljiPodatke(5, vidljivost);
    if(pritisak)
    posaljiPodatke(6, pritisak);   
    } catch {

    }                             
});

function posaljiPodatke(indexPolja, podatak){
  axios.get('https://api.thingspeak.com/update?api_key=OBWMILBVG4IJQS9A&field' + indexPolja + '=' + podatak)
  .then((res) => {
    console.log(indexPolja, podatak);
  }).catch((err) => {
      console.error(err);
  }); 
}