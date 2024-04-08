const {catchedAsync}= require("../utils")

module.exports={
    getModel: catchedAsync (require("./getModel")) ,
    getModelById: catchedAsync (require("./getModelById")) ,
    getModelByName: catchedAsync (require("./getModelByName")) ,
    getModelByTitle: catchedAsync (require("./getModelByTitle")) ,
    createModel: catchedAsync (require("./createModel")),
    deleteModel: catchedAsync (require("./deleteModel"))
};