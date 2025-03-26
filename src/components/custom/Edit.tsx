import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "../ui/input";
import { method, useApi } from "@/hooks/useApi";

interface EditProps {
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    setEdit: React.Dispatch<React.SetStateAction<any[]>>;
    modal: boolean;
    edit: []
}

const Edit: React.FC<EditProps> = ({ setModal, setEdit, edit }) => {
    console.log(edit, "aza");

    const [localText, setLocalText] = useState(edit)
    const { fetchData } = useApi(import.meta.env.VITE_PUBLIC_PATH)


    useEffect(() => {
        setLocalText(edit)
    }, [edit])
    const headers = {
        "Content-Type": "application/json",
    };
    const body = {
        name: localText.name,
        email: localText.email,
        status: localText.status,
        role: localText.role

    }



    const upd = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await fetchData(`/users/${localText.id}`, method.patch, body, headers)
            setModal(false)
            setLocalText(localText)
        } catch (e) {
            console.log(e);

        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-[#80808044] bg-opacity-40 backdrop-blur-xs flex justify-center items-center z-20">
                <form onSubmit={upd} className="bg-white p-8 rounded-xl w-[400px] shadow-2xl relative">
                    <h2 className="text-xl font-semibold mb-2">Edit User</h2>
                    <p className="text-gray-500 mb-4 text-sm">Update user account details.</p>

                    <p className="text-sm mb-2 font-medium">Full Name</p>
                    <Input
                        name="name"
                        className="mb-3"
                        value={localText?.name || ""}
                        onChange={(e) => setLocalText((prev) => ({ ...prev, name: e.target.value }))} />

                    <p className="text-sm mb-2 font-medium">Email</p>
                    <Input
                        name="email"
                        value={localText?.email || ""}
                        className="mb-3"
                        onChange={(e) => setLocalText((prev) => ({ ...prev, email: e.target.value }))} />

                    <div className="flex justify-between gap-4 mb-4">
                        <div className="w-1/2">
                            <p className="text-sm mb-2 font-medium">Status</p>
                            <Select onValueChange={(value) => setLocalText((prev)=> ({...prev, status:value }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={localText?.status || "Selected"} />
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
                            <Select onValueChange={(value) => setLocalText((prev) => ({ ...prev, role: value }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder={localText?.role || "selected"} />
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
                        <Button type="submit">Edit</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Edit;