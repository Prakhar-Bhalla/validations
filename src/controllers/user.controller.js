const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const { body, validationResult } = require('express-validator');

router.post("/", body("first_name").notEmpty().withMessage("First name can't be empty"), body("last_name").notEmpty().withMessage("Last name can't be empty"), body("email").notEmpty().withMessage("email can't be empty").isEmail().withMessage("Invalid Email"), body("pincode").notEmpty().withMessage("Pincode can't be empty").custom((value) => {
    if(value == undefined)
    return;
    const pin = value.toString();
    if(pin.length != 6) 
    {
        throw new Error("Pincode can only contain 6 numerical digits");
    }
    return true;
}), body("age").notEmpty().withMessage("Age can't be empty").custom((value) => {
    if(value == undefined)
    return;
    if(value < 1 || value > 100)
    {
        throw new Error("Members between age 1 to 100 only allowed to register");
    }
    return true;
}), body("gender").notEmpty().withMessage("Gender can't be empty").custom((value) => {
    if(value == undefined)
    return;
    let genderOpt = ["Male", "Female", "Others"];
    if(!genderOpt.includes(value))
    {
        throw new Error("Enter proper gender");
    }
    return true;
}), async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const Errors = errors.array().map((err) => {
          return (`{${err.param} : ${err.msg}}`);
      })
      return res.status(400).send(Errors);
    }
    try {
        const user = await User.create(req.body);
        res.send({user});
    } catch(e) {
        res.json({message: e.message});
    }
});

router.get("/", async(req, res) => {
    try {
        const users = await User.find().lean().exec();
        res.send({users});
    } catch(e) {
        res.json({message: e.message});
    }
})

module.exports = router;
