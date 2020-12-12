import { connectToDatabase } from "../../util/mongodb";
export default async (req, res) => {
    if (req.method === 'POST') {
        console.log(req.body)
            const { db } = await connectToDatabase();
            const _user = await db
                .collection("users")
                .insertOne(req.body);
        
        res.json(_user);
    } 
  }