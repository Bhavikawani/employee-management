const employeeRouter = require("./employee");

const initRoutes = (app) => {
    app.use("/api/v1/employee", employeeRouter);
};

module.exports = initRoutes;
