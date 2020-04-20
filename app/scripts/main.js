//fetch de paises
const selectButton = document.getElementById('inputGroupSelect01');

(function getCountries(){
  fetch('https://api.covid19api.com/countries')
  .then(res => res.json())
  .then(data => { 
    for (let i in data){
      selectButton.innerHTML += `<option value="${data[i].Country}">${data[i].Country}</option>`
    };
  })
})();

selectButton.addEventListener('change', () => {
  let country =  selectButton.value.toLowerCase().replace(/[#\s]/g,'-').split(/,/).slice(0,1);
  let url = `https://api.covid19api.com/country/${country}`;
  getLastLastDays(url,country);
})

function getLastLastDays(url,country){
  fetch(url)
  .then(res => res.json())
  .then(data => {
    if(data.length != 0){
      document.body.querySelector(".notFound").style.display = "none";
      let lastDays = data.slice(length-20);
        renderChart(lastDays);
    } else {
      document.body.querySelector('.chartWrapper').style.display = "none";
      document.body.querySelector(".notFound").style.display = "block";
    }
  })
}

//funcion para generar grafica
function renderChart(lastDays){
  document.body.querySelector('.chartWrapper').style.display = "block";
  let optionsChart = {
    labels: [],
    series: [ [],[],[] ]
  };
  for(let i in lastDays){
    optionsChart.labels.push(lastDays[i].Date.slice(5,10));
    optionsChart.series[0].push(lastDays[i].Confirmed);
    optionsChart.series[1].push(lastDays[i].Recovered);
    optionsChart.series[2].push(lastDays[i].Deaths);
  };
  new Chartist.Line('.ct-chart', optionsChart);
}