export type SelectedStation = {
  stationId: number;
  stationName: string;
  stationCapability: number;
  bikeAvailability: number;
}

export type BikeTrend = {
  averageBikesAvailable: number;
  time: string;
}