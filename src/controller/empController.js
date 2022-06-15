const empModel = require("../model/empModel");
var jwt = require("jsonwebtoken");

module.exports = {
  createEmployee: async (req, res) => {
    try {
      let newEmp = new empModel(req.body);
      let createEmp = await newEmp.save();

      console.log(" createEmployee Successfully", createEmp);

      return res.send({
        message: " createEmployee Successfully",
        status: 1,
        data: createEmp,
      });
    } catch (error) {
      return res.send({
        message: "Please Enter All  Employee Details ",
        status: 0,
      });
    }
  },
  employeeLogin: async (req, res) => {
    try {
      let empLogined = await empModel.findOne({ empId: req.body.empId });
      if (!empLogined) {
        return res.send({
          message: "please enter the valid empName",
        });
      }
      const isMatch = await empLogined.isValidPassword(req.body.password);

      if (!isMatch) {
        return res.send({
          message: "invalid Password",
        });
      }
      const token = jwt.sign(
        {
          empName: req.body.empName,
        },
        "verysecretvalue",
        {
          expiresIn: "1h",
        }
      );
      return res.send({
        message: "Login Successfully",
        status: 1,
        token: token,
        data: empLogined,
      });
    } catch (error) {
      return res.send({
        message: "Please Enter All  Employee Details ",
        status: 0,
      });
    }
  },
  updateEmp: async (req, res) => {
    try {
      let updateemp = await empModel.findOne({ _id: req.body._id });
      if (!updateemp) {
        return res.send({
          message: "please enter vaild empdetails",
        });
      }
      let updatedEmp = await empModel.findOneAndUpdate(
        { _id: req.body._id },
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      if (!updatedEmp) {
        return res.send({
          message: "No empdetails found",
        });
      }
      return res.send({
        message: "emp details update Successfully",
        status: 1,
        data: updatedEmp,
      });
    } catch (error) {
      return res.send({
        message: "Please Enter All  Employee Details ",
        status: 0,
      });
    }
  },
  deleteEmp: async (req, res) => {
    try {
      let deleteEmp = await empModel.findOne({ _id: req.body._id });
      if (!deleteEmp) {
        return res.send({
          message: "please enter the empId",
        });
      }
      let deletedEmp = await empModel.remove({
        _id: req.body._id,
      });
      if (!deletedEmp) {
        return res.send({
          message: "No empdetails found",
        });
      }
      return res.send({
        message: "emp details delete Successfully",
        status: 1,
        data: deletedEmp,
      });
    } catch (error) {
      return res.send({
        message: "Please Enter All  Employee Details ",
        status: 0,
      });
    }
  },
  getOneEmp: async (req, res) => {
    try {
      let getemp = await empModel.findOne({ empId: req.body.empId });
      if (!getemp) {
        return res.send({
          message: "please enter the getEmpId",
        });
      }
      return res.send({
        message: "emp details getOneemp Successfully",
        status: 1,
        data: getemp,
      });
    } catch (error) {
      return res.send({
        message: "Please Enter All  Employee Details ",
        status: 0,
      });
    }
  },
  getAllEmp: async (req, res) => {
    try {
      let getAllemp = await empModel.find({ });
      console.log("getOneAllEmp",getAllemp)
      if (!getAllemp) {
        return res.send({
          message: "please enter the getAllemp",
        });
      }
      return res.send({
        message: "emp details getAllEmp Successfully",
        status: 1,
        data: getAllemp,
      });
    } catch (error) {
      return res.send({
        message: "getAllEmp Please Enter All  Employee Details ",
        status: 0,
      });
    }
  },
};