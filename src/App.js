import "./App.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import { PlayerBox } from "./playerBox.comp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StartupComp } from "./startupComp";
import { DeletePlayersDialog } from "./confirm.players.comp";
import { DeleteScoresDialog } from "./confirm.scores.comp";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	const [cookies, setCookie, removeCookie] = useCookies(["seven-card-game"]);
	const [players, setPlayers] = useState();
	const [dealer, setDealer] = useState(0);
	const [turns, setTurns] = useState();
	const [currentScores, setCurrentScores] = useState();
	const [workingTurn, setWorkingTurn] = useState();
	const [validWorkingTurn, setValidWorkingTurn] = useState(false);
	const [showStartup, setShowStartup] = useState(false);
	const [showPlayerDialog, setShowPlayerDialog] = useState(false);
	const [showScoreDialog, setShowScoreDialog] = useState(false);

	useEffect(() => {
		console.log(players);
		if (!cookies["players"]) {
			console.log("no players");
			setShowStartup(true);
		} else {
			setPlayers(cookies["players"]);
			setTurns(cookies["turns"]);
			setDealer(cookies["dealer"]);
		}
	}, [cookies]);

	useEffect(() => {
		if (turns) {
			setCookie("turns", JSON.stringify(turns));
		}
	}, [turns]);

	useEffect(() => {
		if (players) {
			setCookie("players", JSON.stringify(players));
		}
	}, [players]);

	useEffect(() => {
		if (dealer) {
			setCookie("dealer", JSON.stringify(dealer));
		}
	});

	useEffect(() => {
		if (players) {
			let currentScores = {};
			for (const [turnKey, turnValue] of Object.entries(turns)) {
				for (const [nameKey, nameValue] of Object.entries(turnValue)) {
					if (nameKey in currentScores && players.includes(nameKey)) {
						currentScores[nameKey] += nameValue;
					} else if (players.includes(nameKey)) {
						currentScores[nameKey] = nameValue;
					}
				}
			}
			setCurrentScores(currentScores);
		}
	}, [players, turns]);

	function setCurrentPoints(playerName, points) {
		let currentTurn = { ...workingTurn };
		currentTurn[playerName] = points;
		setWorkingTurn(currentTurn);
	}

	function addTurn() {
		players.forEach((playerElement) => {
			if (!(playerElement in workingTurn)) {
				setCurrentPoints(playerElement, 0);
			}
			let newTurns = 0;
			for (const [key, value] of Object.entries(turns)) {
				newTurns += 1;
			}
			let tempTurns = { ...turns };
			tempTurns[newTurns] = workingTurn;
			setTurns(tempTurns);
			setWorkingTurn();
		});
		if (dealer + 1 === players.length) {
			setDealer(0);
		} else {
			setDealer(dealer + 1);
		}
	}

	function resetScores() {
		let firstTurn = {};
		players.forEach((playerElement) => {
			firstTurn[playerElement] = 0;
		});
		setTurns({ 0: firstTurn });
		setShowScoreDialog(false);
	}
	function startGame(playerList) {
		setPlayers(playerList);
		let firstTurn = {};
		playerList.forEach((playerElement) => {
			firstTurn[playerElement] = 0;
		});
		setTurns({ 0: firstTurn });
		setShowStartup(false);
		setDealer(0);
	}
	function newPlayers() {
		setTurns();
		removeCookie("turns");
		setShowStartup(true);
		setDealer(0);
		removeCookie("dealer");
		setPlayers();
		removeCookie("players");
		setShowPlayerDialog(false);
	}

	useEffect(() => {
		if (workingTurn && players) {
			setValidWorkingTurn(false);
			let validInputs = 1;
			players.forEach((playerElement) => {
				if (playerElement in workingTurn && workingTurn[playerElement] !== "") {
					validInputs += 1;
				}
			});
			if (validInputs >= players.length) {
				setValidWorkingTurn(true);
			}
		}
	}, [workingTurn, players]);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<StartupComp
				dialogOpen={showStartup}
				cancelFunction={() => setShowStartup(false)}
				confirmFunction={startGame}
			/>
			<DeletePlayersDialog
				dialogOpen={showPlayerDialog}
				cancelFunction={() => setShowPlayerDialog(false)}
				confirmFunction={newPlayers}
			/>
			<DeleteScoresDialog
				dialogOpen={showScoreDialog}
				cancelFunction={() => setShowScoreDialog(false)}
				confirmFunction={resetScores}
			/>
			<Container className="container">
				{players &&
					players.map((playerElement) => {
						return (
							<PlayerBox
								key={playerElement}
								playerName={playerElement}
								playerScore={currentScores ? currentScores[playerElement] : 0}
								isDealer={players[dealer] === playerElement}
								setPoints={setCurrentPoints}
								currentTurn={workingTurn}
							/>
						);
					})}
				<div style={{ flexGrow: 1 }}>
					{!showStartup && (
						<Grid container style={{ height: "100%", placeContent: "end", paddingBottom: "1em" }}>
							<Grid item xs={4}>
								<Button
									onClick={() => {
										setShowPlayerDialog(true);
									}}
									color="inherit"
									variant="text"
								>
									new players
								</Button>
							</Grid>
							<Grid item xs={4}>
								<Button
									onClick={() => {
										setShowScoreDialog(true);
									}}
									color="inherit"
									variant=""
								>
									reset scores
								</Button>
							</Grid>
							<Grid item xs={4}>
								<Button
									onClick={addTurn}
									color="inherit"
									variant="outlined"
									disabled={!validWorkingTurn}
								>
									end round
								</Button>
							</Grid>
						</Grid>
					)}
				</div>
			</Container>
		</ThemeProvider>
	);
}

export default App;
