const popup = document.querySelector(".popup"),
  wifiIcon = document.querySelector(".icon i"),
  popupTitle = document.querySelector(".popup .title"),
  popupDesc = document.querySelector(".desc"),
  reconnectBtn = document.querySelector(".reconnect");

let isOnline = true,
  intervalId,
  timer = 10;

const checkConnection = async () => {
  try {
    //try to fetch random data from the API. if the status code is between 200 and 300, the network connection is considered online
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    isOnline = response.status >= 200 && response.status < 300;
    console.log(response);
  } catch (error) {
    isOnline = false; // if there is an error, the connection is considered offline
  }
  timer = 10;
  clearInterval(intervalId);
  handlePopup(isOnline);
};

const handlePopup = (status) => {
  if (status) {
    //if the status is true (online).update icon,title, and description accordingly
    wifiIcon.className = "uil uil-wifi";
    popupTitle.innerText = "connection restored";
    popupDesc.innerHTML =
      "your device is now successfully connected to the internet.";
    popup.classList.add("online");
    return setTimeout(() => popup.classList.remove("show"), 2000);
  }
  //if the status is false (offline).update icon,title, and description accordingly
  wifiIcon.className = "uil uil-wifi-slash";
  popupTitle.innerText = "connection lost";
  popupDesc.innerHTML =
    " Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds";
  popup.className = "popup show";

  intervalId = setInterval(() => {
    // set an interval to decrease the timer by 1 every second
    timer--;
    if (timer === 0) checkConnection(); // if the timer reaches 0,checked the connection again
    popup.querySelector(".desc b").innerText = timer;
  }, 1000);
  console.log(intervalId);
};
//only if isOnline is true, check the connection status every 3 seconds
setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);
