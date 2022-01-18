import { atlasDAO } from "../app.js";

export const signUp = (req,res) => {
    try {
        atlasDAO.signUp(req)
        res.status(200).json({message:"ok"});
    } catch (error) {
        console.log(error)
    }
}