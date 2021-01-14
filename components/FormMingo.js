import React from 'react';
import { Formik } from 'formik';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import Router from 'next/router';

function InputMingo( { label, id, onChange, value }) {
    return (
      <div className="w-full mx-full flex flex-col">
                 <label
                    htmlFor={id}
                    className="absolute tracking-wide py-2 px-4 mb-4 opacity-0 leading-tight block top-0 left-0 cursor-text">{label}</label>
                 <input
                    type="text"
                    id={id}
                    name={id}
                    value={value}
                    placeholder={label}
                    label={label}
                    className="tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full bg-gray-200 border border-gray-200 rounded focus:outline-none focus:bg-white focus:border-gray-500"
                    onChange={onChange}
                 />
      </div>
    )
};

function Notes({ onChange, value }) {
  return (<label className="block">
      <span className="text-gray-700">Notas</span>
      <textarea onChange={onChange}  value={value} id="notes"  className="form-textarea mt-1 block w-full" rows="3" placeholder="Información extra para el entrenador"></textarea>
    </label>);
}

const DatePickerField = ({ name, value, onChange }) => {
  return (
      <DatePicker
          selected={(value && new Date(value)) || null}
          onChange={val => {
              onChange(name, val);
          }}
      />
  );
};

export function QuestionSym({ group, onChange, id, value }) {
  return(
    <div className="mt-2">
          <label className="inline-flex items-center">
            <input onClick={onChange} id={id} type="radio" className="form-radio border-solid" name={group} value={"yes"} checked={"yes" === value} />
            <span className="ml-2">Si</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input onClick={onChange} id={id} type="radio" className="form-radio border-solid" name={group} value={"no"} checked={"no" === value} />
            <span className="ml-2">No</span>
          </label>
      </div>
    );
};

export function ListSymp({ onChange, value, disabled=false }) {
  return (
  <div className="bg-gray-200">
    <div className="flex flex-col p-3 justify-start">
        <div className="flex flex-col">
            <label className="inline-flex items-center mt-3">
                <input onChange={onChange} id="fever" type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" checked={value['fever']} disabled={disabled} /><span className="ml-2 text-gray-700">Fiebre</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input onChange={onChange} id="throatpain" type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" checked={value['throatpain']} disabled={disabled} disabled={disabled} /><span className="ml-2 text-gray-700">Dolor de Garganta</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input onChange={onChange} id="bodypain" type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" checked={value['bodypain']} disabled={disabled} /><span className="ml-2 text-gray-700">Dolor de Cuerpo</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input onChange={onChange} id="diarrhea"  type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" checked={value['diarrhea']} disabled={disabled} /><span className="ml-2 text-gray-700">Diarrea</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input onChange={onChange} id="snot" type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" checked={value['snot']} disabled={disabled} /><span className="ml-2 text-gray-700">Mocos</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input onChange={onChange} id="cough" type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" checked={value['cough']} disabled={disabled} /><span className="ml-2 text-gray-700">Tos</span>
            </label>

            <label className="inline-flex items-center mt-3">
                <input onChange={onChange} id="smells" type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" checked={value['smells']} disabled={disabled} /><span className="ml-2 text-gray-700">Problemas olfato</span>
            </label>
            <label className="inline-flex items-center mt-3">
                <input onChange={onChange} id="taste" type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" checked={value['taste']} disabled={disabled} /><span className="ml-2 text-gray-700">Problemas gusto</span>
            </label>
            <label className="inline-flex items-center mt-3">
                <input onChange={onChange} id="breath"  type="checkbox" className="form-checkbox h-5 w-5 text-purple-600" checked={value['breath']} disabled={disabled} /><span className="ml-2 text-gray-700">Problemas respiratorios</span>
            </label>
        </div>
    </div>
</div>);
}


