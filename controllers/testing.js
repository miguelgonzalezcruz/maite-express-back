// const createUser = async (req, res) => {
//   const { name, surname, email, phone, typeofuser, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       throw new Error('User already exists');
//     }

//     const hash = await bcrypt.hash(password, 10);

//     const newUser = await User.create({ name, surname, email, phone, typeofuser, password: hash });

//     await hubspotClient.crm.contacts.basicApi.create({
//       properties: {
//         email: email,
//         firstname: name,
//         lastname: surname,
//         phone: phone,
//       },
//     });

//     res.status(201).send(newUser);
//   } catch (error) {
//     errorHandling(error, res);
//   }
// };

// const createUser = (req, res) => {
//   const { name, surname, email, phone, typeofuser } = req.body;
//   User.findOne({ email }).then((user, err) => {
//     if (user) {
//       errorHandling(err, res);
//     }
//     return bcrypt.hash(req.body.password, 10).then((hash) => {
//       User.create({ name, surname, email, phone, typeofuser, password: hash })
//         .then((data) => {
//           hubspotClient.crm.contacts.basicApi
//             .create({
//               properties: {
//                 email: email,
//                 firstname: name,
//                 lastname: surname,
//                 phone: phone,
//               },
//             })
//             .then(() => {
//               res.status(201).send(data);
//             })
//             .catch((hubspotError) => {
//               console.error(hubspotError);
//             });
//         })
//         .catch(() => {
//           errorHandling(err, res);
//         });
//     });
//   });
// };

// const createUser = (req, res) => {
//   const { name, surname, email, phone, typeofuser } = req.body;
//   User.findOne({ email }).then((user, err) => {
//     if (user) {
//       errorHandling(err, res);
//     }
//     return bcrypt.hash(req.body.password, 10).then((hash) => {
//       User.create({ name, surname, email, phone, typeofuser, password: hash })
//         .then((data) => {
//           hubspotClient.crm.contacts.basicApi
//             .create({
//               properties: {
//                 email: email,
//                 firstname: name,
//                 lastname: surname,
//                 phone: phone,
//               },
//             })
//             .then(() => {
//               res.status(201).send(data);
//             })
//             .catch((hubspotError) => {
//               console.error(hubspotError);
//             });
//         })
//         .catch(() => {
//           errorHandling(err, res);
//         });
//     });
//   });
// };

// const createUser = (req, res) => {
//   const { name, surname, email, phone, typeofuser } = req.body;
//   User.findOne({ email }).then((user, err) => {
//     if (user) {
//       errorHandling(err, res);
//     }
//     return bcrypt.hash(req.body.password, 10).then((hash) => {
//       User.create({ name, surname, email, phone, typeofuser, password: hash })
//         .then((data) => {
//               res.status(201).send(data);
//             })
//         .catch(() => {
//           errorHandling(err, res);
//         });
//     });
//   });
// };

// const createUser = async (req, res, next) => {
//   const { name, surname, email, phone, typeofuser } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       const error = new Error("User already exists");
//       error.status = 409; // set status code to 409 Conflict
//       throw error; // throw the error to be handled by the error middleware
//     }
//     const hash = await bcrypt.hash(req.body.password, 10);
//     const createdUser = await User.create({
//       name,
//       surname,
//       email,
//       phone,
//       typeofuser,
//       password: hash,
//     });
//     const hubspotPromise = hubspotClient.crm.contacts.basicApi.create({
//       properties: {
//         email: email,
//         firstname: name,
//         lastname: surname,
//         phone: phone,
//       },
//     });
//     await Promise.all([hubspotPromise]);
//     res.status(201).send(createdUser);
//   } catch (err) {
//     next(err);
//   }
// };
