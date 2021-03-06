let messages = document.querySelector(".chat");
let typer = document.querySelector(".inputText");
let textb = document.querySelector(".submit");
let talkb = document.querySelector(".talk");
let msgsent = document.createElement("div");
let replymsg = document.createElement("div");
let appkey = "f98bb9fb990c53469a7e7f8d8b8bb426";

function typerSizeIncrease() {
  talkb.style.cssText = "display:none;";
  typer.style.cssText = "width:1000px;"
}

function typerSizeDecrease() {
  talkb.style.cssText = "display:block;";
  typer.style.cssText = "width:30vw;"
}

function typerHide() {
  typer.style.cssText = "display:none;"
  textb.style.cssText = "display:none;"
}

//typing feature
textb.addEventListener("click", function () {
  const transcript = typer.value;
  msgsent = document.createElement("div");
  msgsent.setAttribute("class", "sent");
  msgsent.textContent = transcript;
  messages.appendChild(msgsent);
  reply(transcript);
});

typer.addEventListener("keydown", function (e) {
  if (e.keyCode == 13) {
    const transcript = typer.value;
    msgsent = document.createElement("div");
    msgsent.setAttribute("class", "sent");
    msgsent.textContent = transcript;
    messages.appendChild(msgsent);
    reply(transcript);
  }
});

//voice feature
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interinResults = true;
recognition.onstart = function () {
};

recognition.onresult = function (event) {
  var current = event.resultIndex;
  var transcript = event.results[current][0].transcript;
  msgsent = document.createElement("div");
  msgsent.setAttribute("class", "sent");
  msgsent.textContent = transcript;
  messages.appendChild(msgsent);
  reply(transcript);
};

function httpRequest(url, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == 4 && httpRequest.status == 200)
      callback(httpRequest.responseText);
  };
  httpRequest.open("GET", url, false);
  httpRequest.send();
  httpRequest.suppressDeprecationWarnings = true;
  console.log(httpRequest);
  if (httpRequest.status == 404 || httpRequest.status == 400) {
    var warn404 = "I'm afraid your city couldn't be found.\nPlease type in this format:\n'city name'|space|weather";
    responsiveVoice.speak(warn404);
    replymsg = document.createElement("div");
    replymsg.setAttribute("class", "recieved");
    replymsg.textContent = warn404;
    messages.appendChild(replymsg);
  }
}
/* Function for sending messages*/
const AIsend = (finalText) => {
  replymsg = document.createElement("div");
  replymsg.setAttribute("class", "recieved");
  replymsg.textContent = finalText;
  messages.appendChild(replymsg);
};
function parseIt(response) {
  let jsonObject = JSON.parse(response);
  var name = jsonObject.name;
  var temp = parseInt(jsonObject.main.temp - 273) + "° C";
  var desc = jsonObject.weather[0].description;
  var humidity = jsonObject.main.humidity + "%";
  var finalText =
    name +
    " has temperature " +
    temp +
    " and " +
    humidity + " humid right now" +
    ".\nIt is currently experiencing " +
    desc +
    ".";
  replymsg = document.createElement("div");
  replymsg.setAttribute("class", "recieved");
  replymsg.textContent = finalText;
  messages.appendChild(replymsg);
  responsiveVoice.speak(finalText);
}

/** Cookie function to get User's name */
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  let username = getCookie("username");
  if (username != "") {
    const text = "Hello " + username + ",\n What can I do for you?";
    AIsend(text);
    responsiveVoice.speak(text);
  } else {
    username = prompt("May I know your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 30);
    }
  }
}

let userName = getCookie("username");

