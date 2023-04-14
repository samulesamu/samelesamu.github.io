const capitalize = s => s && s[0].toUpperCase() + s.slice(1)


async function populatableRows(){
    await fetch('https://api.openweathermap.org/data/2.5/weather?q=Paris,fr&units=metric&APPID=bc425ac2188d406c884f4fdd88b339f0')
    .then(response => {
        if (response.status !== 200) {
            console.log(`Error Status Code: ${response.status}`);
            return;
        }
        response.json().then(data => {
            let strTableRows = `
            <tr>
                <td><span>Summary</span></td>
                <td>${capitalize(data["weather"][0]["description"])}</td>
            </tr>
            <tr>
                <td><span>Temperature</span></td>
                <td>${capitalize(data["main"]["temp"]+ " &deg;C")}</td>
            </tr>
            <tr>
                <td><span>Humidity</span></td>
                <td>${capitalize(data["main"]["humidity"])}</td>
            </tr>
            <tr>
                <td><span>Pressure</span></td>
                <td>${capitalize(data["main"]["pressure"]+" Pa")}</td>
            </tr>`;
            document.querySelector("#table-weather-dublin tbody").innerHTML = strTableRows; 

        });
    })
    .catch(err => {
        console.log('Fetch Error :-S', err);
    });
}


function change_background() {
    let d = new Date();
    let n = d.getHours();
    if (n>23 || n<=6) {
        document.querySelector(".theme-js").style.backgroundImage = "url('assets/img/dublin-night.jpg')";
    } else {
        document.querySelector(".theme-js").style.backgroundImage = "url('assets/img/dublin-day.jpg')";
    }

}

change_background();

document.addEventListener("DOMContentLoaded", populatableRows);