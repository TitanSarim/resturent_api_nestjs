/* eslint-disable prettier/prettier */
import * as NodeGeocoder from 'node-geocoder';
import {Location} from '../resturants/schemas/resturants.scheema'
import { resolve } from 'path/posix';
import { S3 } from 'aws-sdk';

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


  // upload images
  static async upload(files){
    return new Promise((resolve, reject) => {

      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SCRET_KEY
      })

      const images = []

      files.forEach(async(file)=>{
        const splitFile = file.originalname.split('.')
        const random = Date.now()

        const fileName = `${splitFile[0]}_${random}.${splitFile[1]}`

        const params = {
          Bucket: `${process.env.AWS_S3_BUCKET_NAME}/resturants`,
          Key: fileName,
          Body: file.buffer
        }

        const uploadResponse = await s3.upload(params).promise();

        images.push(uploadResponse);

        if(images.length === files.length){
          resolve(images)
        }

      })

    })
  }

  // delete images
  static async deleteImages(images){

      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SCRET_KEY
      })


      const imagesKey = images.map((image)=>{
        return{
          Key: image.Key
        }
      })

      const params = {
        Bucket: `${process.env.AWS_S3_BUCKET_NAME}`,
        Delete: {
          Objects: imagesKey,
          Quiet: false
        }
      }

      return new Promise((resolve, reject)=> {
        s3.deleteObjects(params, function(err, data){
          if(err){
            console.log(err);
            reject(false)
          }else{
            resolve(true)
          }
        })
      })
  }



}