import { Router, Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import moment from 'moment-timezone';
import { TrendModel } from '../models/trendsModel';

const trendsRouter = Router();
const today = moment().tz("Europe/Helsinki").day();

type AverageBikes = {
  averageBikesAvailable: number;
  time: string;
}

trendsRouter.get('/:id/:dayNumber', (req:Request, res:Response, next: NextFunction) => {
  TrendModel
    .find({ "stationId": req.params.id })
    .maxTimeMS(10000)
    .exec((err, availableBikesByStation) => {
      if (err) return next(err);

      const selectedDayNumber = req.params.dayNumber
      const availableBikesByDay = _.groupBy(availableBikesByStation, (stationCollection) => moment(stationCollection.dateTime).tz("Europe/Helsinki").day())
      const availableBikesByHour = _.groupBy(availableBikesByDay[selectedDayNumber||today], (stationCollection) => moment(stationCollection.dateTime).tz("Europe/Helsinki").hour())
      let averageBikesByHour:AverageBikes[] = []

      _.forEach(availableBikesByHour, (bikes, hour) => {
        const allBikesAmount = _.reduce(_.map(bikes, 'bikesAvailable'), (sum, n) => {
          return sum + n
        }, 0)
        const averageBikesAvailable = Math.round(allBikesAmount/bikes.length)
        const formattedHour = moment(hour,'HH').format('ha') // 21:00
        const averageBikes = {
          'time': formattedHour,
          'averageBikesAvailable': averageBikesAvailable
        }
        averageBikesByHour = [...averageBikesByHour, averageBikes]
      })
      res.json(averageBikesByHour);
    });
});

export { trendsRouter };
