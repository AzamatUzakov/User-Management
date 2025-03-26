import React, { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import UserContext from "@/context/UserContext";

interface SearchProps {

}

const Search: React.FC<SearchProps> = () => {
    const context = useContext(UserContext);
    const [search, setSearch] = useState<string>("")
    if (!context) {
        throw new Error("ProductList must be used within a ProductProvider");
    }

    const { users, setFilteredUser } = context

    useEffect(() => {
        const filter = users.filter((user) => (
            user.name?.toLowerCase().includes(search.toLowerCase().trim())
        ))
        setFilteredUser(filter)
    }, [users, search])

    return (

        <div>
            <Input
                placeholder="🔍  Search users..." className="mb-5"
                onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement
                    setSearch(target.value)
                }}
            />

        </div>

    );
}

export default Search;