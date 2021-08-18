const Role = require("../models/role");
const Usuarios = require("../models/usuarios");


const rolesPermitidos= async(rol='')=>{
    const existeRol= await Role.findOne({rol})
    if (!existeRol) {
        throw new error(`El rol ${rol} no esta registrado en la BD  `)
    }

}


 //validar si el correo ya existe en la base de datos 
 const emailExiste=async(correo='')=>{

     const existeCorreo=await Usuarios.findOne({correo})
     if (existeCorreo) {
        throw new Error(`El correo ${correo} no esta registrado en la BD  `)
     }
 }



module.exports={
    rolesPermitidos,
    emailExiste
    }