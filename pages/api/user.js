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
        let value = req.query[0];

        if (value === undefined) { // category  not specified by user
            value = /(.*?)/
         }

        const users = await db
            .collection("users")
            .find({ "sport": value })
            .sort({ actualDate: -1 })
            .toArray();

        res.json(users);

       
    }
  }