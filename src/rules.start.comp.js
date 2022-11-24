import Backdrop from "@mui/material/Backdrop";
import React from "react";
import { Typography, Stack, Box, Button, Grid, Alert, AlertTitle } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function RulesStartDialog(props) {
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
							Rules - Startup
							<Typography variant="subtitle2">page 1/5</Typography>
						</AlertTitle>
						<Typography style={{ marginBottom: "1em" }}>
							You will need a standard deck of cards, with a single joker included.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							Shuffle the deck and start dealing from the person next to the dealer, going clockwise
							around the table.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							Hand out cards one by one until the deck is gone.
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
