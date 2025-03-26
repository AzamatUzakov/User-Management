import UserTable from "@/components/custom/UseerTable";
import { UserProvider } from "@/context/UserContext";
import React from "react";
import Header from "@/components/custom/Header"
import Search from "@/components/custom/Serach";
import Filtered from "@/components/custom/Filtered";

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    return (
        <div className="p-5 border border-gray-300 m-4 rounded-xl">
            <Header />
            <UserProvider>
                <Search />
                <Filtered/>
                <UserTable />
            </UserProvider>
        </div>
    );
}

export default Home;