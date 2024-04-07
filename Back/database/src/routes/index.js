const { Router } = require("express");
const controllers = require("../controllers")
const middleware = require("../middleware")

const router = Router();

router.get("/:model", middleware.validateModel, controllers.getModel)

router.get("/:model/:id", middleware.validateIdModel, controllers.getModelById)

router.post("/:model", middleware.validateModel, controllers.createModel)

router.delete("/:model/:id", middleware.validateIdModel, controllers.deleteModel)

module.exports = router;