function reply(transcript) {
  responsiveVoice.setDefaultVoice("UK English Female",{rate: .001});
  if (
    transcript.toLowerCase().includes("how are you") ||
    transcript.toLowerCase().includes("how are you?") ||
    transcript.includes("are you fine") ||
    transcript.includes("are you fine?") ||
    transcript.includes("how are you doing today") ||
    transcript.includes("how are you doing today?")
  ) {
    var finalText = greeting[Math.floor(Math.random() * greeting.length)];
    responsiveVoice.speak(finalText);
    AIsend(finalText);
  }
  else if (
    transcript.trim() == ""
  ) {
    var finalText = `Please type something for me to do.`;
    responsiveVoice.speak(finalText);
    AIsend(finalText);
  } else if (
    transcript.toLowerCase().includes("do you love me?") ||
    transcript.toLowerCase().includes("do you love me") ||
    transcript.toLowerCase().includes("do you luv me?") ||
    transcript.toLowerCase().includes("do you luv me")
  ) {
    var finalText = "There are many types of love,\nbut ours is just as friends";
    responsiveVoice.speak(finalText);
    AIsend(finalText);
  } else if (timeQ.includes(transcript.toLowerCase())) {
    var time = now.getHours() + " hours " + now.getMinutes() + " minutes. ";
    var finalText = "The time is " + time;
    responsiveVoice.speak(finalText);
    AIsend(finalText);
  } else if (dateQ.includes(transcript.toLowerCase())) {
    var date =
      now.getDate() + " " + month[now.getMonth()] + " " + now.getFullYear();
    var finalText = "Today's date is " + date;
    responsiveVoice.speak(finalText);
    AIsend(finalText);
  } else if (nextDateQ.includes(transcript.toLowerCase())) {
    var date = (
      now.getDate() + 1 + " " + month[now.getMonth()] + ", " + now.getFullYear());
    var finalText = "Tomorrow's date is " + date;
    responsiveVoice.speak(finalText);
    AIsend(finalText);
  } else if (beforeDateQ.includes(transcript.toLowerCase())) {
    var date = (
      now.getDate() - 1 + " " + month[now.getMonth()] + ", " + now.getFullYear());
    var finalText = "Yesterday's date was " + date;
    responsiveVoice.speak(finalText);
    AIsend(finalText);
  } else if (dayQ.includes(transcript.toLowerCase())) {
    var day = weekday[now.getDay()];
    var finalText = "Today is " + day;
    responsiveVoice.speak(finalText);
    AIsend(finalText);
  } else if (nextDayQ.includes(transcript.toLowerCase())) {
    var day = weekday[now.getDay() + 1];
    var finalText = "Tomorrow is " + day;
    responsiveVoice.speak(finalText);
    AIsend(finalText);
  } else if (beforeDayQ.includes(transcript.toLowerCase())) {
    var day = weekday[now.getDay() - 1];
    var finalText = "Yesterday was " + day;
    responsiveVoice.speak(finalText);
    AIsend(finalText);
  } else if (whoQ.includes(transcript.toLowerCase())) {
    var finalText = "I am a 'Useful' personal assistant,\nJust Made For You.";
    responsiveVoice.speak(finalText);
    AIsend(finalText);
  } else if (
    transcript.toLowerCase().endsWith("weather") ||
    transcript.toLowerCase().startsWith("weather")
  ) {
    var city = transcript.split("weather").shift();
    let searchLink =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      appkey;
    httpRequest(searchLink, parseIt);
  } else if (
    transcript.toLowerCase().includes("weather please") ||
    transcript.toLowerCase().includes("weather?") ||
    transcript.toLowerCase().includes("weather")
  ) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let GeoURL =
          "api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=" +
          appkey;
        httpRequest(GeoURL, parseIt);
      });
    } else {
      var finalText = "Couldn't acquire your location.";
      replymsg = document.createElement("div");
      replymsg.setAttribute("class", "recieved");
      replymsg.textContent = finalText;
      messages.appendChild(replymsg);
    }
  } else if (transcript.toLowerCase().endsWith("gif")) {
    var tag = transcript.split("gif").shift();
    const giphy = {
      baseURL: "https://api.giphy.com/v1/gifs/",
      apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
      tag: tag,
      type: "random",
      rating: "pg-13",
      width: "100px",
      height: "100px",
    };
    let giphyURL = encodeURI(
      giphy.baseURL +
      giphy.type +
      "?api_key=" +
      giphy.apiKey +
      "&tag=" +
      giphy.tag +
      "&rating=" +
      giphy.rating +
      "&height=" +
      giphy.height +
      "&width=" +
      giphy.weight
    );
    $("document").ready(function () {
      var newGif = () => $.getJSON(giphyURL, (json) => renderGif(json.data));

      // Display Gif in gif wrap container
      var renderGif = (_giphy) => {
        const gif = document.createElement("img");
        gif.setAttribute("src", _giphy.image_original_url);
        gif.setAttribute("style", "max-width : 30vh; height: auto;");
        replymsg = document.createElement("div");
        replymsg.style.cssText = "padding : 2vh;";
        const downloadLink = document.createElement("a");
        downloadLink.setAttribute("download", "gifs.gif");
        downloadLink.setAttribute("href", _giphy.image_original_url);
        downloadLink.style.cssText =
          "background : white; color : red; font-size : 2vh; padding : 1vh; border-redius : 20px;";
        downloadLink.innerHTML = "Download GIF";
        replymsg.setAttribute("class", "recieved");
        replymsg.appendChild(gif);
        const br = document.createElement("br");
        replymsg.appendChild(br);
        replymsg.appendChild(downloadLink);
        messages.appendChild(replymsg);
        responsiveVoice.speak("one " + tag + " GIF for you");
      };
      newGif();
    });
  } else if (
    transcript.toLowerCase() == "hello bot.ly" ||
    transcript.toLowerCase() == "hello" ||
    transcript.toLowerCase() == "bot.ly" ||
    transcript.toLowerCase() == "bot.ly?" ||
    transcript.toLowerCase() == "botly" ||
    transcript.toLowerCase() == "botly?" ||
    transcript.toLowerCase() == "hello botly"
  ) {
    var finalText = "Hello,\nI am BOT.ly\nHow may I help you?";
    var finalVoice = "Hello,\nI am BOT liy..\nHow may I help you?";
    responsiveVoice.speak(finalVoice);
    AIsend(finalText);
  } else if (transcript.toLowerCase().includes("youtube")) {

    let youtubeURL = "https://www.youtube.com/";
    AIsend(
      "Opening YouTube"
    );
    responsiveVoice.speak(
      "Opening YouTube"
    );
    let searchWindow = window.open(youtubeURL, "", "width=800,height=600");
  }
  else if (transcript.toLowerCase().includes("facebook")) {

    let youtubeURL = "https://www.facebook.com/";
    AIsend(
      "Opening Facebook"
    );
    responsiveVoice.speak(
      "Opening Facebook"
    );
    let searchWindow = window.open(youtubeURL, "", "width=800,height=600");
  }
  else if (transcript.toLowerCase().includes("instagram")) {

    let youtubeURL = "https://www.instagram.com/";
    AIsend(
      "Opening Instagram"
    );
    responsiveVoice.speak(
      "Opening Instagram"
    );
    let searchWindow = window.open(youtubeURL, "", "width=800,height=600");
  }
  else {
    let searchQuery = transcript
      .toLowerCase()
      .split("google ")
      .pop()
      .split(" ")
      .join("+");
    let googleURL = "https://www.google.com/search?q=" + searchQuery;
    AIsend(
      "Having a search on Google for \n'" +
      searchQuery.split("+").join(" ") +
      "'"
    );
    responsiveVoice.speak(
      "Having a search on Google for\n'" +
      searchQuery.split("+").join(" ") +
      "'"
    );
    let searchWindow = window.open(googleURL, "", "width=800,height=600");
  }
}
var now = new Date();

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const greeting = [
  "I am glad you like it!.",
  "Just fine.",
  "I am lov'in it.",
  "I am good, you little lovely fellow.",
];
const weatherQ = [
  "what is the weather",
  "tell today's weather",
  "weather please",
];

