import { Schema, model } from 'mongoose';

const youtubeSchema = new Schema(
	{
		timestamp: { type: Number, required: true },
		content: { type: String, required: true },
		predict: { type: String, required: true },
	},
	{ collection: 'Youtube' }
);

const Youtube = model('Youtube', youtubeSchema);

export default Youtube;
