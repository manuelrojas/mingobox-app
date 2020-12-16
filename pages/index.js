import React, { useState, useContext } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import UserContext from '../components/UserContext';
import axios from 'axios';

function InputMingo( { label, placeholder, id, onChange }) {
  return (
    <div className="w-full mx-full flex flex-col">
               <label
                  htmlFor={id}
                  className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">{label}</label>
               <input
                  type="text"
                  id={id}
                  placeholder={placeholder}
                  className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={onChange}
               />
    </div>
  )
};

function QuestionSym({ group }) {
  return(
    <div className="mt-2">
          <label className="inline-flex items-center">
            <input type="radio" className="form-radio border-solid" name={group} value="yes" />
            <span className="ml-2">Si</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input type="radio" className="form-radio border-solid" name={group} value="no" />
            <span className="ml-2">No</span>
          </label>
      </div>
    );
};

function ListSymp() {
  return (
  <div className="bg-gray-200">
    <div className="flex flex-col p-3 justify-start">
        <div className="flex flex-col">
            <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" /><span className="ml-2 text-gray-700">Fiebre</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" /><span className="ml-2 text-gray-700">Dolor de Garganta</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" /><span className="ml-2 text-gray-700">Dolor de Cuerpo</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" /><span className="ml-2 text-gray-700">Diarrea</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" /><span className="ml-2 text-gray-700">Mocos</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" /><span className="ml-2 text-gray-700">Tos</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" /><span className="ml-2 text-gray-700">Problemas olfato</span>
            </label>
            <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" /><span className="ml-2 text-gray-700">Problemas olfato</span>
            </label>
            <label className="inline-flex items-center mt-3">
                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" /><span className="ml-2 text-gray-700">Problemas respiratorios</span>
            </label>
        </div>
    </div>
</div>);
}

function Notes() {
  return (<label className="block">
      <span className="text-gray-700">Notas</span>
      <textarea className="form-textarea mt-1 block w-full" rows="3" placeholder="Información extra para el entrenador"></textarea>
    </label>);
}



export default function Home({ isConnected }) {
  const [value, setValue] = useState({});
  const { updateUser } = useContext(UserContext);

  const onChange = (event) => {
    const evalue = event.target.value;
    setValue({
      ...value,
      [event.target.id]: evalue
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); 
    updateUser(value);
    const postData = {
      ...value,
      actualDate: new Date()
    }
    // Send a POST request
    axios({
      method: 'post',
      url: '/api/user',
      data: postData
    }).then(res => {
      Router.push(`/reservation/${res.data.insertedId}`);
    })
   
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>MingoBox App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full m-8 flex flex-col flex-grow">
        <form className="w-full bg-white shadow p-8 text-gray-700">
            <div className="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Nombre Completo"} id="name" placeholder="Nombre Completo" />
            </div>
            <div className="flex flex-row space-x-6">
             <InputMingo onChange={onChange} label={"Identificación"} id="id" placeholder="Identificación" />
            </div>
            <div className="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Teléfono"} id="phone" placeholder="Teléfono" />
            </div>
            <div className="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Correo"} id="mail" placeholder="Correo" />
            </div>
            <div className="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Función"} id="role" placeholder="Función" />
            </div>
            <div className="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Organización"} id="org" placeholder="Organización" />
            </div>
            <div className="flex flex-row space-x-6">
               <InputMingo onChange={onChange} label={"Fecha"} id="date" placeholder="Fecha" />
            </div>
            <div className="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Hora de Ingreso"} id="hour" placeholder="Hora de Ingreso" />
            </div>

            <div className="flex flex-row space-x-6">
              <span>¿Ha presentado alguno de los siguientes síntomas en las últimas 2 semanas?</span>
          
            </div>
            <QuestionSym group={"sys"} />

            <div className="flex flex-row space-x-6">
              <span>¿Ha tenido contacto con algún familiar o u otra persona cercana con los síntomas antes mencionados en las últimas dos semanas?</span>
            </div>
            <QuestionSym  group={"contact"} />
            <div className="flex flex-row space-x-6">
              <span>¿Ha presentado alguno de los siguientes síntomas en las últimas 2 semanas?</span>
            </div>
            <QuestionSym group={"close"} />

            <ListSymp />
            <Notes />
          <button onClick={onSubmit} className="py-2 px-4 border-2 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
            Reservar 
          </button>
      
      </form>
     
      </div>

      <footer className={styles.footer}>
        <a
          href="https://www.facebook.com/mingo.box.5"
          target="_blank"
          rel="noopener noreferrer"
        >
          Desarrollada por{' '}
          <img src="/mingo.png" alt="MingoBox Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
