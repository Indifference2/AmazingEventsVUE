const {createApp} = Vue 

const app = createApp({
    data(){
        return{
            pastEvents : [],
            upComingEvents : [],
            eventsWithPercentage : "",
            HighestPercentageEventName : "",
            LowestEventPercentageName : "",
            LargestCapacityEventName : "",
            categories : [],
            statsUpComingEvents : [],
            statsPastEvents : [],
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/amazing")
        .then(response => response.json())
        .then(dataEvents => {
            this.pastEvents = dataEvents.events.filter(currentEvent => currentEvent.date < dataEvents.currentDate)
            this.upComingEvents = dataEvents.events.filter(currentEvent => currentEvent.date > dataEvents.currentDate)
            this.eventsWithPercentage = this.arrayObjOfPercentagePastEvents()
            this.HighestPercentageEventName = this.highestEventPercentageName()
            this.LowestEventPercentageName = this.lowestEventPercentageName()
            this.LargestCapacityEventName = this.largestEventCapacityName()
            
            this.categories = this.allCategories()
            this.statsUpComingEvents = this.categories.map(category =>{
                const upComingEventsByCategory = this.upComingEvents.filter(currentEvent => currentEvent.category === category)
                const revenue = upComingEventsByCategory.reduce((acc, currentEvent) =>{
                    acc += (currentEvent.estimate * currentEvent.price)
                    return acc
                }, 0)
                const totalEstimate = upComingEventsByCategory.reduce((acc, currentEvent) =>{
                    acc += currentEvent.estimate
                    return acc
                }, 0)
                const totalCapacity = upComingEventsByCategory.reduce((acc, currentEvent) =>{
                    acc += currentEvent.capacity
                    return acc
                }, 0)
                let newUpComingEvents = {}
                newUpComingEvents.category = category
                newUpComingEvents.revenue = revenue
                newUpComingEvents.percentage = ((totalEstimate * 100) / totalCapacity).toFixed(2)
                return newUpComingEvents
            })

            this.statsPastEvents = this.categories.map(category =>{
                const pastEventsByCategory = this.pastEvents.filter(currentEvent => currentEvent.category === category)
                const revenue = pastEventsByCategory.reduce((acc, currentEvent) =>{
                    acc += (currentEvent.assistance * currentEvent.price)
                    return acc
                }, 0)
                console.log(revenue)
                const totalAssistance = pastEventsByCategory.reduce((acc, currentEvent) =>{
                    acc += currentEvent.assistance
                    return acc
                }, 0)
                const totalCapacity = pastEventsByCategory.reduce((acc, currentEvent) =>{
                    acc += currentEvent.capacity
                    return acc
                }, 0)
                let newPastEvents = {}
                newPastEvents.category = category
                newPastEvents.revenue = revenue
                newPastEvents.percentage = ((totalAssistance * 100) / totalCapacity).toFixed(2)
                return newPastEvents
            })
        })
    },
    methods: {
        arrayObjOfPercentagePastEvents(){
            return this.pastEvents.map(currentEvent =>{
                let newArrayObjPastEvents = {}
                newArrayObjPastEvents.name = currentEvent.name
                newArrayObjPastEvents.percentage = ((currentEvent.assistance * 100) / currentEvent.capacity).toFixed(2)
                return newArrayObjPastEvents
            })
        },
        highestEventPercentageName(){
            return this.eventsWithPercentage.sort((a,b) => b.percentage - a.percentage).slice(0,1)[0].name
        },
        lowestEventPercentageName(){
            return this.eventsWithPercentage.slice(this.eventsWithPercentage.length - 1)[0].name
        },
        largestEventCapacityName(){
            return this.pastEvents.sort((a,b) => b.capacity - a.capacity).slice(0,1)[0].name
        },
        allCategories(){
            return Array.from(new Set(this.upComingEvents.map(currentEvent => currentEvent.category)))
        },
    }
})

app.mount("#app")