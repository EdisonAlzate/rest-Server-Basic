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

    //validar si el correo ya existe en la base de datos 
    const existeCorreo=await Usuarios.findOne({correo})
    if (existeCorreo) {
        return res.status(400).json({
            msg:'El correo ya existe en la base de datos '
        })
    }
    
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
const actualizarUsuario=(req, res=response)=> {
    res.send('actualizar desde controllers ')
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