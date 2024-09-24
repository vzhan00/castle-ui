import { CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import Draggable from "react-draggable";
import { WatchlistProps } from "../types/Watchlist";
import { PosterGrid } from "./PosterGrid";

export function ListContainer({ watchlist }: WatchlistProps) {
    return (
        <Draggable>
            <div style={{
                    textAlign: "center",
                    color: "white",
                    width: "15vw",
                    textShadow: '2px 2px 5px black',
                }}>
                <Card
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        width: "15vw",
                        height: "35vh",
                        overflow: "auto",
                        borderRadius: 2
                    }}
                >
                    <CardContent>
                        <PosterGrid watchlist={watchlist} />
                    </CardContent>
                </Card>
                <h3 style={{textShadow: '6px 6px 15px rgba(0, 0, 0, 1)'}}>{watchlist.watchlistName}</h3>
            </div>
        </Draggable>
    );
}
