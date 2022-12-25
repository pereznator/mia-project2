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

    async reserveTrip(userId, tripId) {
        const userTrips = await dataService.getUserTrips();
        if (!userTrips) {
            return [null, "No se encontraron solicitudes de viajes"];
        }
        const foundRequest = userTrips.find(trip => trip.trip_id === tripId && trip.user_id);
        if (foundRequest) {
            return [null, "Ya has reservado el viaje seleccionado."];
        }
        const newRequest = {
            id: uuid(),
            user_id: userId,
            trip_id: tripId,
            approved: false
        };

        userTrips.push(newRequest);
        await dataService.saveUserTrips(userTrips);
        return [newRequest, null];
    }

    async getUserTrips(userId) {
        const allUserTrips = await dataService.getUserTrips();
        if (!allUserTrips) {
            return [null, "No se encontraron solicitudes de viajes."];
        }
        const userReserves = allUserTrips.filter(userTrip => userTrip.user_id === userId);
        if (!userReserves) {
            return [null, "Error al buscar tus solicitudes."];
        }
        if (userReserves.length === 0) {
            return [
                [], null
            ];
        }
        const allTrips = await dataService.getTrips();
        if (!allTrips) {
            return [null, "No se pudieron encontrar viajes"];
        }
        let userTrips = allTrips.filter(trip => userReserves.map(userTrip => userTrip.trip_id).includes(trip.id));
        userTrips = userTrips.map(userTrip => {
            const userRequest = userReserves.find(reserve => reserve.trip_id === userTrip.id);
            return {
                ...userTrip,
                approved: userRequest.approved,
                id: userRequest.id
            }
        });

        if (!userTrips) {
            return [null, "Error al buscar tus solicitudes."];
        }
        return [userTrips, null];
    }

    async getAllUserTrips() {

    }

}

module.exports = new TripsService();