const FormMingo = () => (
  <div>
    <h1>Informacíon</h1>
    <Formik
      initialValues={{ 
          email: '', 
          id: '',  
          org: '', 
          role: '', 
          hour: '17:00', 
          name: '', 
          notes: '', 
          phone: '', 
          date: new Date(), 
          sys: 'no', 
          contact: 'no', 
          close: 'no', 
          accept: false,
          fever: false,
          throatpain: false,
          bodypain: false,
          diarrhea: false,
          snot: false,
          cough: false,
          smells: false,
          taste: false,
          breath: false,
          sport: 'Boxeo'

      }}
      validate={values => {
        const errors = {};
        const requiredLabel = '*';
        if (!values.hour) {
          errors.hour = requiredLabel;
        }
        if (!values.id) {
          errors.id = requiredLabel;
        }
        if (!values.org) {
          errors.org = requiredLabel;
        }
        if (!values.role) {
          errors.role = requiredLabel;
        }
        if (!values.name) {
          errors.name = requiredLabel;
        }
        if (!values.phone) {
          errors.phone = requiredLabel;
        }
        if (!values.accept) {
          errors.accept = 'Necesita aceptar la boleta.';
        }
        
        if (!values.email) {
          errors.email = requiredLabel;
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Correo invalido';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          const postData = {
            ...values,
            actualDate: new Date()
          };
          // alert(JSON.stringify(postData, null, 2));
          setSubmitting(false);
          // // Send a POST request
          axios({
            method: 'post',
            url: '/api/user',
            data: postData
          }).then(res => {
            Router.push(`/reservation/${res.data.insertedId}`);
          })
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        isSubmitting,
        setFieldValue
      }) => (
        <form onSubmit={handleSubmit} className="w-full bg-white shadow p-8 text-gray-700">
          <InputMingo
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            label={"Nombre Completo"}
            value={values.name}
          />
          {errors.name && touched.name && errors.name}
          <InputMingo
            id="id"
            type="text"
            name="id"
            onChange={handleChange}
            label={"Identificación"}
            value={values.id}
          />
          {errors.id && touched.id && errors.id}

          <InputMingo
            id="phone"
            type="text"
            name="phone"
            onChange={handleChange}
            label={"Teléfono"}
            value={values.phone}
          />
          {errors.phone && touched.phone && errors.phone}
          
          <InputMingo
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            label={"Correo"}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
     
          <InputMingo
            id="role"
            type="text"
            name="role"
            onChange={handleChange}
            label={"Función"}
            value={values.role}
          />
          {errors.role && touched.role && errors.role}
          <InputMingo
            id="org"
            type="text"
            name="org"
            onChange={handleChange}
            label={"Organización"}
            value={values.org}
          />
          {errors.org && touched.org && errors.org}
          <div className="mt-4 mb-4">
            <span className="flex text-gray-600 text-md">Fecha</span> 
            <DatePickerField
                name="date"
                value={values.date}
                onChange={setFieldValue}
            />
          </div>
          <div className="mt-4 mb-4">
            <span className="flex text-gray-600 text-md">Hora de Ingreso</span> 
            <input 
              type="time" 
              id="hour" 
              name="hour" 
              value={values.hour} 
              onChange={handleChange}
              min="06:00" max="22:00" />
              {errors.hour && touched.hour && errors.hour}
          </div>

          <div className="mb-4">
            <span className="flex text-gray-600 text-md">Disciplina</span> 
            <select value={values.sport} name="sport" onBlur={handleBlur} onChange={handleChange}>
                <option value="Boxeo">Boxeo</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Taekwondo">Taekwondo</option>
            </select>
          </div>

          <Notes onChange={handleChange} value={values.notes} />

          <div className="flex flex-row space-x-6">
            <span>¿Ha presentado alguno de los siguientes síntomas en las últimas 2 semanas?</span>
          </div>
          <QuestionSym group={"sys"} id={'sys1'} onChange={handleChange} value={values.sys} />
          
          <div className="flex flex-row space-x-6">
            <span>¿Ha tenido contacto con algún familiar o u otra persona cercana con los síntomas antes mencionados en las últimas dos semanas?</span>
          </div>
          <QuestionSym  group={"contact"} id={'contact2'} onChange={handleChange} value={values.contact}  />
          
          <div className="flex flex-row space-x-6">
            <span>¿Ha presentado alguno de los siguientes síntomas en las últimas 2 semanas?</span>
          </div>
          <QuestionSym group={"close"} id={'close3'} onChange={handleChange}  value={values.close} />


          <p className="ml-2 mt-4">
            El firmante de esta boleta declara bajo juramento que el/la participante ha contesta con información veraz la encuesta realizada,
            correspondiente para determinar que se encuentra en un buen estado de salud, no presenta ningún problema físico que le impida su
            participación en los entrenamientos de boxeo y libera de la responsabilidad a la Asociación de Boxeo de Santo Domingo de cualquier
            accidente o quebranto de salud que suceda dentro posterior a los entrenamientos realizados.
          </p>

          <ListSymp onChange={handleChange} value={values} />



          <div className="flex flex-row space-x-6">
            <label className="inline-flex items-center mt-3">
              <input onChange={handleChange} id={'accept'} name={'accept'} type="checkbox" className="form-checkbox h-5 w-5 text-green-600" value={values.accept}/><span className="ml-2 text-gray-700">Acepto</span>
            </label>
          </div>
          {errors.accept && touched.accept && errors.accept}
          <button type="submit" disabled={isSubmitting} className="mt-8 py-2 px-4 border-2 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">
           Reservar
          </button>
        </form>
      )}
    </Formik>
  </div>
);

export default FormMingo;