const gifnum = [0, 1, 2, 3, 4, 5];

const whoQ = [
  "who are you",
  "who are you?",
  "what is your name",
  "what is your name?",
  "can you please tell me your name",
  "can you please tell me your name?",
  "what's your name",
  "what's your name?",
];
const timeQ = [
  "what's the time",
  "what is the time",
  "what's the time?",
  "what is the time?",
  "current time",
  "current time?",
  "tell me the time",
  "time",
  "time?",
  "time please",
];
const dateQ = [
  "what is the date",
  "what is the date?",
  "what's the date?",
  "what's the date",
  "date",
  "current date",
  "current date?",
  "tell me the date",
  "tell me the date please",
  "tell me the date please?",
  "what is today's date",
  "what is today's date?",
  "today's date",
  "today's date?",
];
const nextDateQ = [
  "what is the tomorrow's date",
  "what is the tomorrow's date?",
  "what's tomorrow's date?",
  "what's tomorrow's date",
  "tomorrow's date",
  "tomorrow's date?",
  "tell me tomorrow's date",
  "tell me the tomorrow's date please",
  "tell me the tomorrow's date please?",
  "what is tomorrow's date",
  "what is tomorrow's date?",
  "tomorrow's date",
  "tomorrow's date?",
];
const beforeDateQ = [
  "what is the yesterday's date",
  "what is the yesterday's date?",
  "what's yesterday's date?",
  "what's yesterday's date",
  "yesterday's date",
  "yesterday's date?",
  "tell me yesterday's date",
  "tell me the yesterday's date please",
  "tell me the yesterday's date please?",
  "what is yesterday's date",
  "what is yesterday's date?",
  "yesterday's date",
  "yesterday's date?",
];
const dayQ = [
  "tell me what is this day",
  "what is today's day",
  "what is today's day?",
  "weekday",
  "today's day",
  "today's day?",
  "weekday?",
  "which day is this",
  "which day is this?",
  "tell me today's weekday",
  "tell me today's day",
];
const nextDayQ = [
  "tell me what is tomorrow's day",
  "what is tomorrow's day",
  "what is tomorrow's day?",
  "tomorrow's day",
  "tomorrow's day?",
  "which day is tomorrow",
  "which day is tomorrow?",
  "tell me tomorrow's weekday",
  "tell me tomorrow's day",
];
const beforeDayQ = [
  "tell me what is yesterday's day",
  "what is yesterday's day",
  "what is yesterday's day?",
  "yesterday's day",
  "yesterday's day?",
  "which day is yesterday's",
  "which day was yesterday?",
  "tell me yesterday's weekday",
  "tell me yesterday's day",
];
