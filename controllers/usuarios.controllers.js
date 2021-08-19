const { response } = require("express")
const { findOne, findByIdAndUpdate } = require("../models/usuarios")
const usuarios = require("../models/usuarios")
const Usuarios = require("../models/usuarios")
const bcrypt = require('bcrypt');


const obtenerUsuario=async(req, res=response)=> {

    const {limit=5,desde=0}=req.query
    const query={estado:true}

    const [total,usuarios]= await  Promise.all([
        Usuarios.countDocuments(query),
        Usuarios.find(query)
                .skip(Number(desde))
                .limit(Number(limit))
    ])
   
    
    res.json({
        total,
        usuarios

    })
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

const eliminarUsuario=async(req, res=response)=> {
    const {id}=req.params
    
   const usuarioEliminado= await Usuarios.findByIdAndUpdate(id,{estado:false})
    
    res.json({
        msg:id,
        usuarioEliminado
    }
    )
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