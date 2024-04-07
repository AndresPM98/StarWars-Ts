const {catchedAsync}= require("../utils")

module.exports={
    getModel: catchedAsync (require("./getModel")) ,
    getModelById: catchedAsync (require("./getModelById")) ,
    createModel: catchedAsync (require("./createModel")),
    deleteModel: catchedAsync (require("./deleteModel"))
};