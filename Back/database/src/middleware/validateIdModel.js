const { ClientError } = require("../utils/errors");
const store = require("../database");

module.exports = async (req, res, next) => {
  const { model, id } = req.params;

  if (["Character", "Film", "Planet"].includes(model)) {
    if (!Number.isInteger(parseInt(id))) {
      return next(new ClientError("Invalid ID", 404));
    }

    const document = await store[model].findById(id);
    if (!document) {
      return next(new ClientError("ID not found", 404));
    }

    return next();
  } else {
    return next(new ClientError("Invalid Model", 401));
  }
};
