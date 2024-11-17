import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Draggable from "react-draggable";
import { Watchlist } from "../types/Watchlist";
import { PosterGrid } from "./PosterGrid";
import AddIcon from "@mui/icons-material/Add";
import { BiExpandAlt } from "react-icons/bi";
import { IconButton } from "@mui/material";
import { useState } from "react";

interface ListContainerProp {
    watchlist: Watchlist;
    openModalWithWatchlist: (watchlist: Watchlist) => void;
}

export function ListContainer({
    watchlist,
    openModalWithWatchlist,
}: ListContainerProp) {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Draggable>
            <div
                style={{
                    textAlign: "center",
                    color: "white",
                    width: 500,
                    textShadow: "2px 2px 5px black",
                }}
            >
                {/* {watchlist.isWatchedList ? <VisibilityIcon sx={{
                        color: "black",
                        height: 30,
                        width: 30,
                        position: "absolute",
                        top: 8,
                        left: 10,
                        zIndex: 1,
                    }} /> : <WatchLaterIcon sx={{
                        color: "#324352",
                        height: 30,
                        width: 30,
                        position: "absolute",
                        top: 8,
                        left: 10,
                        zIndex: 1,
                    }} />} */}
                <Card
                    sx={{
                        backgroundColor: watchlist.isWatchedList ? "rgba(64, 64, 64, 0.3)" : "rgba(255, 255, 255, 0.3)",
                        height: expanded ? 814 : 407,
                        width: expanded? 1000: 500,
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                        scrollbarColor: "transparent transparent",
                        borderRadius: 4,
                        backdropFilter: "blur(5px)",
                    }}
                >
                    <IconButton
                    sx={{
                        height: 37,
                        width: 37,
                        position: "absolute",
                        top: 55,
                        right: 8,
                        zIndex: 1,
                    }}
                    onClick={() => openModalWithWatchlist(watchlist)}
                >
                    <AddIcon />
                </IconButton>
                <IconButton
                    sx={{
                        height: 37,
                        width: 37,
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1,
                    }}
                    onClick={handleExpandClick}
                >
                    <BiExpandAlt
                        style={{
                            fontSize: 20,
                        }}
                    />
                </IconButton>
                    <CardContent
                        sx={{
                            padding: 5,
                        }}
                    >
                        <PosterGrid watchlist={watchlist} />
                    </CardContent>
                </Card>

                <h3 style={{ textShadow: "6px 6px 15px rgba(0, 0, 0, 1)", fontFamily: "'San Francisco', sans-serif" }}>
                    {watchlist.watchlistName}
                </h3>
            </div>
        </Draggable>
    );
}
