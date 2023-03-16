const {createApp} = Vue 

const app = createApp({
    data(){
        return{
            id : "",
            events : undefined,
            eventId : undefined,
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(dataEvents => {
            this.events = dataEvents.events
            const params = new URLSearchParams(location.search)
            this.id = params.get("id")
            this.eventId = this.filterEventById()
        })
        .catch(error => console.log(error))
    },
    methods:{
        filterEventById(){
            return this.events.filter(event => event._id == this.id)
        }
    }
})
app.mount("#appCardDetail")