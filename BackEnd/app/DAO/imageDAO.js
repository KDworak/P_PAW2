import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import UserDAO from "./userDAO";
import mongoConverter from "../service/mongoConverter";
import Promise from "bluebird";
import applicationException from "../service/applicationException";

const imgSchema = new mongoose.Schema({

    id_user: { type: UserDAO.model.schema, ref: 'User' },
    title: { type: String , required: true},
    description: { type: String , required: true},
    filename: { type: String , required: true},
    image_data: { data: Buffer , contentType: String, required: true},
    size: { type: Number , required: true},
    is_public: { type: Boolean , default: false,required: true},
}, {
    collection: 'Image' // Change the collection name as needed
});

imgSchema.plugin(uniqueValidator);

const ImgModel = mongoose.model('Image', imgSchema);