db.createUser(
  {
      user: "cityBikeMap2020",
      pwd: "usK_@hrB7MRZ3E",
      roles: [
          {
              role: "readWrite",
              db: "bikeStations"
          }
      ]
  }
);