import { TrendModel } from '../models/trendModel'

type Station = {
  stationId: string;
  bikesAvailable: number;
};

export const saveToDB = (station:Station) => {
  const newTimeline = new TrendModel({
    bikesAvailable: station.bikesAvailable,
    dateTime: Date.now(),
    stationId: station.stationId
  });
  newTimeline.save((err) => {
    if (err) throw err;
  });
}