class Customer{
    constructor(id, name, lastname, phone, address, Pet) {
        this.id = id
        this.name = name
        this.lastname = lastname
        this.phone = phone
        this.address = address
        this.Pet = Pet
    }

    getCustomer(){
        return `
            id=${this.id}
            name=${this.name} 
            lastname=${this.lastname} 
            phone=${this.phone} 
            address=${this.address} 
            this.Pet = Pet
        `
    }
}

module.exports = Customer