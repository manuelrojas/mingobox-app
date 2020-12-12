import React from 'react';
import QRCode from "react-qr-code";
import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from 'mongodb';
import { useRouter } from 'next/router';

export default function Complete({ newUser }) {
    const user = JSON.parse(newUser);
    return (
        <div class="m-10  w-auto mx-auto max-w-3xl w-min flex flex-col  content-center bg-white shadow p-8 text-gray-700 rounded-lg">
            <QRCode value={`/reservation/${user._id}`} />
            <p>Reservación</p> 
            <p>{user.name}</p>
            <p>{user.id}</p>
            <p>{user.phone}</p>
            <p>{user.mail}</p>
            <p>{user.role}</p>
            <p>{user.org}</p>
            <p>{user.data}</p>
            <p>{user.hour}</p>
        </div>
    );  
}

export async function getServerSideProps(context) {
    const { db } = await connectToDatabase();
 
    const _user = await db
        .collection("users")
        .findOne({ _id: ObjectId(context.query.pid) });

    return {
      props: { newUser: JSON.stringify(_user) },
    }
}