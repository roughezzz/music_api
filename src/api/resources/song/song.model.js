import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const userSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Songs must have title']
    },
    url: {
        type: String,
        required: [true, 'Songs must have URL']
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
});
userSchema.plugin(mongoosePaginate);

export default mongoose.model('Song', userSchema);