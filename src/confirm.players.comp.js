import Backdrop from "@mui/material/Backdrop";
import React from "react";
import { Typography, Stack, Box, Button, Grid, Alert, AlertTitle } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import DeleteIcon from "@mui/icons-material/Delete";

export function DeletePlayersDialog(props) {
	return (
		<Backdrop
			sx={{ color: "#fff", zIndex: "5000" }}
			open={props.dialogOpen}
			onClick={() => {
				props.cancelFunction();
			}}
		>
			<Box className="text-center" onClick={(e) => e.stopPropagation()}>
				<Stack className="text-center">
					<Alert severity="error" className="p-3">
						<AlertTitle
							style={{
								marginBottom: "1em",
							}}
						>
							Warning
						</AlertTitle>
						<Typography>You're about to reset the game.</Typography>
						<Typography>This will reset everything, including players and scores.</Typography>

						<Typography style={{ marginTop: "1em", marginBottom: "1em" }}>Are you sure?</Typography>

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
									No
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button
									className="m-3"
									variant="contained"
									color="error"
									style={{ textAlign: "center" }}
									onClick={props.confirmFunction}
								>
									<DeleteIcon className="mr-3" />
									Yes
								</Button>
							</Grid>
						</Grid>
					</Alert>
				</Stack>
			</Box>
		</Backdrop>
	);
}
