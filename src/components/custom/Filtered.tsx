import React, { useState } from "react"
import { Button } from "../ui/button";

interface FilteredProps {

}


const Filtered: React.FC<FilteredProps> = () => {
    const [actBtn, setActBtn] = useState('All Users')
    const buttons = ["All Users", "Active", "Inactive", "Pending"]
    return (
        <div className="flex gap-1.5 py-1 px-2  justify-between bg-gray-200 w-[300px] mb-5 text-gray-700 font-semibold text-sm rounded-[3px]">

            {buttons.map((btn) => (
                <button
                    key={btn}
                    className={`cursor-pointer transition-all duration-200 rounded-[2px] ${actBtn === btn ? "bg-white p-1 text-black" : "bg-gray-200 text-gray-700"}`}
                    onClick={() => setActBtn(btn)}

                >{btn}</button>
            ))
            }
        </div >
    );
}

export default Filtered;