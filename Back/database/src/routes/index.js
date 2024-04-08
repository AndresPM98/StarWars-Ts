const { Router } = require("express");
const controllers = require("../controllers")
const middleware = require("../middleware")

const router = Router();

router.get("/:model", middleware.validateModel, controllers.getModel)

router.get("/:model/:id", middleware.validateIdModel, controllers.getModelById)

router.post("/:model", middleware.validateModel, controllers.createModel)

router.delete("/:model/:id", middleware.validateIdModel, controllers.deleteModel)

router.get("/:model/search/:name", middleware.validateModel, controllers.getModelByName);

router.get("/:model/search_by/:title", middleware.validateModel, controllers.getModelByTitle);


module.exports = router;

