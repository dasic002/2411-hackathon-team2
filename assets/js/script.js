let today = new Date();

function displayCurrentDate() {
    // Display the current date in the DOM
    let currentDate = document.querySelector("#greeting-date");
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[today.getDay()];
    let date = today.getDate();
    let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let month = months[today.getMonth()];
    let year = today.getFullYear();
    currentDate.innerHTML = `${day}` + ' ' + `${date}`+ ' ' + `${month}` + ' ' + `${year}`;
}
displayCurrentDate();

function displayGreeting(){
    // Display a different greeting depanding on the time
    hour = today.getHours();
    greeting = document.getElementById("greeting");
    if (hour < 12) {
        greeting.innerHTML = "Good Morning";
    } else if (12 <= hour < 18){
        greeting.innerHTML = "Good Afternoon";
    } else {
        greeting.innerHTML = "Good Evening";
    }
}
displayGreeting()
