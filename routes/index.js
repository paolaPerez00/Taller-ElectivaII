const express = require('express')
const router = express.Router()

const pet = require('./../resources/files/pet');
const service = require('./../resources/files/service');
const Customer = require('../Class/Customer')
const Pet = require('./../Class/Pet');
const Rendezvous = require('../Class/Rendezvous');

//Credenciales del veterinario
const userV = {
    user : "gina",
    password : "petshop"
}

let customers = []
let rendezvous = []

//Página principal opciones
router.get('/', (req, res) => {
    res.render("index", { title: "Bienvenido a PETSHOP" });
});

//Ingreso veterinario
router.get('/login', (req, res) => {
    res.render("login", { title: "Ingreso credenciales"});
});

//Validación datos delveterinario
router.post('/login', (req, res)=>{
    const{user, password} = req.body
    console.log(`${user} ${password} `)
    if(user == userV.user && password == userV.password){
        res.redirect('/view');
    }else{
        res.end("Usuario inválido")
    }
  });

router.get('/view', (req,res)=>{
    res.render("view", {title: "Consultas registradas",rendezvous: rendezvous})
})

//Página principal opciones
router.get('/service', (req, res) => {
    res.render("service", { title: "Nuestros servicios" });
});

//Ingreso página de creación cliente
router.get('/insertCustomer', (req, res) => {
    res.render("insertCustomer", { title: "Registrate", pets: pet.pets });
});

//Ingreso pagina solicitud cita
router.get('/createRendezvous', (req, res) => {
    res.render("createRendezvous", { title: "Pide tu cita", services: service.services });
});

//Ingreso pagina busqueda de consulta
router.get('/searchRendezvous', (req, res) => {
    res.render("searchRendezvous", { rendezvous: rendezvous, title: "Consulta cita" });
});

//Eliminar una cita perfil cliente
router.get('/delete/:idRendezvous', (req,res) =>{
    const rendezvousC = rendezvous.find(rendezvous => rendezvous.idRendezvous == req.params.idRendezvous)
    rendezvous = rendezvous.splice(rendezvousC.idRendezvous)
    res.render("searchRendezvous", {title: "Consulta cita", rendezvous: rendezvous})
})

//Eliminar una cita perfil veterinario
router.get('/deleteV/:idRendezvous', (req,res) =>{
    const rendezvousC = rendezvous.find(rendezvous => rendezvous.idRendezvous == req.params.idRendezvous)
    rendezvous = rendezvous.splice(rendezvousC.idRendezvous)
    res.render("view", {title: "Consultas registradas", rendezvous: rendezvous})
})

//Envio datos para guardar cita
router.post('/createRendezvous', (req, res) => {
    const { idCustomer, namePet, dateR, time, serviceP } = req.body;
    const idRendezvous = rendezvous.length + 1
    const servicePet = service.services.find(service => service.id == serviceP).name
    const customer = customers.find(customer => customer.id == idCustomer);
    if (customer != undefined) {
        if (customer.Pet.name == namePet) {
            let newRendezvous = new Rendezvous(idRendezvous, idCustomer, namePet, dateR, time, servicePet)
            rendezvous.push(newRendezvous)
            console.log(`Cita #${idRendezvous} generada con éxito`)
           return  res.redirect('/searchRendezvous')
        } else {
            console.log(`La mascota ${namePet} no existe`)
           // res.redirect('/createRendezvous')
            return res.send('No  tienes una mascota con ese nombre')
        }
    } else {
        console.log(`El número  #${idCustomer} no existe`)
        return res.send(`El número  #${idCustomer} no existe`)
    }
})

//Envio datos para guardar cliente
router.post('/insertCustomer', (req, res) => {
    const { id, name, lastname, phone, address, species, breed, namePet, agePet, gender } = req.body;
    const speciesPet = pet.pets.find(pet => pet.id == species).species
    const genAux = gender == 'F' ? "Femenino" : "Masculino";
    const user = customers.find(customer => customer.id == id);
    if (user == undefined || user == "") {
        let newPet = new Pet(speciesPet, breed, namePet, agePet, genAux)
        let customer = new Customer(id, name, lastname, phone, address, newPet)
        customers.push(customer)
        console.log(`Cliente creado con éxito`)
        return res.redirect('/')
    } else {
        console.log(`El número de identificación ${id} ya existe`)
        return res.send(`El número de identificación ${id} ya existe`)
    }
})

module.exports = router