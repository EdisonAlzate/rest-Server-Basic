const express = require('express')
require('dotenv').config()
const cors = require('cors')

class Server{
    constructor(){
        this.app = express()  
        this.port=process.env.PORT
        this.usuarioPath='/api/usuarios'
        

        
       
        //Midleware
        this.middlewares()

        //rutas de mi aplicacion 
        this.routes()
    }

    
    middlewares(){

        //cors
        this.app.use(cors())

        //lectura y parseo del body
        this.app.use(express.json())

        //directorio public 
        this.app.use(express.static('public'))
    }    
    
ro
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