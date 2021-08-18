const { Router } = require("express");
const { check } = require("express-validator");
const { crearUsuario, obtenerUsuario, actualizarUsuario, eliminarUsuario, patchUsuario } = require("../controllers/usuarios.controllers");
const { emailExiste, rolesPermitidos, buscarIdEnBaseDatos } = require("../helpers/rolesPermitidos");

const {validarCampos} = require("../middleware/validar-campos");


const router = Router()

router.get(
    '/', obtenerUsuario)

router.post('/',
    [
        
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña debe de tener al menos 6 caracteres').isLength({min:6}),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
       check('correo').custom(emailExiste),
       check('rol').custom(rolesPermitidos),
        validarCampos
    ],crearUsuario)


router.put('/:id',
[
    check('id').custom(buscarIdEnBaseDatos),
    check('id','No es un ID valido ').isMongoId(),
    check('rol').custom(rolesPermitidos),
    validarCampos
],
 actualizarUsuario)


router.delete('/', eliminarUsuario)
router.patch('/', patchUsuario)

module.exports = router