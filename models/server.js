const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('../database/config.db')

class Server{
    constructor(){
        this.app = express()  
        this.port=process.env.PORT
        this.usuarioPath='/api/usuarios'
        

        //base de datos 
        this.dbConnet()
       
        //Midleware
        this.middlewares()

        //rutas de mi aplicacion 
        this.routes()
    }

    async  dbConnet(){
       await dbConnection(process.env.MONGODB_CNN)
    } 
    
    middlewares(){

        //cors
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json())

        //directorio public 
        this.app.use(express.static('public'))
    }    
    

   routes(){
    this.app.use( this.usuarioPath, require('../routes/usuarios'))
    } 
       
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto ',this.port)
        })
    }

}

module.exports=Server;