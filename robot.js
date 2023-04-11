const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

class VillageState {
    constructor(place, parcels, roadGraph) {
        this.place = place;
        this.parcels = parcels;
        this.roadGraph = roadGraph;
    }

    move(destination) {
        if (!this.roadGraph.get(this.place).includes(destination)) {
            return this
        }

        const moveParcels = (parcel) => {
            if (parcel.place !== this.place) return parcel

            return {
                place: destination,
                address: parcel.address
            }
        }

        const parcelsNotDelivered = (parcel) => parcel.place !== parcel.address

        const parcels = this.parcels.map(moveParcels).filter(parcelsNotDelivered)

        return new VillageState(destination, parcels, this.roadGraph)
    }

    static randomPlace = (roadGraph, place, except) => {
        let places = place ? roadGraph.get(place) : Array.from(roadGraph.keys());
        if (except) places = places.filter((p) => p !== except)
        const randomIndex = Math.floor((Math.random() * places.length));
        return places[randomIndex];
    }

    static buildRoadGraph(roads) {
        let roadGraph = new Map()
    
        function buildRoad(from, to) {
            if (!roadGraph.has(from)) {
                roadGraph.set(from, [to])
            } else {
                roadGraph.get(from).push(to);
            }
        }
    
        for (let [from, to] of roads.map(edge => edge.split("-"))) {
            buildRoad(from, to);
            buildRoad(to, from);
        }
    
        return roadGraph;
    }

    static random(roadGraph, parcelCount = 5) {
        const parcels = new Array(parcelCount).fill(null).map(() => {
            const place = this.randomPlace(roadGraph)
            const address = this.randomPlace(roadGraph, false, place)
            return { place, address }
        })
        const place = this.randomPlace(roadGraph)
        return new VillageState(place, parcels, roadGraph)
    }

    static routeRobot(memory) {
        if (memory.length == 0 ) {
            memory = mailRoute;
        }
        return { direction: memory[0], memory: memory.slice(1) }
    }

    static runRobot(villageState) {
        let count = 0
        let memory = [];
        let direction;
    
        while (villageState.parcels.length !== 0) {
            const route = this.routeRobot(memory);

            memory = route.memory;
            direction = route.direction;
            
            villageState = villageState.move(
                direction
            )
            
            count += 1
        }
    
        console.log(count)
    }
}

const roadGraph = VillageState.buildRoadGraph(roads)

const village = VillageState.random(roadGraph)

VillageState.runRobot(village)
