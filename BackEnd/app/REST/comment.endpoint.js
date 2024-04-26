import businessContainer from "../business/business.container.js";
import multer from "multer";
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
const storageS = multer.memoryStorage();
const upload =  multer({ storage: storageS});
/*
const CommentEndpoint = (router) => {


} 
*/
export default CommentEndpoint;
