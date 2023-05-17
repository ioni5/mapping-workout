const workingouts = [];

const durationEl = document.querySelector("#duration");
const distanceEl = document.querySelector("#distance");
const cadenceEl = document.querySelector("#cadence");
const locationEl = document.querySelector("#location");
const submitEl = document.querySelector("#submit");

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        const coords = [position.coords.latitude, position.coords.longitude];
        
        var map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }, () => alert("Could not get your position"));
} 

submitEl.addEventListener("click", (ev) => {
    ev.preventDefault();
    workingouts.push({
        distance: distanceEl.value,
        duration: durationEl.value,
        cadence: cadenceEl.value,
        location: locationEl.value
    });

    console.log(workingouts);
});
