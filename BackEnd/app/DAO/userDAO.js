import mongoose from 'mongoose';
import * as _ from 'lodash';
import Promise from 'bluebird';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';

const userRole = {
    admin: 'admin',
    user: 'user'
};

const userRoles = [userRole.admin, userRole.user];

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    role: { type: String, enum: userRoles, default: userRole.admin, required: false },
    active: { type: Boolean, default: true, required: false },
    isAdmin: { type: Boolean, default: true, required: false }
}, {
    collection: 'user'
});


















