const { response } = require("express")
const { findOne } = require("../models/usuarios")
const usuarios = require("../models/usuarios")
const Usuarios = require("../models/usuarios")
const bcrypt = require('bcrypt');


const obtenerUsuario=(req, res=response)=> {
       res.json('gets desde controllers')
   }
const crearUsuario=async(req, res=response)=> {
   
    const {nombre,correo,password,rol}=req.body
    const usuario=new Usuarios({nombre,correo,password,rol})

  
    
    //encryptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);



    //guardar en base de datos 
    await usuario.save()
   
    res.json({
        ok:true,       
        usuario
        
    })
}

const actualizarUsuario= async(req, res=response)=> {
   const id=req.params.id
   const {_id,password,correo,google,...resto}=req.body

   if(password){
       //encryptar contraseña
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
   }

     const usuario=await Usuarios.findByIdAndUpdate(id,resto)
    
    res.json({
        ok:true,
        msg:id,
        usuario
    })
}

const eliminarUsuario=(req, res=response)=> {
    res.send('eliminar desde controllers ')
}
const patchUsuario=(req, res=response)=> {
    res.send('patch desde controllers ')
}
   




module.exports={
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    patchUsuario
}