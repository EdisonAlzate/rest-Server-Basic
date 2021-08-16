const { Router } = require("express");
const { crearUsuario, obtenerUsuario, actualizarUsuario, eliminarUsuario, patchUsuario } = require("../controllers/usuarios.controllers");

const router=Router()

    router.get('/',obtenerUsuario)
    router.post('/:id',crearUsuario )
    router.put('/', actualizarUsuario)
    router.delete('/', eliminarUsuario)
    router.patch('/', patchUsuario) 

module.exports=router