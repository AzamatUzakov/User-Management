import { Button } from "../ui/button";
import { FiPlusCircle } from "react-icons/fi";

interface AddUserProps {

}

const AddUser: React.FC<AddUserProps> = () => {
    return (
        <>
            <header className="flex justify-between items-center mb-5">

                <div>
                    <h1 className="font-bold text-2xl">User Management</h1>
                    <p  className="text-gray-400 text-sm">Manage your users, their roles and permissions.</p>
                </div>
                <Button><FiPlusCircle />Add User</Button>
            </header>
        </>
    );
}

export default AddUser;