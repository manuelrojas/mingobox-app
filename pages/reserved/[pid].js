import React, { useState } from 'react';
import QRCode from "react-qr-code";
import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from 'mongodb';
import axios from 'axios';
import Router from 'next/router';

const LabelCompo = ({ label, value }) => {
    return (
            <div className="font-large flex mb-1 mt-1">
                <span className="text-gray-600 text-md">{label}: </span> 
                <span className="ml-2"> {value} </span>
            </div>
    );
};

export default function Complete({ newUser }) {
    const user = JSON.parse(newUser);
    const [value, setValue] = useState(user.temp);
    return (
        <div className="m-10  w-auto mx-auto max-w-3xl w-min flex flex-col  content-center bg-white shadow p-8 text-gray-700 rounded-lg">
            <QRCode value={`https://mingobox-app.vercel.app/reservation/${user._id}`} />
            <h1 className="mt-2 mb-2 ">Reservación</h1> 
            <LabelCompo value={user.name} label="Nombre Completo" />
            <LabelCompo value={user.id} label="Identificación" />
            <LabelCompo value={user.phone} label="Teléfono" />
            <LabelCompo value={user.email} label="Correo" />
            <LabelCompo value={user.role} label="Función" />
            <LabelCompo value={user.org} label="Organización" />
            <LabelCompo value={user.hour} label="Hora de Ingreso" />
            <LabelCompo value={user.date} label="Fecha" />
            <LabelCompo value={user.sport} label="Disciplina" />
            <LabelCompo value={user.notes} label="Notas" />
            <input
                type="text"
                id={"temp"}
                name={"temp"}
                value={value}
                placeholder={'Temperatura'}
                label={'Temperatura'}
                className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={(e) => { setValue(e.target.value)}}
            />

            <button type="submit" onClick={() => {
                axios({
                    method: 'PUT',
                    url: '/api/user',
                    data: {
                        id: user._id,
                        update: {
                            $set: { temp: value }
                        },
                        options: {}
                    }
                  }).then(() => {
                    Router.push(`/admin/list`);
                  })
                
             }} className="mt-8 py-2 px-4 border-2 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
                 Actualizar
            </button>
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