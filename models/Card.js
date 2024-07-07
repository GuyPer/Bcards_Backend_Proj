const mongoose = require("mongoose");
const { addressSchema, imageSchema } = require("./common");
const { ref } = require("joi");
const chalk = require("chalk");

// define a mongoose schema:
// this describes the shape of one 'card' in our cards collection.
const cardSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    description: String,
    phone: String,
    email: String,
    web: String,
    image: imageSchema,
    address: addressSchema,
    bizNumber: Number,
    user_id: { type:mongoose.SchemaTypes.ObjectId, ref:'User' },
    likes: [mongoose.SchemaTypes.ObjectId],
  },
  {
    timestamps: true,
  }
);

  cardSchema.statics.getNextBizNumber = async function () {
    try {
      // find the highest current biznumber in our cards collection
      const found = await Card.find({}).sort([["bizNumber",-1]]).limit(1).exec();
      // not found (empty collection), so return 1 as next bizNumber
      if (found.length===0) return 1
      // found
      const nextBizNumber = found[0].bizNumber + 1;
      return nextBizNumber;
    } catch(err) {
      throw err
    }
  }

// compile the schema into a model.
// we will use this model to access our cards collection.
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;