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

const listEl = document.querySelector(".list");

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
        date: new Date(),
        distance: distanceEl.value,
        duration: durationEl.value,
        ...workoutLocation
    }
    if (workout.type === "cycling") {
        workout.elevation = elevationEl.value;
    } else {
        workout.cadence = cadenceEl.value;
    }

    workingouts.unshift(workout);


    form.classList.remove("open");

    workoutListView(workingouts);

    console.log(workout);
}

submitEl.addEventListener("click", addWorkout);

typeSelector.addEventListener("change", (ev) => {
    cadenceRow.classList.toggle("close");
    elevationRow.classList.toggle("open");

});

function workoutListView (workoutList) {
    const borderColor = (type) => type === "cycling" ? "green__tag" : "yellow__tag";

    const list = workoutList
        .map(w => `<li class="workoutItem ${borderColor(w.type)}">${workoutView(w)}</li>`)
        .join("");

    listEl.innerHTML = 
        `<ul class="workoutList">
            ${list}
        </ul>`;
}

function workoutView (w) {
    return `
            <div><span>${w.type}</span> on <span>${w.date}</span></div>
            <div>
                <div><span>${w.distance}</span> KM</div>
                <div><span>${w.duration}</span> MIN</div>
                <div><span>${(w.distance / w.duration * 1000).toFixed(1)}</span> M/MIN</div>
                <div>
                    <span>${w.type === "running" ? w.cadence : w.elevation}</span>
                    ${w.type === "running" ? "SPM" : "M"}</div>
                <div></div>
            </div>`;
}