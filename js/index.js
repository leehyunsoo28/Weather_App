// top 
// srtting
const hamburger = document.querySelector(".setting_hamburger");
const X = document.querySelector(".setting_X");
const setting_open = document.querySelector(".setting_open");


hamburger.addEventListener("click", function(){
    hamburger.style.display="none";
    X.style.display="block";
    setting_open.style.display="block";
});

X.addEventListener("click", function(){
    X.style.display="none";
    hamburger.style.display="block";
    setting_open.style.display="none";
    time_format_child.style.display="none";
    time_update_child.style.display="none";
    movement_child.style.display="none";
    
});


// setting_open -> time_format
const time_format = document.querySelector(".time_format");
const time_format_child = document.querySelector(".time_format_child");

time_format.addEventListener("click", function(){
    time_format_child.style.display="block";
    setting_open.style.display="none";
});

// mode_setting -> time_format_child
const time_format_OT = document.querySelector(".time_format_OT");
const time_format_TF = document.querySelector(".time_format_TF");
const ok1 = document.querySelector(".ok1");

time_format_OT.addEventListener("click", function(){
    time_format_OT.style.color="white";
    time_format_OT.style.backgroundColor="black";
    
    time_format_TF.style.color="black";
    time_format_TF.style.backgroundColor="white";
});

time_format_TF.addEventListener("click", function(){
    time_format_OT.style.color="black";
    time_format_OT.style.backgroundColor="white";
    
    time_format_TF.style.color="white";
    time_format_TF.style.backgroundColor="black";
});

ok1.addEventListener("click", function(){
    time_format_child.style.display="none";
    X.style.display="none";
    hamburger.style.display="block";
});


// setting_open -> time_update
const time_update = document.querySelector(".time_update");
const time_update_child = document.querySelector(".time_update_child");

time_update.addEventListener("click", function(){
    time_update_child.style.display="block";
    setting_open.style.display="none";
});

// mode_setting -> time_update_child

const ok2 = document.querySelector(".ok2");


ok2.addEventListener("click", function(){
    time_update_child.style.display="none";
    X.style.display="none";
    hamburger.style.display="block";
});



function enter(e){
    if(e.keyCode == 13){
        alert("입력함");
    }
}

function region(e){
    if(e.keyCode == 13){
        alert("dd");
    }
}


// setting_open -> movement
const movement = document.querySelector(".movement");
const movement_child = document.querySelector(".movement_child");

movement.addEventListener("click", function(){
    movement_child.style.display="block";
    setting_open.style.display="none";
});

// mode_setting -> movement_child
const movement_on = document.querySelector(".movement_on");
const movement_off = document.querySelector(".movement_off");
const ok3 = document.querySelector(".ok3");

movement_on.addEventListener("click", function(){
    movement_on.style.color="white";
    movement_on.style.backgroundColor="black";
    
    movement_off.style.color="black";
    movement_off.style.backgroundColor="white";
});

movement_off.addEventListener("click", function(){
    movement_on.style.color="black";
    movement_on.style.backgroundColor="white";
    
    movement_off.style.color="white";
    movement_off.style.backgroundColor="black";
});

ok3.addEventListener("click", function(){
    movement_child.style.display="none";
    X.style.display="none";
    hamburger.style.display="block";
});

// js에 있는 날짜 시간 가져오기
function updateTime(){
    const now = new Date();

    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    document.querySelector(".time").textContent =
        `${hour}:${minute}`;

    document.querySelector(".date").textContent =
        `${now.getFullYear()}.${now.getMonth()+1}.${now.getDate()}`;
}

updateTime();

setInterval(updateTime, 1000);

// api 연결 및 데이터 가져오기
const API_KEY = "a301c150ca64fe4099067ec1e348d72a";
const temperature = document.querySelector(".temperature"); // 기온
const Location = document.querySelector(".location"); // 위치
const weather = document.querySelector(".weather"); // 날씨
const comment = document.querySelector(".comment"); // 맨트
const backgroundVideo = document.querySelector(".background-video"); // 비디오 변경

function changeVideo(weather) {
    if(weather === "Rain"){
       backgroundVideo.src = "./video/rain.mp4"
    }else if(weather === "Clear"){
        backgroundVideo.src = "./video/clear.mp4"
    }else if(weather === "Snow"){
        backgroundVideo.src = "./video/snow.mp4"
    }else{
        backgroundVideo.src = "./video/cloudy.mp4"
    }

    backgroundVideo.load();
    backgroundVideo.play();
}


function changeComment(weather){
    if(weather === "Rain"){
        comment.textContent = "비가 오니 우산 챙겨나가세요"
    }else if(weather === "Clear"){
        comment.textContent = "하늘이 맑아 산책하기 좋습니다"
    }else if(weather === "Snow"){
        comment.textContent = "눈이 오고 있습니다. 눈싸움 준비를 하세요"
    }else{
        comment.textContent = "흐리니 안전운전하세요"
    }
}


// 사이트 연결 및 온도, 날씨, 위치 정보 가져오기
fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`)
    .then(response => response.json())
    .then(data => {
    console.log(Object.keys(data));

    temperature.textContent = Math.round(data.main.temp) + "°";

    Location.textContent = data.name;

    weather.textContent = data.weather[0].description;
    
    
    changeVideo(data.weather[0].main);
    changeComment(data.weather[0].main);
        
        
    });

// 현시간부터 이후 시간 날씨 변화 정보 가져오기
const hourlyList = document.querySelector(".hourly_list");

fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`)
    .then(response => response.json())
    .then(data => {

        data.list.forEach(item => {

            const date = new Date(item.dt * 1000);

            const hour = date.getHours();
            const temp = Math.round(item.main.temp);
            const weather = item.weather[0].main;

            const card = document.createElement("div");
            card.classList.add("now");

            card.innerHTML = `
                <span>${hour}시</span>
                <img src="./img/${weather.toLowerCase()}.png">
                <span>${temp}°</span>
            `;

            hourlyList.appendChild(card);
        });

    });




// 맨트 변경
//fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric&lang=kr`)
//.then(response => response.json())
//.then(data => {
//
//        temperature.textContent =
//            Math.round(data.main.temp) + "°";
//
//        Location.textContent =
//            data.name;
//
//        weather.textContent =
//            data.weather[0].description;
//
//        const weatherMain = data.weather[0].main;
//
//        if(weatherMain === "Rain"){
//            comment.textContent = "우산 챙기셨나요? ☔";
//        }
//        else if(weatherMain === "Clear"){
//            comment.textContent = "산책하기 좋은 날씨입니다 ☀️";
//        }
//        else if(weatherMain === "Clouds"){
//            comment.textContent = "조금 흐리지만 쾌적한 날씨입니다 ☁️";
//        }
//    }
//    
//);
//
//
//
//
//
//
//const rainComments = [
//    "우산 챙기셨나요? ☔",
//    "비가 내리고 있습니다 🌧️",
//    "안전 운전하세요 🚗",
//    "젖지 않게 조심하세요 😊"
//];
//
//const random =
//    rainComments[Math.floor(Math.random() * rainComments.length)];
//
//comment.textContent = random;










