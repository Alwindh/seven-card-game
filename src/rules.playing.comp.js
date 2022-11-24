import Backdrop from "@mui/material/Backdrop";
import React from "react";
import { Typography, Stack, Box, Button, Grid, Alert, AlertTitle } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function RulesPlayingDialog(props) {
	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: "6000" }}
			open={props.dialogOpen}
			onClick={() => {
				props.cancelFunction();
			}}
		>
			<Box className="text-center" onClick={(e) => e.stopPropagation()}>
				<Stack className="text-center">
					<Alert severity="info" className="p-3">
						<AlertTitle style={{ fontSize: "2em" }}>
							Rules - Playing
							<Typography variant="subtitle2">page 2/5</Typography>
						</AlertTitle>
						<Typography style={{ marginBottom: "1em" }}>
							Whoever has the Seven of Spades in their hand puts it down in the middle of the table, then
							take turns going clockwise around the table.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							If it's your turn, play a card from your hand if possible. You can play a card if it's one
							higher or lower than what is on the table.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							However, you can not play a card of different suit if that same card from Spades is not yet
							on the table.
						</Typography>

						<Grid container style={{ width: "100%" }}>
							<Grid item xs={6}>
								<Button
									className="m-3"
									style={{ textAlign: "center" }}
									variant="contained"
									color="primary"
									onClick={props.cancelFunction}
								>
									<ArrowBackIosIcon />
									back
								</Button>
							</Grid>
							<Grid item xs={6} style={{ alignContent: "right" }}>
								<Button
									className="m-3"
									style={{ textAlign: "center" }}
									variant="contained"
									color="success"
									onClick={props.confirmFunction}
								>
									<ArrowForwardIosIcon />
									next
								</Button>
							</Grid>
						</Grid>
					</Alert>
				</Stack>
			</Box>
		</Backdrop>
	);
}
