const getbikeTrendDB = () => {
  const bikeTrendDB = `mongodb://${process.env.BIKE_TREND_USER}:${process.env.BIKE_TREND_PASSWORD}@${process.env.MONGO_DB_HOST}:27017/${process.env.BIKE_TREND_DB}`;
  return bikeTrendDB;
}

export { getbikeTrendDB }