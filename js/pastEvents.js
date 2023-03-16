const {createApp} = Vue 

const app = createApp({
    data(){
        return{
            pastEvents: [],
            categories: [],
            pastEventsFiltered: undefined,
            valueSearch : "",
            checked : []
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(dataEvents =>{
            this.pastEvents = dataEvents.events.filter(event => event.date < dataEvents.currentDate)
            this.categories = Array.from(new Set(this.pastEvents.map(event => event.category)))
            this.pastEventsFiltered = this.pastEvents
        })
        .catch(error => console.log(error))
    },
    methods:{
        filterCross(){
            let filterSearch = this.pastEvents.filter(event => event.name.toLowerCase().includes(this.valueSearch.toLowerCase()))
            let filterCheck = filterSearch.filter(event => this.checked.includes(event.category) || this.checked.length == 0 )
            this.pastEventsFiltered = filterCheck
        }
    },
})

app.mount("#app")