export type SelectedStation = {
  stationId: number;
  name: string;
  stationName: string;
  stationCapability: number;
  bikeAvailability: number;
  updateSelectedStation: (selectedStation:any)=>{};
}

export type BikeTrend = {
  averageBikesAvailable: number;
  time: string;
}

export type BikeRentalStationDetail = {
  stationId: number;
  name: string;
  stationName: string;
  bikesAvailable: number;
  bikeAvailability: number;
  stationCapability: number;
  dateTime: number;
  spacesAvailable: number;
  lat: number;
  lon: number;
} | null;