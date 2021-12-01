class Rendezvous {

    constructor(idRendezvous,idCustomer, namePet,date, time, service) {
        this.idRendezvous = idRendezvous
        this.idCustomer = idCustomer
        this.namePet = namePet
        this.date = date
        this.time = time
        this.service = service
    }

    getPet() {
        return `
            idRendezvous = ${this.idRendezvous}
            idCustomer   = ${this.idCustomer}
            namePet      = ${this.namePet}
            date         = ${this.date} 
            time         = ${this.time}
            service      = ${this.service}
        `
    }
}
module.exports = Rendezvous