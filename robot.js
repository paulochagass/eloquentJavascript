const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
];

function buildGraph(edges) {
    let graph = new Map()

    function addEdge(from, to) {
        if (!graph.has(from)) {
            graph.set(from, [to])
        } else {
            graph.get(from).push(to);
        }
    }

    for (let [from, to] of edges.map(edge => edge.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }

    return graph;
}

const roadGraph = buildGraph(roads);

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if (!roadGraph.get(this.place).includes(destination)) return this;

        const moveParcels = parcel => {
            if (parcel.place != this.place) return parcel;

            return { place: destination, address: parcel.address };
        }

        const packagesNotDelivered = parcel => parcel.place != parcel.address

        const parcels = this.parcels.map(moveParcels).filter(packagesNotDelivered);

        return new VillageState(destination, parcels);
    }

    static random(parcelCount = 5) {
        let parcels = [];
        for (let i = 0; i < parcelCount; i++) {
            const keys = Array.from(roadGraph.keys())
            let address = randomPick(keys);
            let place;
            do {
                place = randomPick(keys);
            } while (place == address);
            parcels.push({place, address});
        }
        return new VillageState("Post Office", parcels);
    }
}

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph.get(state.place))};
}

runRobot(VillageState.random(), randomRobot);