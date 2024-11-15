import { CardContent } from "@mui/material";
import Card from "@mui/material/Card";
import Draggable from "react-draggable";
import { Watchlist } from "../types/Watchlist";
import { PosterGrid } from "./PosterGrid";
import AddIcon from "@mui/icons-material/Add";
import { BiExpandAlt } from "react-icons/bi";
import { IconButton } from "@mui/material";

interface ListContainerProp {
    watchlist: Watchlist;
    openModalWithWatchlist: (watchlist: Watchlist) => void;
}

export function ListContainer({
    watchlist,
    openModalWithWatchlist,
}: ListContainerProp) {
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
                <IconButton
                    sx={{
                        height: 37,
                        width: 37,
                        position: "absolute",
                        top: 55,
                        right: 10,
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
                        right: 10,
                        zIndex: 1,
                    }}
                >
                    <BiExpandAlt
                        style={{
                            fontSize: 20,
                        }}
                    />
                </IconButton>
                <Card
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        height: 407,
                        width: 500,
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                        scrollbarColor: "transparent transparent",
                        borderRadius: 8,
                        backdropFilter: "blur(5px)",
                    }}
                >
                    <CardContent
                        sx={{
                            padding: 5,
                        }}
                    >
                        <PosterGrid watchlist={watchlist} />
                    </CardContent>
                </Card>

                <h3 style={{ textShadow: "6px 6px 15px rgba(0, 0, 0, 1)" }}>
                    {watchlist.watchlistName}
                </h3>
            </div>
        </Draggable>
    );
}
