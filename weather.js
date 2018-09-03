Vue.component("v-select", VueSelect.VueSelect);
Vue.component('forecast-component', {
  props: ['cities'],
  template: '#forecast-template',
  data: function() {
    return {
      city: 'Lahore',
      show: false,
      loading: false,
      report: null,
      icon: null
    }
  },
  created: function() {
    this.getReport();
  },
  filters: {
    in_km: function(meters) {
      return Math.round(meters / 1000) + " KM";
    },
    get_time: function(unix_stamp) {
      let time = new Date(unix_stamp*1000);
      let hours = time.getHours();
      let minutes = time.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';

      minutes = minutes < 10 ? '0'+minutes : minutes;
      hours = hours % 12;
      hours = hours ? hours : 12;
      time = hours + ':' + minutes + ' ' + ampm;

      return time;
    },
    get_date: function(unix_stamp) {
      let date = new Date(unix_stamp*1000);
      let time = date;
      let month = [
        'January',
        'Febuary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      // let month = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth();
      let mdate = date.getDate() < 10 ? '0'+date.getDate() : date.getDate();

      date = mdate+' '+month[date.getMonth()];

      return date;
    }
  },
  methods: {
    getReport: function() {
      if (this.city) {
        this.show = false;
        this.loading = true;
        this.$http.get('weather.php?city='+this.city+'&current=false').then(response => {
          this.report = response.body;
          this.show = true;
          this.loading = false;
        });
      }
    },
    getIcon: function(weather) {
      return "http://openweathermap.org/img/w/"+weather.weather[0].icon+".png";
    },
    getTemp: function(kelvin_temp) {
      return Math.round(kelvin_temp - 273.15);
    }
  }
});
Vue.component('weather-component', {
  props: ['cities'],
  data: function() {
    return {
      show: false,
      loading: false,
      weather: {
        city: 'Lahore',
        report: null,
        icon: null
      },
    }
  },
  template: '#weather-template',
  filters: {
    in_km: function(meters) {
      return Math.round(meters / 1000) + " KM";
    }
  },
  methods: {
    getReport: function() {
      if (this.weather.city) {
        this.show = false;
        this.loading = true;
        this.$http.get('weather.php?city='+this.weather.city+'&current=true').then(response => {
          this.weather.report = response.body;
          this.getIcon(this.weather.report.weather[0].icon);
          this.show = true;
          this.loading = false;
        });
      }
    },
    getIcon: function(icon) {
      this.weather.icon = "http://openweathermap.org/img/w/"+icon+".png";
    },
    getTemp: function(kelvin_temp) {
      return Math.round(kelvin_temp - 273.15);
    }
  }
});

new Vue({
  el: '#app',
  data: function() {
    return {
      cities: [
        "Abbottabad",
        "Aliabad",
        "Alpurai",
        "Awaran",
        "Attock City",
        "Athmuqam",
        "Bannu",
        "Bahawalpur",
        "Bardar",
        "Bagh",
        "Badin",
        "Batgram",
        "Barkhan",
        "Bahawalnagar",
        "Bhakkar",
        "Chiniot",
        "Chaman",
        "Chakwal",
        "Charsadda",
        "Chilas",
        "Chitral",
        "Dera Ghazi Khan",
        "Dera Ismail Khan",
        "Dera Allahyar",
        "Dera Murad Jamali",
        "Dera Bugti",
        "Dadu",
        "Daggar",
        "Dalbandin",
        "Dasu",
        "Eidgah",
        "Faisalabad",
        "Gujranwala",
        "Gujrat",
        "Gilgit",
        "Gwadar",
        "Ghotki",
        "Gandava",
        "Gakuch",
        "Hyderabad City",
        "Haripur",
        "Hafizabad",
        "Hangu",
        "Islamabad",
        "Jhang Sadr",
        "Jhang City",
        "Jhelum",
        "Jamshoro",
        "Jacobabad",
        "Karachi",
        "Kasur",
        "Kohat",
        "Kundian",
        "Karak",
        "Kotli",
        "Khushab",
        "Kohlu",
        "Khuzdar",
        "Kalat",
        "Khanewal",
        "Khairpur",
        "Kharan",
        "Kandhkot",
        "Lahore",
        "Larkana",
        "Lodhran",
        "Loralai",
        "Lakki Marwat",
        "Leiah",
        "Multan",
        "Mirpur Khas",
        "Masiwala",
        "Mehra",
        "Matiari",
        "Mansehra",
        "Muzaffargarh",
        "Mardan",
        "Mastung",
        "Malakand",
        "Mandi Bahauddin",
        "Mianwali",
        "Musa Khel Bazar",
        "Nawabshah",
        "Nankana Sahib",
        "Nowshera",
        "Narowal",
        "Naushahro Firoz",
        "New Mirpur",
        "Okara",
        "Peshawar",
        "Parachinar",
        "Pakpattan",
        "Pishin",
        "Panjgur",
        "Quetta",
        "Qila Abdullah",
        "Qila Saifullah",
        "Rawalpindi",
        "Rahimyar Khan",
        "Rajanpur",
        "Rawala Kot",
        "Serai",
        "Sargodha",
        "Sialkot City",
        "Sukkur",
        "Sheikhupura",
        "Sadiqabad",
        "Shahdad Kot",
        "Sahiwal",
        "Sanghar",
        "Shikarpur",
        "Saidu Sharif",
        "Sibi",
        "Swabi",
        "Turbat",
        "Thatta",
        "Tando Allahyar",
        "Tank",
        "Toba Tek Singh",
        "Timargara",
        "Tando Muhammad Khan",
        "Uthal",
        "Umarkot",
        "Upper Dir",
        "Vihari",
        "Zhob",
        "Ziarat",
      ]
    }
  }
});
