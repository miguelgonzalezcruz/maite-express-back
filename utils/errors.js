const orFailError = () => {
  const error = new Error("No item found");
  error.statusCode = 404;
  throw error;
};

const badRequestError = (err, res) => {
  res.status(400).send({ message: "Ouch! Invalid Input" });
};

const notFoundError = (err, res) => {
  res
    .status(404)
    .send({ message: "Sorry, this is embarrasing. No item found" });
};

const defaultError = (err, res) => {
  res.status(500).send({ message: "Ouch! something went wrong" });
};

const errorHandling = (err, res) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    const badRequest = 400;
    res.status(badRequest).send({ message: "Ouch! Invalid Input" });

    return;
  }
  if (err.statusCode === 404) {
    const notFound = 404;
    res
      .status(notFound)
      .send({ message: "Sorry, this is embarrasing. No item found" });

    return;
  }
  if (err.statusCode === 409) {
    const conflict = 409;
    res.status(conflict).send({ message: "Email already exists" });

    return;
  }
  if (err.statusCode === 401) {
    const unauthorized = 401;
    res.status(unauthorized).send({ message: "Unauthorized" });

    return;
  }
  if (err.statusCode === 403) {
    const forbidden = 403;
    res.status(forbidden).send({ message: "Forbidden" });

    return;
  }
  const serverError = 500;
  res.status(serverError).send({ message: "Ouch! something went wrong" });
};

module.exports = {
  errorHandling,
  orFailError,
  badRequestError,
  notFoundError,
  defaultError,
};
