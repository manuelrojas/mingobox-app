import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    if (req.method === 'POST') {
            const { db } = await connectToDatabase();
            const _user = await db
                .collection("users")
                .insertOne(req.body);
        
        res.json(_user);
    } 

    if(req.method === 'PUT') {
        const { db } = await connectToDatabase();
        const _user = await db
            .collection("users")
            .updateOne({ _id: ObjectId(req.body.id) }, req.body.update, req.body.options);
    
        res.json(_user);
    }

    if(req.method === 'GET') {
        const { db } = await connectToDatabase();
        let value = req.query.sport;

        const startDate = new Date(req.query.date); 
        startDate.setSeconds(0);
        startDate.setHours(0);
        startDate.setMinutes(0);

        const dateMidnight = new Date(req.query.date); 
        dateMidnight.setHours(23);
        dateMidnight.setMinutes(59);
        dateMidnight.setSeconds(59);

        if (value === undefined || value === '') { // category  not specified by user
            value = /(.*?)/
        }

        const users = await db
            .collection("users")
            .find({
                    "sport": value,
                    "$expr": {
                      "$and": [
                        {
                          "$gte": [
                            { "$dateFromString": { "dateString": "$date"}},
                            startDate
                          ]
                        },
                        {
                          "$lte": [
                            { "$dateFromString": { "dateString": "$date"}},
                            dateMidnight
                          ]
                        }
                      ]
                    }
            })
            .sort({ actualDate: -1 })
            .toArray();

        res.json(users);

       
    }
  }