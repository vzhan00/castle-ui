"use server";

import Home from "./home/page";
import { supabase } from "../supabase";
import { SignInButton } from "./SignInButton";
import { Card } from "@mui/material";
import Castle from "@mui/icons-material/Castle";

export default async function Landing() {
    const { data, error } = await supabase.auth.getSession();
    const session = data.session;

    if (session) {
        return <Home />;
    }

    return (
        <div className="contentContainer notSelectable">
            <h1 style={{fontFamily: "San Francisco, sans-serif"}}><Castle/> Castle</h1>
			<p style={{position: "absolute"}}> movies film watch track see friends review recommendations social rate family follow studio director cinema skibidi</p>
            <Card
                sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    height: 407,
                    width: 814,
                    overflowY: "hidden",
                    scrollbarWidth: "thin",
                    scrollbarColor: "transparent transparent",
                    borderRadius: 4,
                    backdropFilter: "blur(5px)",
                }} 
            >
                <img style={{ borderRadius: 4, height: 407, width: 814 }} src={"/demo image.png"} />
            </Card>
            <SignInButton />
        </div>
    );
}
