//! news apie for the information
// variables
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// apis 
const API_KEY = "500c41c715364a58b99653d21c784df5";
const GENERAL_NEWS = "https://newsapi.org/v2/everything?q=cyclone&flood&thunderstorm&drought&earthquake&apiKey=";

window.onload = function() {
    newsType.style.width= "180px";
    newsType.style.margin= "auto";
    newsType.style.backgroundColor= "#fa6d1b";
    newsType.style.borderRadius= "40px";
    newsType.innerHTML="<h4 style='color: #ffff; padding: 5px;'>Headlines</h4>";
    fetchGeneralNews();
};

const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >=200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
        // console.log(newsDataArr);
    } else {
        // handle errors
        // console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    displayNews();
}


function displayNews() {
    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");
        
        var col = document.createElement('div');
        col.style="width: auto; height: auto; border: 1px solid rgba(0, 0, 0, .2); border-radius: 15px; margin: .4rem;";

        var card = document.createElement('div');
        card.style.margin="3px";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.style="border-radius: 15px;";
        image.src = news.urlToImage;

        var cardBody = document.createElement('div');
        
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.style.paddingTop = "5px";
        newsHeading.innerHTML = news.title;
        
        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.style.marginTop ="3px";
        dateHeading.innerHTML = date[0];
        
        var discription = document.createElement('p');
        discription.style="font-size: .8rem; color: #333";
        discription.innerHTML = news.description;
        
        var button = document.createElement('div');
        button.style.marginBottom = "10px";
        button.id = "link-button";
        
        var link = document.createElement('a');
        link.setAttribute("target", "_blank");
        link.className = "text-link";
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        button.appendChild(link);
        cardBody.appendChild(button);
        card.appendChild(image);
        card.appendChild(cardBody);
        col.appendChild(card);
        newsdetails.appendChild(col);
    });

}
async function getNews(){
    await fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=ySwBmvnEPKC55fRmJZGWmCqGAurbSFC')
    .then(d => d.json())
    .then(response => {
        // console.log(response.results);
        for(var i = 0; i < response.results.length; i++){
            const output = document.getElementById('output');
            
            try{
                output.innerHTML += `
                    <div class="card">
                    <div class="card-body">
                    <img src="${response.results[i]['media'][0]['media-metadata'][2].url}" class="card-img-top" alt="${response.results[i]['media'][0].caption}" title="${response.results[i]['media'][0].caption}"><br>
                    <h2 class="card-title">${response.results[i].title}</h2>
                    <div class="card-text">
                        <p>${response.results[i].abstract}</p>
                    </div>
                    </div>
                    </div>
                    <br>
                    `
                console.log(response.results[i]['media'][0].caption);
            }
            catch(err){
                console.log(err);
            }
            // console.log(response.results[i].title);
            // console.log(i);
        }
        document.getElementById('copyright').innerHTML = response.copyright;
    })
}
getNews();


//! weather call
// we need the get the all importen element form the DOM
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const realFeel = document.querySelector('.realfeel');
const uv = document.querySelector('.uv');
// class selector all 
const cities = document.querySelectorAll('.city');
// id selector
const form = document.getElementById("locationInput");
const cloudOutPut = document.getElementById("cloud");
const humidityOutPut = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const icon = document.getElementById("icons");
const windOutPut = document.getElementById("wind");
const alertnow=document.querySelector('.alertss');
const step1=document.querySelector('.step1');
const step2=document.querySelector('.step2');
const step3=document.querySelector('.step3');
const fact=document.querySelector('.fact');
// default city



let cityInput = '';
if(cityInput.length === 0){
    cityInput = "Chandigarh";
    getData();
}

cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        cityInput = e.target.innerHTML;
        getData();
    });
})
// data access from the keyboard 
form.addEventListener('submit', (e) => {
    // if search bar is empty it throw an error  
    if (search.value.length === 0) {
        // alert(cityInput);
        alert('please enter the city name');
    } else {
        cityInput = search.value;
        getData();
        search.value = "";
    }

    // preventing the befault befaviour of the form
    e.preventDefault();
});
// data access from the button
btn.addEventListener('click', (e) => {
    // if search bar is empty it throw an error  
    if (search.value.length === 0) {
        alert('please enter the city name');
    } else {
        cityInput = search.value;
        // console.log(cityInput);
        getData();
        search.value = "";
        // app.style.opacity = "0";
    }

    // preventing the befault befaviour of the form
    e.preventDefault();
});

