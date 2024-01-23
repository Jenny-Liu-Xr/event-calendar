Vue.component('day', {
  props: ['day', 'month', 'year'],
  computed: {
    events: function () {
      return this.$root.events.filter(event => {
        return event.day === this.day &&
          event.month === this.month &&
          event.year === this.year
      })
    }
  },
  template: `
  <div>
    <div @click="add">{{ day }}</div>
<div v-if="event">
<div class="put">
<button
        @click="resets">reset</button>
<input v-model="text" />
<input v-model="details"/>
<button @click="addEvents">Add Events</button>
<div v-for="todo in todoList">

        {{ todo.firstname }} {{ todo.lastname }}
<button @click="deleteTodo(index)">Delete</button>
</div>
</div>

  </div>
  </div>
`,
  data () {
    return {
      event: false,
      list: [],
      text: "",
      details: "",
    }
  },
  methods: {
    add () {
      this.event = true
    },
    resets () {
      this.event = false
    },
    addEvents () {
      this.list.push({
        text: this.text,
        details: this.details,
      })
      // this.reset()
    },
    reset () {
      this.text = ""
      this.details = ""
    },
    deleteTodo (index) {
      this.list.splice(index, 1)

    }
  }

})
/*
Vue.component('day', {

  props: ['day', 'month', 'year', 'add', 'event'],
  methods: {



  },
  computed: {
    events: function () {
      return this.$root.events.filter(event => {
        return event.day === this.day &&
          event.month === this.month &&
          event.year === this.year
      })
    }
  },
  template: `<div>
  {{day}}
  <div v-for="event in events" @click="clickEvent()">
    {{event.time}} {{event.text}}
  </div>
  </div>`
})

*/
const app = new Vue({
  el: '#app',
  data: {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    selected: {
      month: 0, //Jan
      year: 2020
    },
    isShow: false,
    updateShow: false,
  },
  /*
  events: [
    {
      text: '',
      details: '',
      day: '',
      month: '',
      year: '',
      time: '',

    }
  ],*/
  /*
      events: [
        { id: 1, text: 'Final Assignment', day: 16, month: 0, year: 2020, time: '11:59 PM', details: 'Contact Book due' },
        { id: 2, text: 'Term End', day: 18, month: 0, year: 2020, time: '11:59 PM', details: 'The end of this term' }
      ],
      time: '',
      day: '',
      month: '',
      year: '',*
      /*
 
},*/
  //localstorage

  mounted: function () {
    if (localStorage.events) {
      this.events = JSON.parse(localStorage.events)
    }
  },
  watch: {
    events: {
      handler: function (events) {
        localStorage.events = JSON.stringify(this.events)
      },
      deep: true
    }
  },

  methods: {
    getDate (date) {
      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDay(),
        date: date.getDate()
      }
    },
    addEvent () {
      this.isShow = !this.isShow
    },
    addButton () {
      this.events.push({
        text: this.text,
        details: this.details,
        day: this.day,
        month: this.month,
        year: this.year
      })

      this.isShow = false
      this.updateShow = false
    },
    /*
    formatDate (datetime) {

      switch (month) {
        case 0:
          return 'January'
        case 1:
          return 'February'
        case 2:
          return 'March'
        case 3:
          return 'April'
        case 4:
          return 'May'
        case 5:
          return 'June'
        case 6:
          return 'July'
        case 7:
          return 'August'
        case 8:
          return 'September'
        case 9:
          return 'October'
        case 10:
          return 'November'
        case 11:
          return 'December'
      }
      return month

    },
    dateTime () {
      this.beginYear = 2020
      this.endYear = 2025
      this.dateFormatStyle = 'dd-MM-yyyy'
      if (beginYear != null && endYear != null) {
        this.beginYear = beginYear
        this.endYear = endYear
      }
      if (dateFormatStyle != null) {
        this.dateFormatStyle = dateFormatStyle
      }
    },*/


    deleteButton () {
      localStorage.removeItem('event');
      this.updateShow = false
      this.isShow = false

    },



    clickEvent (e) {
      const monthNo = this.month
      const month = monthNo <= 11 ? monthNo + 1 : 0
      const date = {
        year: this.year,
        month: month,
        week: new Date(
          this.year,
          this.month,
          e.target.innerText
        ).getDay(),
        day: Number(e.target.innerText)
      }


    },
    updateEvent () {
      this.updateShow = false
    }
  },


  computed: {
    //last day of selected month
    daysInMonth: function () {
      const date = new Date(this.selected.year, this.selected.month + 1, 0).getDate()
      return date
    },
    startDay: function () {
      const date = new Date(this.selected.year, this.selected.month, 1).getDay()
      return date
    },
    activeClass () {
      return {
        actived: new Date().getUTCFullYear() === this.year && new Date().getMonth() === this.month && new Date().getDate() === this.date
      }
    },


  }
})