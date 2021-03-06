import React, { useState } from 'react';
import QRCode from "react-qr-code";
import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from 'mongodb';
import { ListSymp, QuestionSym } from '../../components/FormMingo';

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
    return (
        <div className="m-10  w-auto mx-auto max-w-3xl w-min flex flex-col  content-center bg-white shadow p-8 text-gray-700 rounded-lg">
            <QRCode value={`https://mingobox-app.vercel.app/reserved/${user._id}`} />
            <h1 className="mt-2 mb-2 font-semibold text-xl">Reservación</h1> 
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
            <LabelCompo value={user.temp} label="Temperatura" />

            <ListSymp value={user} disabled={true} />

            <div className="mt-8 flex flex-row space-x-6">
                <span>¿Ha presentado alguno de los siguientes síntomas en las últimas 2 semanas?</span>
            </div>
            <QuestionSym group={"sys"} id={'sys1'} value={user.sys} />

            <div className="mt-4 flex flex-row space-x-6">
                <span>¿Ha tenido contacto con algún familiar o u otra persona cercana con los síntomas antes mencionados en las últimas dos semanas?</span>
            </div>
            <QuestionSym  group={"contact"} id={'contact2'} value={user.contact}  />

            <div className="mt-4 flex flex-row space-x-6">
                <span>¿Ha presentado alguno de los siguientes síntomas en las últimas 2 semanas? {user.accept}</span>
            </div>
            <QuestionSym group={"close"} id={'close3'} value={user.close} />

            <div className="flex flex-row space-x-6">
            <label className="inline-flex items-center mt-3">
              <input id={'accept'} name={'accept'} type="checkbox" className="form-checkbox h-5 w-5 text-green-600" disabled checked={user.accept}/><span className="ml-2 text-gray-700">Acepto</span>
            </label>
          </div>
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