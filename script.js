const apiKey = "43d3c70d667ffa4972a9a432bd4d0ac1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input")
const searchButton = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon");
const bouton = document.getElementById('searchButton');
const card = document.querySelector('.card');
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const inputBox = document.querySelector("input");
const body = document.querySelector("body");



setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'
    let dayName;
    let monthName;

    if (day === 1){
        dayName = 'Monday';
    }else if(day === 2){
        dayName = 'Tuesday';
    }else if(day === 3){
        dayName = 'Wednesday';
    }else if(day === 4){
        dayName = 'Thursday';
    }else if(day === 5){
        dayName = 'Friday';
    }else if(day === 6){
        dayName = 'Saturday';
    }else if(day === 0){
        dayName = 'Sunday';
    }

    if (month === 1){
        monthName = 'January';
    }else if(month === 2){
        monthName = 'February';
    }else if(month === 3){
        monthName = 'March';
    }else if(month === 4){
        monthName = 'April';
    }else if(month === 5){
        monthName = 'May';
    }else if(month === 6){
        monthName = 'Jun';
    }else if(month === 7){
        monthName = 'July';
    }else if(month === 3){
        monthName = 'August';
    }else if(month === 4){
        monthName = 'September';
    }else if(month === 5){
        monthName = 'October';
    }else if(month === 6){
        monthName = 'November';
    }else if(month === 7){
        monthName = 'December';
    }

    timeEl.innerHTML =hoursIn12HrFormat + ':' + minutes + ' ' + `<span id="am-pm">${ampm}</span>`;
    dateEl.innerHTML = dayName + ', ' + date + ' ' + monthName; 
}, 1000);

function gererEffetTactile(event) {

    if (event.type === 'touchstart') {
      bouton.classList.remove('hover');
      bouton.classList.add('grise');
    } else if (event.type === 'touchend') { 
      bouton.classList.remove('grise'); 
    }
  }

bouton.addEventListener('touchstart', gererEffetTactile);
bouton.addEventListener('touchend', gererEffetTactile)


async function checkWeather(city){
    
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    

    if(response.status == 400){
        body.classList.add('normal');
        card.classList.remove('rain');
        card.classList.remove('clear');
        card.classList.remove('cloud');
        body.classList.remove('cloud');
        body.classList.remove('clear');
        card.classList.add('.card');
        weatherIcon.src = "weatherImages/default.png"
        document.querySelector(".city").style.display = "none";
        document.querySelector(".temp").innerHTML = "--";
        document.querySelector(".humidity").innerHTML = "--";
        document.querySelector(".wind").innerHTML = "--"; 

    }

    if(response.status == 404){
        body.classList.add('normal');
        card.classList.remove('rain');
        card.classList.remove('clear');
        card.classList.remove('cloud');
        body.classList.remove('cloud');
        body.classList.remove('clear');
        card.classList.add('.card');
        weatherIcon.src = "weatherImages/default.png"
        document.querySelector(".error").style.display = "block"
        document.querySelector(".city").style.display = "none";
        document.querySelector(".temp").innerHTML = "--";
        document.querySelector(".humidity").innerHTML = "--";
        document.querySelector(".wind").innerHTML = "--";    
    }else{
        document.querySelector(".error").style.display = "none"
        var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML =Math.round(data.main.humidity) + "%";
    document.querySelector(".wind").innerHTML =  Math.round(data.wind.speed) + " km/h";
    

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "weatherImages/clouds.png"
        card.classList.remove('.card');
        card.classList.remove('rain');
        card.classList.remove('clear');
        body.classList.remove('normal');
        body.classList.remove('clear');
        card.classList.add('cloud');
        body.classList.add('cloud');


    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "weatherImages/clear.png"
        card.classList.remove('rain');
        card.classList.remove('cloud');
        card.classList.remove('.card');
        body.classList.remove('cloud');
        card.classList.add('clear');
        body.classList.add('clear');
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "weatherImages/rain.png"
        card.classList.remove('.card');
        card.classList.remove('clear');
        card.classList.remove('cloud');
        body.classList.remove('normal');
        body.classList.remove('clear');
        card.classList.add('rain');
        body.classList.add('cloud');
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "weatherImages/drizzle.png"
        card.classList.remove('.card');
        card.classList.remove('clear');
        card.classList.remove('cloud');
        body.classList.remove('normal');
        body.classList.remove('clear');
        card.classList.add('rain');
        body.classList.add('cloud');
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "weatherImages/mist.png"
        card.classList.remove('.card');
        card.classList.remove('clear');
        card.classList.remove('cloud');
        body.classList.remove('normal');
        body.classList.remove('clear');
        card.classList.add('rain');
        body.classList.add('cloud');
    }


    }
    
    
}
function activerBoutonAvecEntree(event) {
    if (event.keyCode === 13) {
        checkWeather(searchBox.value);
        if(inputBox.value === 'mimmo papa'||inputBox.value === 'mimmo papa '){
            alert("Grazie papa")
            searchBox.value = ''
        }
    }
    
}

document.addEventListener("keydown", activerBoutonAvecEntree)

searchButton.addEventListener("click", ()=> {
    checkWeather(searchBox.value);
    if(inputBox.value === 'mimmo papa'||inputBox.value === 'mimmo papa '){
        alert("Grazie papa")
        searchBox.value = ''
    }

})
