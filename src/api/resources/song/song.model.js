import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const { Schema } = mongoose;
const songSchema = new Schema({
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
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
songSchema.plugin(mongoosePaginate);

export default mongoose.model('Song', songSchema);