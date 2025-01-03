import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { supabase } from "../supabase";
import { useRouter } from "next/navigation";
import CastleIcon from "@mui/icons-material/Castle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsButton from "./SettingsButton";
import AddWatchlistButton from "./AddWatchlistButton";

export default function HomeAppBar() {
    const router = useRouter();
    
    const signOut = () => {
        supabase.auth.signOut();
        router.push("/login");
    };


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: "rgba(0,0,0,0)",
                    boxShadow: "none",
                }}
            >
                <Toolbar
                    sx={{ height: 25, padding: 0, margin: 0, color: "#324352" }}
                >
                    <CastleIcon sx={{ mr: 2 }} />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    <AddWatchlistButton/>
                    <SettingsButton/>
                    <IconButton onClick={signOut} sx={{paddingLeft: "20px"}}>
                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
