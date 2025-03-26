import React from "react";
import { Input } from "../ui/input";

interface SearchProps {

}

const Search: React.FC<SearchProps> = () => {
    return (

        <div>
            <Input placeholder="🔍  Search users..." className="mb-5"/>
        </div>

    );
}

export default Search;