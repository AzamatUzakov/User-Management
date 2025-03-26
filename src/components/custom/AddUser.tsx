import { method, useApi } from "@/hooks/useApi";
import React, { useState } from "react";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button";


interface AddUserProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    modal: boolean;
}

const AddUser: React.FC<AddUserProps> = ({ setModal, modal }) => {

    const { fetchData } = useApi(import.meta.env.VITE_PUBLIC_PATH)

    const [role, setRole] = useState<string>("")
    const [status, setStatus] = useState<string>("")


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setModal(false)

        const fm = new FormData(e.target as HTMLFormElement)
        const formData = Object.fromEntries(fm.entries())

        const data = {
            id: Math.random().toString(),
            name: formData.name,
            email: formData.email,
            status,
            role,
            lastActive: Math.floor(Math.random() * 5) + 1 + " hour ago"
        }

        const headers = {
            "Content-Type": "application/json",
        };

        try {
            await fetchData("/users", method.post, data, headers);

        } catch (e) {
            console.log(e);

        }
        console.log(data);

    }

    return (

        <div className="fixed inset-0 bg-[#80808044] bg-opacity-40 backdrop-blur-xs flex justify-center items-center z-20">
            <form onSubmit={onSubmit} className="bg-white p-8 rounded-xl w-[400px] shadow-2xl relative">
                <h2 className="text-xl font-semibold mb-2">Add New User</h2>
                <p className="text-gray-500 mb-4 text-sm">Create a new user account with the following details.</p>

                <p className="text-sm mb-2 font-medium">Full Name</p>
                <Input placeholder="John Doe" name="name" className="mb-3" />

                <p className="text-sm mb-2 font-medium">Email</p>
                <Input placeholder="john@example.com" name="email" className="mb-3" />

                <div className="flex justify-between gap-4 mb-4">
                    <div className="w-1/2">
                        <p className="text-sm mb-2 font-medium">Status</p>
                        <Select onValueChange={(value) => setStatus(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={status} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                                <SelectItem value="Pending">Pending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-1/2">
                        <p className="text-sm mb-2 font-medium">Role</p>
                        <Select onValueChange={(value) => setRole(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={role} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="Editor">Editor</SelectItem>
                                <SelectItem value="Viewer">Viewer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
                    <Button type="submit">Add User</Button>
                </div>
            </form>
        </div>


    );
}

export default AddUser;