let cities = [
  {
    country: "EG",
    name: "القاهرة",
    iso: "Cairo",
  },
  {
    country: "EG",
    name: "الإسكندرية",
    iso: "Alexandria",
  },
  {
    country: "EG",
    name: "أسوان",
    iso: "Aswan",
  },
  {
    country: "SA",
    name: "مكة المكرمة",
    iso: "Makkah al Mukarramah",
  },
  {
    country: "SA",
    name: "المدينة المنورة",
    iso: "Al Madinah al Munawwarah",
  },
  {
    country: "SA",
    name: "الرياض",
    iso: "Al Riyad",
  },
  {
    country: "AE",
    name: "دبي",
    iso: "Dubai",
  },
  {
    country: "AE",
    name: "الشارقة",
    iso: "Sharjah",
  },
];
getTime("Cairo", "EG");
let select = document.querySelector("select");
for (city of cities) {
  select.innerHTML += `<option>${city.name}</option>`;
}
select.onchange = function () {
  document.querySelector(".head h1").innerHTML = select.value;
  let cityName = "";
  let country = "";
  for (city of cities) {
    if (city.name == this.value) {
      cityName = city.iso;
      country = city.country;
    }
  }
  getTime(cityName, country)
};

function getTime(city, country) {
  let params = {
    city: city,
    country: country,
  };
  axios
    .get("http://api.aladhan.com/v1/timingsByCity", { params: params })
    .then((res) => {
      let response = res.data;
      let data = response.data;
      let date = data.date.readable;
      let day = data.date.hijri.weekday.ar;

      let times = data.timings;

      let dayCon = document.querySelectorAll(".head h4");
      let timeCon = document.querySelectorAll(".cards .card span");
      dayCon[0].innerHTML = day;
      dayCon[1].innerHTML = date;

      timeCon[0].innerHTML = times.Fajr;
      timeCon[1].innerHTML = times.Sunrise;
      timeCon[2].innerHTML = times.Dhuhr;
      timeCon[3].innerHTML = times.Asr;
      timeCon[4].innerHTML = times.Maghrib;
      timeCon[5].innerHTML = times.Isha;
    });
}