function getData() {
    // this api for the location only
    let queryUrl2 = "http://api.openweathermap.org/geo/1.0/direct?";
    let loc = "q=" + `${cityInput}` + "&";
    let limit = "limit=10&";

    // dhirendra kumar
    let apiKey = "appid=dbb76c5d98d5dbafcb94441c6a10236e";

    let coordinates = queryUrl2 + loc + limit + apiKey;
    const getIP = async () => {
        let latt, city_name, longi;
        await fetch(coordinates)
            .then((response) => response.json())
            .then((geo) => {
                // console.log(geo);
                city_name = geo[0].name;
                longi = geo[0].lon;
                latt = geo[0].lat;
            });
        let queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";
        let latitude = "lat=" + latt + "&";
        let longitude = "lon=" + longi + "&";
        let apiOptions = "units=metric&exclude=minutely,alerts&";
        let file = queryUrl + latitude + longitude + apiOptions + apiKey;
        // this api for weather details
        fetch(file)
            .then((response) => response.json())
            .then((data) => {
                // here we console log the data to see what is available
                console.log(data);
                // add the name of the city into the page
                nameOutput.innerHTML = city_name;
                // adding the temperature into the page
                temp.innerHTML = Math.floor(data.current.temp) + "°C";

                // adding weather condition into the page
                let weatherCondition = data.current.weather[0].description;
                console.log(weatherCondition);
                let weatherStatus = data.current.weather[0].main;
                console.log(weatherStatus);
                conditionOutput.innerHTML = weatherStatus;
                // geting the crosponding icon url for the weather and extract a part of it 

                // adding the icon data and icon
                const iconCode = data.current.weather[0].id;
                const iconDate = data.current.weather[0].icon;
                var get = iconDate.substr(2);
                // console.log(get);
                var aagaya = iconCode + get;
                console.log(aagaya);
                icon.src = "./icons/" + iconCode + get +".svg";
                
                // details
                cloudOutPut.innerHTML = data.current.clouds + "%";
                humidityOutPut.innerHTML = data.current.humidity + "%";
                windOutPut.innerHTML = data.current.wind_speed + " m/s";
                pressure.innerHTML = data.current.pressure + " hPa";
                realFeel.innerHTML = data.current.feels_like + " °C"
                const uvdata = Math.floor(data.current.uvi);
                // console.log(uvdata);
                uv.src = "./icons/uvicon/" + uvdata + ".svg";
                
                
                // year 
                const date = new Date();
                let year = date.getFullYear();
                
                // months
                const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const m = new Date();
                let mname = month[m.getMonth()];
                
                // Day
                const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const day = new Date();
                let today = weekday[day.getDay()];
                
                dateOutput.innerHTML = today + " "+ mname + " " + year;
                
                // Time
                let H = new Date().getHours();
                let M = new Date().getMinutes();
                let timeNow;
                if (H > 12) {
                    H = "0" + H;
                    H = H - 12;
                    timeNow = H + ":" + M + " PM";
                }
                else {
                    timeNow = H + ":" + M + " AM";
                }
                timeOutput.innerHTML = timeNow;
                // console.log(Timeday);
                
                // background cond ition styling

                // condition clear
                if(weatherStatus == "Clear" && get == "d"){
                    
                    // random selection for the animation video
                    var randomNo1 = Math.floor(Math.random()*7);
                    // console.log(randomNo1);
                    app.style.backgroundImage = `url(./image/clear/day/clear`+ randomNo1 +`.mp4)`;

                    // change the button background color depend upon forecast
                    btn.style.background = "#e5ba92";

                }else if(weatherStatus == "Clear" && get == "n"){
                    // random selection for the animation video
                    var randomNo1 = Math.floor(Math.random()*7);
                    // console.log(randomNo1);
                    app.style.backgroundImage = `url(./image/clear/night/clear`+ randomNo1 +`.mp4)`;

                    // change the button background color depend upon forecast
                    btn.style.background = "#181e27";
                }

                // condition cloudy

                // broken clouds
                if(weatherStatus == "Clouds" && get == "d" && weatherCondition == "broken clouds"){
                // random selection for the animation video
                    var randomNo1 = Math.floor(Math.random()*5);
                    // console.log(randomNo1);
                    app.style.backgroundImage = `url(./image/cloudy/mildcloudy/day/mildcloudy`+ randomNo1 +`.mp4)`;

                    // change the button background color depend upon forecast
                    btn.style.background = "#e5ba92";

                }else if(weatherStatus == "Clouds" && get == "n" && weatherCondition == "broken clouds"){
                    // random selection for the animation video
                    var randomNo1 = Math.floor(Math.random()*5);
                    // console.log(randomNo1);
                    app.style.backgroundImage = `url(./image/cloudy/mildcloudy/night/mildcloudy`+ randomNo1 +`.mp4)`;

                    // change the button background color depend upon forecast
                    btn.style.background = "#181e27";
                }

                let currentTemp=Math.floor(data.current.temp);
                let fahrenheit= ((currentTemp*9)/5)+32  
                if(currentTemp>40){
                    alertnow.innerHTML=`Here are some do’s and don’ts if the temperature is ${currentTemp} degree celsius:`
                    step1.innerHTML=`Do drink plenty of water and fluids like ORS (oral rehydration salts), lemon juice, tender coconut, buttermilk and fruit juices to stay hydrated and prevent heat stroke1.`;
                    step2.innerHTML=`Do wear casual cotton clothes and slippers to keep your body cool and avoid burns1.`;
                    step3.innerHTML=`Don’t expose your plants to direct sunlight for too long, as they can get damaged by high temperatures. The optimum temperature range for photosynthesis is 25 to 30 degree celsius.`;
                    fact.innerHTML=`By the way, 40 degree celsius is equal to ${fahrenheit} degree Fahrenheit, in case you were wondering. Stay safe and cool! 😎`;
                }
                else if(currentTemp>30 && currentTemp<40){
                    alertnow.innerHTML=`Here are some do’s and don’ts if the temperature is ${currentTemp} degree celsius:`
                    step1.innerHTML=`Do drink cool water and electrolyte drinks to prevent dehydration and heat exhaustion`;
                    step2.innerHTML=`Don’t take hot showers or baths, as they can increase your body temperature and make you feel more uncomfortable`;
                    step3.innerHTML=`Don’t leave children or pets in a parked car, as the temperature inside can rise quickly and cause heatstroke`;
                    fact.innerHTML=`By the way, 40 degree celsius is equal to ${fahrenheit} degree Fahrenheit, in case you were wondering. Stay safe and cool! 😎`;
                }
                else if (currentTemp<10){
                    alertnow.innerHTML=`Here are some do’s and don’ts if the temperature is ${currentTemp} degree celsius:`
                    step1.innerHTML=`Do wear warm clothes like sweaters, jackets, hats, gloves and scarves to prevent hypothermia and frostbite`;
                    step2.innerHTML=`Do drink hot beverages like tea, coffee, soup or hot chocolate to keep yourself warm and hydrated.`;
                    step3.innerHTML=`Don’t stay outside for too long, especially if the wind chill factor is very low1`;
                    fact.innerHTML=`By the way, 40 degree celsius is equal to ${fahrenheit} degree Fahrenheit, in case you were wondering. Stay safe and cool! 😎`;
                }
                else{
                    alertnow.innerHTML=`Here are some do’s and don’ts if the temperature is ${currentTemp} degree celsius:`
                    step1.innerHTML=`Do enjoy the pleasant weather and spend some time outdoors, but avoid direct exposure to the sun for long periods`;
                    step2.innerHTML=`Do drink water and herbal teas to stay hydrated and boost your immunity.`;
                    step3.innerHTML=`Don’t neglect your allergies or infections, as they can worsen in this season. Consult a doctor if you have any symptoms`;
                    fact.innerHTML=`By the way, 40 degree celsius is equal to ${fahrenheit} degree Fahrenheit, in case you were wondering. Stay safe and cool! 😎`;
                }

                // condition cloudy

                // heavy cloud
                if(weatherStatus == "Clouds" && get == "d"){
                // random selection for the animation video
                    var randomNo1 = Math.floor(Math.random()*5);
                    // console.log(randomNo1);
                    app.style.backgroundImage = `url(./image/cloudy/heavycloudy/day/heavycloudy`+ randomNo1 +`.mp4)`;

                    // change the button background color depend upon forecast
                    btn.style.background = "#e5ba92";

                }else if(weatherStatus == "Clouds" && get == "n"){
                    // random selection for the animation video
                    var randomNo1 = Math.floor(Math.random()*6);
                    // console.log(randomNo1);
                    app.style.backgroundImage = `url(./image/cloudy/heavycloudy/night/heavycloudy`+ randomNo1 +`.mp4)`;

                    // change the button background color depend upon forecast
                    btn.style.background = "#181e27";
                }

                // mist or haze
                if(weatherStatus == "Haze" && get == "d"){
                // random selection for the animation video
                    var randomNo1 = Math.floor(Math.random()*7);
                    // console.log(randomNo1);
                    app.style.backgroundImage = `url(./image/mist/day/mist`+ randomNo1 +`.mp4)`;

                    // change the button background color depend upon forecast
                    btn.style.background = "#e5ba92";

                }else if(weatherStatus == "Haze" && get == "n"){
                    // random selection for the animation video
                    var randomNo1 = Math.floor(Math.random()*3);
                    // console.log(randomNo1);
                    app.style.backgroundImage = `url(./image/mist/night/mist`+ randomNo1 +`.mp4)`;

                    // change the button background color depend upon forecast
                    btn.style.background = "#181e27";
                }
            }
        );

    }
    getIP();
}     


