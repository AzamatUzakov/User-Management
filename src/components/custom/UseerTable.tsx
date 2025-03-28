import UserContext from "@/context/UserContext";
import { method, useApi } from "@/hooks/useApi";
import React, { useContext, useEffect, useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Edit from "./Edit";
import { Skeleton } from "../ui/skeleton";


interface UserTableProps {

}

const UserTable: React.FC<UserTableProps> = () => {
    const context = useContext(UserContext);
    const [modal, setModal] = useState(false)
    const [edit, setEdit] = useState([])

    if (!context) {
        throw new Error("ProductList must be used within a ProductProvider");
    }

    const { setUsers, filteredUser, setFilteredUser } = context
    const { fetchData, loading, error } = useApi(import.meta.env.VITE_PUBLIC_PATH)
    useEffect(() => {
        fetchData("/users", method.get)
            .then(res => {
                setUsers(res?.data)
                setFilteredUser(res?.data)
            })


    }, [])

    const Delete = async (id: string) => {

        try {
            await fetch(import.meta.env.VITE_PUBLIC_PATH + `/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

        } catch (e) {
            console.log(e);

        }

    }




    return (
        <>
            <div className="">

                {loading && <span className="text-3xl text-center my-5 ">Loading...</span>}
                {error && <span className="text-red-500">Произошла ошибка при загрузке данных!</span>}

                <Table className="w-full rounded-lg shadow border border-gray-200">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow className="text-left font-semibold border-gray-200 rounded-2xl">
                            <TableHead className="py-4 px-6 text-gray-400">Name</TableHead>
                            <TableHead className="py-4 px-6 text-gray-400">Email</TableHead>
                            <TableHead className="py-4 px-6 text-gray-400">Status</TableHead>
                            <TableHead className="py-4 px-6 text-gray-400">Role</TableHead>
                            <TableHead className="py-4 px-6 text-gray-400">Last Active</TableHead>
                            <TableHead className="py-4 px-6 text-gray-400">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                     <TableBody>


                        {filteredUser.map((user) => (
                            <TableRow key={user.id} className="border hover:bg-gray-50">
                                <TableCell className="py-6 px-6 font-medium text-gray-800">{user.name}</TableCell>
                                <TableCell className="py-6 px-6 font-normal">{user.email}</TableCell>
                                <TableCell className="py-6 px-6">
                                    <span className={`py-1 px-3 rounded-full text-xs font-semibold ${user.status === 'Active' ? 'bg-green-500 text-white' :
                                        user.status === 'Inactive' ? 'bg-gray-200 text-black' :
                                            'bg-orange-100 text-orange-600 border border-orange-500'
                                        }`}>{user.status}</span>
                                </TableCell>
                                <TableCell className="py-6  px-6">{user.role}</TableCell>
                                <TableCell className="py-6  px-6">{user.lastActive}</TableCell>
                                <TableCell className="py-6  px-6">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="cursor-pointer font-medium hover:text-blue-800">Actions</DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel >Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-green-600 flex items-center" onClick={() => { setModal(true); setEdit(user) }}><MdEdit className="mr-2" /> Edit</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-600 flex items-center" onClick={() => Delete(user?.id)}><MdDelete className="mr-2" /> Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                {modal && <Edit setModal={setModal} setEdit={setEdit} edit={edit} />}
            </div>
        </>
    );

}

export default UserTable;