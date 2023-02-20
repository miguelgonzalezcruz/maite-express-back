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
