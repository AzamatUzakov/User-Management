import React, { useState, useContext } from "react";
import UserContext from "@/context/UserContext";

interface FilteredProps { }

const Filtered: React.FC<FilteredProps> = () => {
    const [actBtn, setActBtn] = useState("All Users");
    const buttons = ["All Users", "Active", "Inactive", "Pending"];
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("Filtered must be used within a UserProvider");
    }

    const { users, setFilteredUser } = context;

    const handleFilter = (status: string) => {
        setActBtn(status);

        if (status === "All Users") {
            setFilteredUser(users);
        } else {
            const filtered = users.filter((user) => user.status === status);
            setFilteredUser(filtered);
        }
    };

    return (
        <div className="flex gap-1.5 py-1 px-2 justify-between bg-gray-200 w-[300px] mb-5 text-gray-700 font-semibold text-sm rounded-[3px]">
            {buttons.map((btn) => (
                <button
                    key={btn}
                    className={`cursor-pointer transition-all duration-200 rounded-[2px] ${actBtn === btn ? "bg-white p-1 text-black" : "bg-gray-200 text-gray-700"
                        }`}
                    onClick={() => handleFilter(btn)}
                >
                    {btn}
                </button>
            ))}
        </div>
    );
};

export default Filtered;
