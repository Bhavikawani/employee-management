const Employee = require("../models/Employee.js");
const randomNumber = require("random-number");

module.exports.createEmployee = async (req, res) => {
  let response = { success: false, message: "", errMessage: "" };
  const { firstName, lastName, email, contact } = req.body;

  var options = {
    min: 10000,
    max: 99999,
    integer: true,
  };
  const validate = (url) => {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(url);
  };

  if (!firstName) {
    response.message = "Please enter first name of the employee";
    return res.send(response);
  } else if (!lastName) {
    response.message = "Please enter last name of the employee";
    return res.send(response);
  } else if (!validate(email)) {
    response.message = "Please enter valid email id of the employee";
    return res.send(response);
  } else if (contact.length !== 10) {
    response.message = "Please valid contact number of the employee";
    return res.send(response);
  }

  let employee = new Employee({
    firstName,
    lastName,
    email,
    contact,
    empId: randomNumber(options),
  });

  await employee
    .save()
    .then((result) => {
      if (result) {
        response.success = true;
        response.message = "Employee added successfully";
        return res.status(201).json(response);
      }
    })
    .catch((err) => {
      response.errMessage = err.message;
      response.message = "Failed to add employee. Please try again";
      res.status(400).json(response);
    });
};

module.exports.updateEmployee = async (req, res) => {
  const { empId } = req.params;
  let response = { success: false, message: "", errMessage: "" };
  const { firstName, lastName, email, contact } = req.body;

  const validate = (url) => {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(url);
  };

  if (!firstName) {
    response.message = "Please enter first name of the employee";
    return res.send(response);
  } else if (!lastName) {
    response.message = "Please enter last name of the employee";
    return res.send(response);
  } else if (!validate(email)) {
    response.message = "Please enter valid email id of the employee";
    return res.send(response);
  } else if (contact.length !== 10) {
    response.message = "Please valid contact number of the employee";
    return res.send(response);
  }

  const updatedEmployee = {
    firstName,
    lastName,
    email,
    contact,
    empId,
  };
  await Employee.findOneAndUpdate(
    { empId: empId },
    { $set: updatedEmployee },
    { new: true }
  )
    .then((result) => {
      if (result) {
        response.success = true;
        response.message = "Employee updated successfully";
        return res.status(201).json(response);
      }
    })
    .catch((err) => {
      response.errMessage = err.message;
      response.message = "Update failed. Please try again.";
      res.status(400).json(response);
    });
};

module.exports.deleteEmployee = async (req, res) => {
  const { empId } = req.params;
  let response = { success: false, message: "", errMessage: "" };
  await Employee.findOneAndDelete({ empId: empId })
    .then((result) => {
      if (result) {
        response.success = true;
        response.message = "Employee deleted successfully";
        res.status(200).json(response);
      } else {
        response.message = "Employee not found. Please try again";
        response.errMessage = err.message;
        res.status(400).json(response);
      }
    })
    .catch((err) => {
      response.message = "Failed to delete employee. Please try again";
      response.errMessage = err.message;
      res.status(400).json(response);
    });
};

module.exports.singleEmployee = async (req, res) => {
  let response = { success: false, data: {}, message: "", errMessage: "" };
  const { empId } = req.params;
  await Employee.findOne({ empId: empId })
    .then((result) => {
      if (result) {
        response.success = true;
        response.data = result;
        return res.status(200).json(response);
      } else {
        response.message = "Employee not found";
        response.errMessage = err.message;
        res.status(400).json(response);
      }
    })
    .catch((err) => {
      response.message = "Employee not found";
      response.errMessage = err.message;
      res.status(400).json(response);
    });
};

module.exports.getAllEmployee = async (req, res) => {
  let response = {
    success: false,
    data: {},
    message: "",
    errMessage: "",
  };

  await Employee.find({})
    .sort({ createdAt: -1 })
    .then((result) => {
      if (result) {
        response.success = true;
        response.data = result;
        return res.status(200).json(response);
      } else {
        response.success = true;
        response.message = "No result found";
        return res.status(400).json(response);
      }
    })
    .catch((err) => {
      response.message = "Unable to find employees. Please try again";
      response.errMessage = err.message;
      return res.status(400).json(response);
    });
};
