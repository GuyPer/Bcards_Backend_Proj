const schemas = require("../schemas/usersSchema");
const User = require("../models/User");
const bcrypt = require('bcryptjs');

// get all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).select('-password').exec();
    // return all users
    return res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (err) {
    // return an error message
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  // get the id from url
  const { id } = req.params;

  try {
    // find the user that matches this id
    const found = await User.findById(id).select('-password').exec();
    // found
    if (found) {
      // return the user found
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    // not found
    return res.status(404).json({
      success: false,
      message: `user id '${id}' not found`,
    });
  } catch (err) {
    // return an error message
    return res.status(400).json({
      success: false,
      message: "Invalid format for user id",
    });
  }
};

const deleteUser = async (req, res) => {
  // get the id from url
  const { id } = req.params;
  // try to handle errors
  try {
    const deleted = await User.findByIdAndDelete(id).select('-password').exec();
    if (!deleted) throw new Error();
    // found & deleted
    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `user id ${id} not found` });
  }
};

const updateUser = async (req, res) => {
  // validate the request's body using joi
  const { error, value } = schemas.updateUser.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message);
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // get the id from url 
  const { id } = req.params;

  try {
    const updated = await User.findByIdAndUpdate(id, value, { new: true }).select('-password').exec();
    // not found- return a response and stop execution
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: `user id ${id} was not found.` });
    // found- return a response
    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `user id ${id} was not found.` });
  }
};

const businesUserUpdated = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; 
  try {
    if (id !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized action" });
    }

    const userToUpdate = await User.findById(id);
    if (!userToUpdate) {
      return res.status(404).json({ success: false, message: `User with id ${id} was not found.` });
    }
    userToUpdate.isBusiness = !userToUpdate.isBusiness;
    const updatedUser = await userToUpdate.save();

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    return res.status(400).json({ success: false, message: `Error updating business status: ${err.message}` });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  businesUserUpdated
};