import { Button } from "../ui/button";
import { FiPlusCircle } from "react-icons/fi";
import AddUser from "./AddUser";
import { useState } from "react";

interface Header {

}

const Header: React.FC<Header> = () => {

    const [modal, setModal] = useState<boolean>(false)

    return (
        <>
            <header className="flex justify-between items-center mb-5">

                <div>
                    <h1 className="font-bold text-2xl">User Management</h1>
                    <p className="text-gray-400 text-sm">Manage your users, their roles and permissions.</p>
                </div>
                <Button onClick={() => setModal(true)}><FiPlusCircle />Add User</Button>
            </header>
            {modal && <AddUser setModal={setModal} modal={modal} />}
        </>
    );
}

export default Header;