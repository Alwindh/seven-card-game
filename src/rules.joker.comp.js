import Backdrop from "@mui/material/Backdrop";
import React from "react";
import { Typography, Stack, Box, Button, Grid, Alert, AlertTitle } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function RulesJokerDialog(props) {
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
							Rules - Joker <Typography variant="subtitle2">page 4/5</Typography>
						</AlertTitle>
						<Typography style={{ marginBottom: "1em" }}>
							The joker card can be played on any other card, provided the play is valid.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							Playing the joker will replace a different card that someone else is holding.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							This makes it no longer possible to play that card from now on, making that card the 'poison
							card'.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							You can play the joker card whenever it's your turn, you don't have to save it.
						</Typography>
						<Typography style={{ marginBottom: "1em" }}>
							If the game ends with someone still holding the joker card, it will be worth no points.
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
