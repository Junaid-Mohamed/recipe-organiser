const express = require("express");
const cors = require("cors");
const initalizeDB = require("./db");

const port = process.env.PORT | 3000;
const app = express();
app.use(express.json());
app.use(cors());

initalizeDB();

const Recipe = require("./models/recipe.models")

app.get('/',(req,res)=>{
    res.send('Hi World');
})

//  CRUD operatoins.

//  get all recipes

app.get('/recipes', async (req,res)=>{
    try{
        const allRecipes = await Recipe.find();
        res.status(200).json(allRecipes);
    }catch(error){
        res.status(500).json(error);
    }
})

//  get recipe by id
app.get('/recipe/:id', async (req,res)=>{
    try{
        const recipe = await Recipe.findById(req.params.id);
        res.status(200).json(recipe);
    }catch(error){
        res.status(500).json(error);
    }
})

//  add a recipe

app.post('/recipe', async (req,res)=> {
    try{
        const newRecipe = new Recipe(req.body);
        await newRecipe.save();
        res.status(201).json({message:"Recipe saved successfully",newRecipe});
    }catch(error){
        if(error.name === "Error"){
            res.status(400).json({message: error.message})
        }else{
            res.status(500).json({message:"Internal server error"});
        }
    }
})

//  delete a recipe

app.delete('/recipe/:id',async(req,res)=> {
    const recipeId = req.params.id;
    try{
        const recipeToDelete = await Recipe.findByIdAndDelete(recipeId);
        if(!recipeToDelete){
            return res.status(404).json({message:"Recipe not found to delete"});
        }
        res.status(200).json({message:"recipe deleted successfully",recipeToDelete});
    }catch(error){
        res.status(500).json({message:"Internal server error"})
    }
})

app.listen(port,()=>console.log("Server started at port",port));