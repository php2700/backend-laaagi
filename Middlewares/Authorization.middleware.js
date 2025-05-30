const Authorization = (roles) => {
    console.log('33',)
    return (req, res, next) => {
        if (roles.includes(req.headers.role)) {
            next()
        } else {
            return res.status(401).send({
                msg: "Un-Authorized, You are not authorized to access this route.",
            });
        }
    }
}
export { Authorization }
// const Authorization = (allowedRoles = []) => {
//   return (req, res, next) => {
//     const userRole = req.headers["role"];

//     if (!userRole) {
//       return res.status(400).json({
//         msg: "Bad Request: Role header is missing.",
//       });
//     }

//     if (allowedRoles.includes(userRole)) {
//       next();
//     } else {
//       return res.status(403).json({
//         msg: "Forbidden: You are not authorized to access this route.",
//       });
//     }
//   };
// };

// export { Authorization };

