/* eslint-disable prettier/prettier */
import * as NodeGeocoder from 'node-geocoder';
import {Location} from '../resturants/schemas/resturants.scheema'

export default class APIFeatures {
  static async getResturantLocation(address: string) {
    try {

        const options: NodeGeocoder.Options = {
          provider: 'mapquest',
          apiKey: 'xwNpO7LijqUhN7ujjULiXWSr2rH8jEIt',
          formatter: null,
        };
  
        const geoCoder = NodeGeocoder(options);
  
        const loc = await geoCoder.geocode(address); // Changed method name to 'geocode'
  
        const location: Location = {
          type: 'Point',
          coordinates: [loc[0].longitude, loc[0].latitude],
          formattedAddress: loc[0].formattedAddress,
          city: loc[0].city,
          state: loc[0].stateCode,
          zipcode: loc[0].zipcode,
          country: loc[0].countryCode,
        }
  
        console.log('location', location);
  
        return location;
      } catch (error) {
        console.log(error.message);
      }
  }
}
