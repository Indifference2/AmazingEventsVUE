const {createApp} = Vue

const app = createApp({
    data() {
        return {
            valueSearch : "",
            categories : [],
            events: [],
            checked: [],
            eventsFiltered : undefined
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(dataEvents =>{
            this.categories =  Array.from(new Set(dataEvents.events.map(event => event.category)))
            this.events = dataEvents.events
            this.eventsFiltered = this.events
        })
        .catch(error => console.log(error))
    },
    methods :{
        filterCross(){
            let filterSearch = this.events.filter(item => item.name.toLowerCase().includes(this.valueSearch.toLowerCase()))
            let filterCheck = filterSearch.filter(item => this.checked.includes(item.category) || this.checked.length == 0)
            this.eventsFiltered = filterCheck
            }
        }
    }
)

app.mount("#app")


