import { fetchBikes } from '../../services/src/controllers/trendsController';

describe("Test if service imports bikes correctly", () => {
  test("Should return the list of bike stations", async () => {
      const bikeRentalStations = await fetchBikes();

      expect(bikeRentalStations[0]).toHaveProperty('stationId') 
      expect(bikeRentalStations[0]).toHaveProperty('bikesAvailable') 

  });
});
