import React, { useState, useEffect }  from 'react';
// import { connectToDatabase } from "../../util/mongodb";
import axios from 'axios';

export default function List() {
    const [value, setValue] = useState('');
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/api/user',
            params:  value
          }).then(res => {
              setNewUsers(res.data);
          })
    }, [value]);
    return (
        <div class="w-min mx-min flex flex-col self-center content-center bg-white p-8 text-gray-700">
            <h1 class="font-semibold text-lg">Reservación</h1>

            <select value={value} name="sport" onChange={(e) => { setValue(e.target.value)}}>
                <option value="">Seleccione una disciplina</option>
                <option value="Boxeo">Boxeo</option>
                <option value="Volleyball">Volleyball</option>
                <option value="Taekwondo">Taekwondo</option>
            </select>     
         
<table class="w-min mx-min flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
			<thead class="text-white">
            {newUsers && newUsers.map(() => (
                    <tr class="bg-green-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                        <th class="p-3 text-left ">Nombre</th>
                        <th class="p-3 text-left">Identificación</th>
                        <th class="p-3 text-left">Disciplina</th>
                        <th class="p-3 text-left">Temp</th>
                        <th class="p-3 text-left">Hora</th>
                        <th class="p-3 text-left" width="120px">Reserva</th>
                    </tr>
            ))}
			</thead>
			<tbody class="flex-1 sm:flex-none">
                {newUsers && newUsers.map(user => (
                    <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                        <td class="border-grey-light border hover:bg-gray-100 p-3 whitespace-nowrap">{user.name}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3">{user.id}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3">{user.sport}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3">{user.temp}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3">{user.hour}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3 text-green-600 hover:text-red-600 hover:font-medium cursor-pointer">
                            <a href={`/reservation/${user._id}`}>Ver Reserva</a>
                        </td>
                    </tr>))} 
			</tbody>
		</table>
        </div>);  
}

// export async function getServerSideProps(context) {
//     const { db } = await connectToDatabase();
//     console.log(context)
//     const users = await db
//         .collection("users")
//         .find({ "sport": 'Boxeo' })
//         .sort({ actualDate: -1 })
//         .toArray();



//     return {
//       props: { newUsers: JSON.stringify(users) },
//     }
// }