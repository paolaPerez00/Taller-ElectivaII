class Pet{
    constructor(species, breed, name, age, gender) {
        this.species = species
        this.breed = breed 
        this.name = name
        this.age = age
        this.gender = gender
    }

    getPet(){
        return `
            species=${this.species}
            breed=${this.breed} 
            name=${this.name} 
            age=${this.age} 
            gender=${this.gender} 
        `
    }
}
module.exports = Pet