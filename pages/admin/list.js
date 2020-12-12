import React from 'react';
import { connectToDatabase } from "../../util/mongodb";

export default function List({ newUsers }) {
    const _newUsers = JSON.parse(newUsers);
    return (
        <div class="w-min mx-min flex flex-col self-center content-center bg-white p-8 text-gray-700">
            <h1 class="font-semibold text-lg">Reservación</h1>

<table class="w-min mx-min flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
			<thead class="text-white">
            {_newUsers.map(() => (
                    <tr class="bg-green-600 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                        <th class="p-3 text-left ">Nombre</th>
                        <th class="p-3 text-left">Identificación</th>
                        <th class="p-3 text-left">Fecha</th>
                        <th class="p-3 text-left">Hora</th>
                        <th class="p-3 text-left" width="110px">Reserva</th>
                    </tr>
            ))}
			</thead>
			<tbody class="flex-1 sm:flex-none">
                {_newUsers.map(user => (
                    <tr class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                        <td class="border-grey-light border hover:bg-gray-100 p-3 whitespace-nowrap">{user.name}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3">{user.id}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3">{user.date}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3">{user.hour}</td>
                        <td class="border-grey-light border hover:bg-gray-100 p-3 text-green-600 hover:text-red-600 hover:font-medium cursor-pointer">
                            <a href={`/reservation/${user._id}`}>Ver Reserva</a>
                        </td>
                    </tr>))} 
			</tbody>
		</table>
        </div>);  
}

export async function getServerSideProps(context) {
    const { db } = await connectToDatabase();
 
    const users = await db
        .collection("users")
        .find({})
        .sort({ actualDate: -1 })
        .toArray();



    return {
      props: { newUsers: JSON.stringify(users) },
    }
}