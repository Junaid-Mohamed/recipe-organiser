const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cusine: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: {
        type: [String],
        required: true
    },

})

recipeSchema.pre("save", function (next) {
    if (!this.name || !this.cusine || !this.ingredients.length || !this.instructions.length) {
        const error = new Error("All fields are required");
        return next(error);
    }
    next();
});


const Recipe = mongoose.model('recipe',recipeSchema);

module.exports = Recipe;