const { uuid } = require("uuidv4");
const dataService = require("./dataService");

class TripsService {
  async getAllTrips(search) {
    let trips = await dataService.getTrips();
    if (!trips) {
      return [null, "No se encontraron viajes"];
    }
    if (search) {
      if (search.length > 0) {
        trips = trips.filter(trip => trip.agency === search || trip.origin_city === search || trip.destination_city === search || trip.price === search || trip.days === search);
      }
    }
    return [trips, null];
  }

  async createTrip(tripBody) {
    if (!tripBody.agency || !tripBody.origin_city || !tripBody.destination_city || !tripBody.days || !tripBody.price) {
      return [null, "Faltan atributos para crear el viaje."];
    }
    const newTrip = {
      id: uuid(),
      agency: tripBody.agency,
      origin_city: tripBody.origin_city,
      destination_city: tripBody.destination_city,
      days: tripBody.days,
      price: tripBody.price,
      picture: tripBody.picture ? tripBody.picture : null
    };

    const trips = await dataService.getTrips();
    if (!trips) {
      return [null, "No se encontraron viajes"];
    }

    const foundTrip = trips.find(trip => trip.agency === newTrip.agency && trip.origin_city === newTrip.origin_city && trip.destination_city === newTrip.destination_city && trip.days === newTrip.days);
    if (foundTrip) {
      return [null, "Ya existe un viaje con las mismas caracteristicas."];
    }

    trips.push(newTrip);
    await dataService.saveTrips(trips);
    return [newTrip, null];
  }

  async removeTrip(tripId) {
    const trips = await dataService.getTrips();
    if (!trips) {
      return [null, "No se encontraron viajes"];
    }
    const tripIndex = trips.findIndex(trip => trip.id === tripId);
    if (tripIndex === -1) {
      return [null, "No se encontro el viaje."];
    }
    trips.splice(tripIndex, 1);
    await dataService.saveTrips(trips);
    return [tripIndex, null];
  }

}

module.exports = new TripsService();