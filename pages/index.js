import React, { useState, useContext } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import UserContext from '../components/UserContext';
import axios from 'axios';

function InputMingo( { label, placeholder, id, onChange }) {
  return (
    <div class="w-full mx-full flex flex-col">
               <label
                  htmlFor={id}
                  class="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text"
      >{label}</label
               >
               <input
                  type="text"
                  id={id}
                  placeholder={placeholder}
                  class="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                  onChange={onChange}
               />
    </div>
  )
};

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

      <div class="m-8 flex flex-col flex-grow md:container md:mx-auto">
        <form class="w-auto mx-auto max-w-3xl bg-white shadow p-8 text-gray-700">
            <div class="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Nombre Completo"} id="name" placeholder="Nombre Completo" />
            </div>
            <div class="flex flex-row space-x-6">
             <InputMingo onChange={onChange} label={"Identificación"} id="id" placeholder="Identificación" />
            </div>
            <div class="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Teléfono"} id="phone" placeholder="Teléfono" />
            </div>
            <div class="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Correo"} id="mail" placeholder="Correo" />
            </div>
            <div class="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Función"} id="role" placeholder="Función" />
            </div>
            <div class="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Organización"} id="org" placeholder="Organización" />
            </div>
            <div class="flex flex-row space-x-6">
               <InputMingo onChange={onChange} label={"Fecha"} id="date" placeholder="Fecha" />
            </div>
            <div class="flex flex-row space-x-6">
              <InputMingo onChange={onChange} label={"Hora de Ingreso"} id="hour" placeholder="Hora de Ingreso" />
            </div>

          <button onClick={onSubmit} class="py-2 px-4 border-2 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
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
