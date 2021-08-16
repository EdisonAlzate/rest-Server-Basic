const { response } = require("express")


const obtenerUsuario=(req, res=response)=> {
       res.json('gets desde controllers')
   }
const crearUsuario=(req, res=response)=> {
   
    const {correo,nombre}=req.body
    const id = req.params.id
   
    res.json({
        ok:true,
        msg:'post desde controllers ',
        correo,
        nombre,
        id
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