const {createApp} = Vue 

const app = createApp({
    data(){
        return{
            upcomingEvents : [],
            checked : [],
            valueSearch : "",
            upcomingEventsFiltered : undefined,
            categories : [],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(dataEvents => {
            this.upcomingEvents = dataEvents.events.filter(event => event.date > dataEvents.currentDate)
            this.categories = Array.from(new Set(this.upcomingEvents.map(event => event.category)))
            this.upcomingEventsFiltered = this.upcomingEvents
        })
    },
    methods:{
        crossFilter(){
            let filterSearch = this.upcomingEvents.filter(event => event.name.toLowerCase().includes(this.valueSearch.toLowerCase()))
            let filterCheck = filterSearch.filter(event => this.checked.includes(event.category) || this.checked.length == 0)
            this.upcomingEventsFiltered = filterCheck
        }
    }
})

app.mount("#app")