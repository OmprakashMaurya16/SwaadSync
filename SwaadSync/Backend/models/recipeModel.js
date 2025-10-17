const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    ingredients: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        unit: {
          type: String,
          required: true,
        },
      },
    ],

    instructions: {
      type: String,
      required: true,
    },

    images: {
      type: [{ url: String, filename: String }],
      default: [],
    },

    videoUrl: {
      type: String,
      default: "",
    },

    filters: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },

    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

recipeSchema.pre("findOneAndDelete", async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) await mongoose.model("Review").deleteMany({ recipe: doc._id });
  next();
});

const recipeModel = mongoose.model("Recipe", recipeSchema);
module.exports = { recipeModel };