// ! loding annimation in the website

var slidePannelLeft = {
    origin: 'right',
    distance: '150px',
    duration: 3000,
    delay: 300
};
ScrollReveal().reveal('.panel', slidePannelLeft); 

// !slide down heading
var slideDown = {
    origin: 'top',
    distance: '100px',
    duration: 3000,
    delay: 500
};
ScrollReveal().reveal('.heading, #second, #linkedin', slideDown); 

//! slideLeft
var slideLeft = {
    origin: 'left',
    distance: '120px',
    duration: 2000,
    delay: 200
};
ScrollReveal().reveal('.news-container', slideLeft); 

//! slideRigh
var slideRight = {
    origin: 'right',
    distance: '120px',
    duration: 2000,
    delay: 200
};
ScrollReveal().reveal('.about-content', slideRight); 

// slideing the context information
// !slide contect right
var contactName = {
    origin: 'left',
    distance: '200px',
    duration: 2000,
    delay: 300
}
ScrollReveal().reveal('.contact, .input-box, .name' , contactName); 
var contactMobile = {
    origin: 'left',
    distance: '200px',
    duration: 3000,
    delay: 500
}
ScrollReveal().reveal('.contact, .input-box, .mobile' , contactMobile); 
// !slide contect left
var contactEmail = {
    origin: 'right',
    distance: '200px',
    duration: 2000,
    delay: 300
}
ScrollReveal().reveal('.contact, .input-box, .email' , contactEmail); 
var contactSubject = {
    origin: 'right',
    distance: '200px',
    duration: 3000,
    delay: 500
}
ScrollReveal().reveal('.contact, .input-box, .subject, #third, #six, #instagram ' , contactSubject); 

//! rotating the brand name
var rotateArrow = {
    origin: 'left',
    distance: '200px',
    duration: 3000,
    delay: 500
}
ScrollReveal().reveal('.brand, #first, #four, #facebook' , rotateArrow); 

//! rise the temperature bar from the down 
var riseUp = {
    origin: 'bottom',
    distance: '200px',
    duration: 3000,
    delay: 500
}
ScrollReveal().reveal('.temp-zone, #five, #twitter' , riseUp); 