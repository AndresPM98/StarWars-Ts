// Los utils son funciones especificas que no necesariamente tienen relacion estricta con el codigo, 
// podrían ser utilizadas en otros codigos sin problema.

module.exports=(res, statusCode, data)=>{
    res.status(statusCode).json({
        error:false,
        data,
    })
}

