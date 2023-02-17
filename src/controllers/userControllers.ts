import { RequestHandler } from "express";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import common from "../utils/common";
import { appConstants } from "../constants/appConstants";

const { User } = require("../models/userSchema");

const addUser: RequestHandler = async (req, res) => {
  try {
    const data = req.body;
    const { name, email, password, contact } = data;
    if (!name || !email || !password) {
      return common.Response(
        res,
        StatusCodes.BAD_REQUEST,
        ReasonPhrases.BAD_REQUEST,
        appConstants.RESPONSE_REQUIRED_FIELD_ERROR_MSG,
        null
      );
    }
    var userExist = await User.findAll({
      where: { email: email },
    });
    if (userExist.length == 0) {
      var userExist = await User.findAll({
        where: { contact: contact },
      });
    }
    if (userExist.length != 0) {
      return common.Response(
        res,
        StatusCodes.FORBIDDEN,
        ReasonPhrases.FORBIDDEN,
        appConstants.USER_ALREADY_EXISTS,
        null
      );
    }
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
      contact: contact,
    });
    return common.Response(
      res,
      StatusCodes.CREATED,
      ReasonPhrases.CREATED,
      appConstants.RESPONSE_USER_SUCCESS_MSG,
      newUser
    );
  } catch (err) {
    console.log(err);
    return common.Response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      appConstants.RESPONSE_SERVER_ERROR_MSG,
      null
    );
  }
};

const getUserByID: RequestHandler = async (req, res) => {
  try {
    const userID = req.query.userID;
    const user = await User.findAll({
      where: { id: userID },
    });
    if (user.length == 0) {
      return common.Response(
        res,
        StatusCodes.NOT_FOUND,
        ReasonPhrases.NOT_FOUND,
        appConstants.RESPONSE_USER_ERROR_MSG,
        null
      );
    }
    return common.Response(
      res,
      StatusCodes.OK,
      ReasonPhrases.OK,
      appConstants.DATA_FETCHED,
      user
    );
  } catch (err) {
    console.log(err);
    return common.Response(
      res,
      StatusCodes.INTERNAL_SERVER_ERROR,
      ReasonPhrases.INTERNAL_SERVER_ERROR,
      appConstants.RESPONSE_SERVER_ERROR_MSG,
      null
    );
  }
};

module.exports = { addUser, getUserByID };
