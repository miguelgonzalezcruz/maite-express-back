require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
const UnauthorizedError = require("../errors/unauthorized-error");

module.exports = (req, res, next) => {
  console.log(`JWT_SECRET value: ${JWT_SECRET}`);
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new UnauthorizedError("Authorization required");
    return next(error);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const error = new UnauthorizedError("Authorization required");
    return next(error);
  }
  console.log("Payload: ", payload);

  req.user = payload;
  return next();
};
