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
                    width: "35vw",
                }}>
                <Card
                    sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.3)",
                        width: "35vw",
                        height: "50vh",
                    }}
                >
                    <CardContent>
                        <PosterGrid watchlist={watchlist} />
                    </CardContent>
                </Card>
                <h3>{watchlist.watchlistName}</h3>
            </div>
        </Draggable>
    );
}
