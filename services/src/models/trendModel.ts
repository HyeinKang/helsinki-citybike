import * as mongoose from 'mongoose';

import { Document, Schema } from 'mongoose'
import { getbikeTrendDB } from '../config'

export type StationCollection = {
  dateTime: string;
};

mongoose.connect(getbikeTrendDB(), { useNewUrlParser: true })
   .then(() =>  console.log('connection successful'))
   .catch((err) => console.error(err));

const TrendModel = mongoose.model<StationCollection & Document>('Trend', new Schema({
  stationId: String,
  bikesAvailable: Number,
  dateTime: Date
}));

export { TrendModel };