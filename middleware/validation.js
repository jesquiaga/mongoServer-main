const {Persona} = require("../models/model")

const validarId = async (req, res, next) => {
    const id = await Persona.findById(req.params.id)
        if (id !== null) {
            next();
        } else {
            res.status(501).json({msg: "Error al ingresar el ID o ID inexistente"})
        }
}

module.exports = {validarId}