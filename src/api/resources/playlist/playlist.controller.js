import playlistService from "./playlist.service";
import playlistModel from "./playlist.model";

export default {
    async create(req, res){
        try{
            const {value, error} = await playlistService.validateBody(req.body);
            if(error && error.details){
                return res.json(error);
            }
            const playlist = await playlistModel.create(Object.assign({}, value, {user: req.user._id}));
            return res.json(playlist);
        } catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    },

    async findAll(req, res){
        try{
            const playlist = await playlistModel.find().populate('songs').populate('user','firstName lastName');
            return res.json(playlist);
        }catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    }
}