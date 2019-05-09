import Joi from 'joi';
import Song from './song.model';

export default {
    async create(req, res){
        try{
            const schema = Joi.object().keys({
                title: Joi.string().required(),
                url: Joi.string().required(),
                rating: Joi.number().integer().min(0).max(5).optional()
            });
            
            const {value, error} = Joi.validate(req.body, schema);
            
            if(error && error.details){
                return res.status(400).json(error);
            }
            const song = await Song.create(value);
            return res.json(song);
        } catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    },

    async findAll(req, res){
        try{
            const {page, perPage} = req.query;
            const options = {
                page: parseInt(page,10) || 1,
                limit: parseInt(perPage, 10) || 10
            }
            const songs = await Song.paginate({}, options);
            return res.json(songs);
        } catch(err){
            console.error(err);
            return res.status(500).send(err);
        }
    }
}