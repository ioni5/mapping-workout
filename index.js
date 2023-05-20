const workingouts = [];

const durationEl = document.querySelector("#duration");
const distanceEl = document.querySelector("#distance");
const cadenceEl = document.querySelector("#cadence");
const elevationEl = document.querySelector("#elevation");
const submitEl = document.querySelector("#submit");
const typeSelector = document.querySelector("#type");

const cadenceRow = document.querySelector(".form__row-cadence");
const elevationRow = document.querySelector(".form__row-elevation");

const form = document.querySelector("form");

let workoutLocation = {};

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        
        var map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        map.on('click', (ev) => {
            workoutLocation = ev.latlng;

            form.classList.add("open");
        });
    }, () => alert("Could not get your position"));
} 

function addWorkout(ev) {
    ev.preventDefault();
    let workout = {
        type: typeSelector.value,
        distance: distanceEl.value,
        duration: durationEl.value,
        ...workoutLocation
    }
    if (workout.type === "cycling") {
        workout.elevation = elevationEl.value;
    } else {
        workout.cadence = cadenceEl.value;
    }

    workingouts.push(workout);


    form.classList.remove("open");

    console.log(workout);
}

submitEl.addEventListener("click", addWorkout);

typeSelector.addEventListener("change", (ev) => {
    cadenceRow.classList.toggle("close");
    elevationRow.classList.toggle("open");

});