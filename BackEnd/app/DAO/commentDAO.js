/*
id_IMG
id_User
text
date




*/
import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";
import mongoConverter from "../service/mongoConverter.js";
import * as buffer from "buffer";
const imgSchema= new mongoose.Schema({
    id_IMG: { type: String, ref: 'Image', required: true },
    id_User: { type: String, ref: 'User', required: true },
    text: { type: String , required: true},
    date: { type: String , required: true},

}, {
    collection: 'Comment' // Change the collection name as needed
});

imgSchema.plugin(uniqueValidator);

const CommentModel = mongoose.model('CommentM', commentSchema);
async function query() {
    return await CommentModel.find({is_public: true});
    /*console.log(result);
        if (result) {
            return mongoConverter(result);
        }*/

}

async function get(id) {
    try {
        return CommentModel.find({_id: id});
    }catch (error) {
        throw new Error('Error fetching schedule by id');
    }
}

function createNewOrUpdate(comment) {
    return Promise.resolve().then(() => {
        if (!comment.id) {
            return new  CommentModel(comment).save().then(result => {
                if (result) {
                    return mongoConverter(result);
                }
            });
        } else {
            return CommentModel.findByIdAndUpdate(comment.id, _.omit(comment, 'id'), { new: true });
        }
    }).catch(error => {
        if ('ValidationError' === error.name) {
            error = error.errors[Object.keys(error.errors)[0]];
            throw applicationException.new(applicationException.BAD_REQUEST, error.message);
        }
        throw error;
    });
}

async function remove(id) {
    return CommentModel.deleteOne({_id: id});
}
export default {
    query: query,
    get: get,
    createNewOrUpdate: createNewOrUpdate,
    remove:remove,
    model: CommentModel
};