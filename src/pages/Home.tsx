import UserTable from "@/components/custom/UseerTable";
import { UserProvider } from "@/context/UserContext";
import React from "react";

interface HomeProps {

}

const Home: React.FC<HomeProps> = () => {
    return (
        <>
            <UserProvider>
                <UserTable />
            </UserProvider>
        </>
    );
}

export default Home;