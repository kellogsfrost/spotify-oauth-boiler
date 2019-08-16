// Don't forget to use the ES6 import syntax
import mongoose from 'mongoose';
import {Schema} from 'mongoose';

const userSchema = new Schema({
    spotifyId: {
        type: Number || String,
        required: [true, 'You need to have a spotify id']
    }
})

userSchema.set('toObject', {
    transform: function(doc, ret, options) {
        let returnJson = {
            _id: ret._id,
            spotifyId: ret.spotifyId
        }
        return returnJson;
    }
})

export default mongoose.model('User', userSchema);