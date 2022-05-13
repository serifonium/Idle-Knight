
dataCache.resources = [
    {name: "Stone", value: 1},
    {name: "Clay", value: 2},
    {name: "Dirt", value: 1},
    {name: "Iron", value: 5},
    {name: "Copper", value: 3},
    {name: "Gold", value: 320},
    {name: "Ruby", value: 2400},
    {name: "Diamond", value: 5600},
    {name: "Topaz", value: 1900},
    {name: "Emerald", value: 2300},
    {name: "Wood", value: 2},
    //{name: "Stone", value: 1},
    //{name: "Stone", value: 1},
    //{name: "Stone", value: 1},
    
]

class Resource {
    constructor(name, amount) {
        this.name = name
        this.amount = amount
        for(let i in dataCache.resources) {
            if(dataCache.resources[i].name === this.name) {
                this.value = dataCache.resources[i].value
            }
        }
    }
}

dataCache.weapons = [
    {name: "Wooden Stick", dmg: 3}
]



class Weapon {
    constructor(name) {
        this.name = name
        for(let i in dataCache.weapons) {
            if(dataCache.weapons[i].name === this.name) {
                this.dmg = dataCache.weapons[i].dmg
            }
        }
    }
}