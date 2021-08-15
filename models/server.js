const express = require('express')
require('dotenv').config()

class Server{
    constructor(){
        this.app = express()  
        this.port=process.env.PORT
       
        //Midleware
        this.middlewares()

        //rutas de mi aplicacion 
        this.routes()
    }

    //directorio public 

    middlewares(){

        this.app.use(express.static('public'))
    }    
    

   routes(){
    this.app.get('/api', (req, res)=> {
        res.send('Hello Edisonnnn humberto ALZATEE ')
    })
    } 
       
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corriendo en puerto ',this.port)
        })
    }

}

module.exports=Server;