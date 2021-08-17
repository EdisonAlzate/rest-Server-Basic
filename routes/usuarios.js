const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, obtenerUsuario, actualizarUsuario, eliminarUsuario, patchUsuario } = require("../controllers/usuarios.controllers");
const {validarCampos} = require("../middleware/validar-campos");
const Role = require("../models/role");

const router = Router()

router.get(
    '/', obtenerUsuario)

router.post('/',
    [
        
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña debe de tener al menos 6 caracteres').isLength({min:6}),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
       check('rol').custom( async(rol='')=>{
               const existeRol= await Role.findOne({rol})
               if (!existeRol) {
                   throw new error(`El rol ${rol} no esta registrado en la BD  `)
               }
           
       }),
        validarCampos
    ],crearUsuario)


router.put('/', actualizarUsuario)
router.delete('/', eliminarUsuario)
router.patch('/', patchUsuario)

module.exports = router