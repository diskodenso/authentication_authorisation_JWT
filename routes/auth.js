// import express router
import { Router } from "express";
// import model
import User from "../models/User.js";
// we use bcrypt to hash passwort so import it
import bcrypt from "bcryptjs";
// import jwt
import jwt from "jsonwebtoken";
// import validation
import { registrationsValidation, loginValidation } from "../validation.js";

//--- REGISTRATION LOGIC ---//
Router.post("/register", async (req, res) => {
  const { error } = registrationsValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  // check if user exists already
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) {
    res.status(400).send("Sorry, this email is already in use!");
  }
  // if user passed both below, we want to hash the password
  //(1. all input is working and we do not get and error 2. we do not have a user with that email
  // salting the passwort means encrypting the password (best is 10rounds salt)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password);

  // create user in database if everything is fine
  // decunstruct name and email out of the body
  const { name, email } = req.body;
  // create new user with .create method and pass say which userdata should be save (password: hashed!!)
  const user = User.create({ name, email, password: hashedPassword });
  res.status(201).send("User successfully created");
});

//--- LOGIN LOGIC ---//
// check if there is an error
Router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  // check if user exists
  const userExists = await User.findOne({ email: req.body.email });
  if (!userExists) {
    res.status(401).send("User does not exists");
  }
  // check if password is correct (compare method bcrypt)
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        res.status(400).send("Password or Email wrong. Please try again!")
    }
    // if everything is fine create jwt token (use jwt.sign)
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.header('auth-token', token).send(token);
});
export default Router;