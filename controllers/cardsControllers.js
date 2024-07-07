const schemas = require("../schemas/cardsSchema");
const Card = require("../models/Card");

// get all cards
const getAllCards = async (req, res) => {
  try {
    const allCards = await Card.find({});
    // return all cards
    return res.status(200).json({
      success: true,
      data: allCards,
    });
    // return an error message
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

const getCardById = async (req, res) => {
  const { id } = req.params;
  try {
    // find the card that matches this id
    const found = await Card.findById(id).populate('user_id').exec();
    if (found) {
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
    // not found
    return res.status(404).json({
      success: false,
      message: `card id '${id}' not found`,
    });
    // return an error message
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid format for card id",
    });
  }
};

const getUserCards = async (req,res) =>{
const { id } = req.user;
try{
const found = await Card.find({user_id:id}).exec();
    if (found) {
      return res.status(200).json({
        success: true,
        data: found,
      });
    }
        // not found
    return res.status(404).json({
      success: false,
      message: `card id '${id}' not found`,
    });
}
catch (err) {
    // return an error message
    return res.status(400).json({
      success: false,
      message: "Invalid",
    });
  }
};

const createNewCard = async (req, res) => {

  // validate the request's body using joi
  const { error, value } = schemas.createNewCard.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // create a new Card instance 
  const newCard = new Card(value);
  // assign the userId that created the new card
  const userId= req.user.id;
  newCard.user_id = userId
  // generate & assign the nextBizNumber to the new card
  newCard.bizNumber = await Card.getNextBizNumber();
  // save the card to database
  try {
    const saved = await newCard.save();
    // success ! return a response
    return res.status(201).json({
      success: true,
      created: saved,
    });
  } catch (err) {
    // error
    return res
      .status(500)
      .json({ success: false, message: `error saving the card` });
  }
};

const deleteCard = async (req, res) => {

  // get the id from url 
  const { id } = req.params;
  // try to handle errors
  try {
    const deleted = await Card.findByIdAndDelete(id);
    if (!deleted) throw new Error();
    // found & deleted
    return res.status(200).json({ success: true, deleted: deleted });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `card id ${id} not found` });
  }
};

const updateCard = async (req, res) => {
  // validate the request's body using joi
  const { error, value } = schemas.updateCard.validate(req.body);
  // check if there are joi validation errors
  if (error) {
    const errorsArray = error.details.map((err) => err.message); // creates an array of error-message strings
    return res.status(400).json({ success: false, message: errorsArray });
  }
  // get the id from url
  const { id } = req.params;

  let updated;

  try {
    updated = await Card.findByIdAndUpdate(id, value, { new: true });
    // not found- return a response and stop execution
    if (!updated)
      return res
        .status(404)
        .json({ success: false, message: `card id ${id} was not found.` });
    // found- return a response
    return res.status(200).json({
      success: true,
      updated: updated,
    });
  } catch (err) {
    return res
      .status(404)
      .json({ success: false, message: `card id ${id} was not found.` });
  }
};

const likedCardUpdated = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; 

  try {
    const cardToUpdate = await Card.findById(id);
    if (!cardToUpdate) {
      return res.status(404).json({ success: false, message: `Card with id ${id} was not found.` });
    }
    const likes = cardToUpdate.likes;

    // Check if the user ID exists in the likes array
    if (likes.includes(userId)) {
    // If the user ID exists, remove it from the array
      cardToUpdate.likes = likes.filter(item => item.toString() !== userId);
    } else {
    // If the user ID does not exist, add it to the array
      cardToUpdate.likes.push(userId);
    }

    // Save the updated card
    const updatedCard = await cardToUpdate.save();
    return res.status(200).json({ success: true, data: updatedCard });
  } catch (err) {
    return res.status(500).json({ success: false, message: `Error updating card likes: ${err.message}` });
  }
};

module.exports = {
  getAllCards,
  getCardById,
  getUserCards,
  createNewCard,
  deleteCard,
  updateCard,
  likedCardUpdated
};