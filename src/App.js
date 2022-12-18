import "./App.css";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { Button, Container, Grid } from "@mui/material";
import { PlayerBox } from "./playerBox.comp";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StartupComp } from "./startupComp";
import { EndGameDialog } from "./endgame.comp";
import { DeletePlayersDialog } from "./confirm.players.comp";
import { DeleteScoresDialog } from "./confirm.scores.comp";
import { MenuDialog } from "./menu.comp";
import MenuIcon from "@mui/icons-material/Menu";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	const [cookies, setCookie, removeCookie] = useCookies(["seven-card-game"]);
	const [players, setPlayers] = useState();
	const [dealer, setDealer] = useState();
	const [turns, setTurns] = useState();
	const [currentScores, setCurrentScores] = useState();
	const [workingTurn, setWorkingTurn] = useState();
	const [validWorkingTurn, setValidWorkingTurn] = useState(false);
	const [showStartup, setShowStartup] = useState(false);
	const [showPlayerDialog, setShowPlayerDialog] = useState(false);
	const [showScoreDialog, setShowScoreDialog] = useState(false);
	const [newTurn, setNewTurn] = useState();
	const maxPoints = 500;
	const cookieSaveTime = 157784760;
	const [showEndGame, setShowEndGame] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [emptyMenu, setEmptyMenu] = useState(false);

	useEffect(() => {
		if (!cookies["players"]) {
			setEmptyMenu(true);
			setMenuOpen(true);
		} else {
			setEmptyMenu(false);
			setPlayers(cookies["players"]);
			setTurns(cookies["turns"]);
			setDealer(parseInt(cookies["dealer"]));
		}
	}, [cookies]);

	useEffect(() => {
		if (emptyMenu === true && showStartup === false && !players) {
			setMenuOpen(true);
		}
	}, [emptyMenu, showStartup, players]);

	useEffect(() => {
		if (turns !== undefined) {
			setCookie("turns", JSON.stringify(turns), { maxAge: cookieSaveTime });
			setEmptyMenu(false);
		}
	}, [turns, setCookie]);

	useEffect(() => {
		if (players !== undefined) {
			setCookie("players", JSON.stringify(players), { maxAge: cookieSaveTime });
			setEmptyMenu(false);
		}
	}, [players, setCookie]);

	useEffect(() => {
		if (dealer !== undefined) {
			setCookie("dealer", JSON.stringify(dealer), { maxAge: cookieSaveTime });
			setEmptyMenu(false);
		}
	}, [dealer, setCookie]);

	useEffect(() => {
		if (currentScores) {
			for (const [key, value] of Object.entries(currentScores)) {
				if (value >= maxPoints && key) {
					setShowEndGame(true);
				}
			}
		}
	}, [currentScores]);

	useEffect(() => {
		if (turns) {
			let tempNewTurn = 0;
			for (const [key, value] of Object.entries(turns)) {
				if (key || value) {
					// this is really just here to stop the linter from complaining
					tempNewTurn += 1;
				}
			}
			setNewTurn(tempNewTurn);
		}
	}, [turns]);

	useEffect(() => {
		if (players) {
			let currentScores = {};
			for (const [turnKey, turnValue] of Object.entries(turns)) {
				for (const [nameKey, nameValue] of Object.entries(turnValue)) {
					if (nameKey in currentScores && players.includes(nameKey)) {
						currentScores[nameKey] += nameValue;
					} else if (players.includes(nameKey)) {
						currentScores[nameKey] = nameValue;
					} else if (turnKey) {
						// stop linter from complaining
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

			let tempTurns = { ...turns };
			tempTurns[newTurn] = workingTurn;
			setTurns(tempTurns);
			setWorkingTurn();
		});
		let nextDealer = parseInt(dealer);
		nextDealer++;
		if (nextDealer === players.length) {
			setDealer(0);
		} else {
			setDealer(parseInt(nextDealer));
		}
		setValidWorkingTurn(false);
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
		setMenuOpen(false);
		setEmptyMenu(false);
	}

	function newPlayers() {
		setMenuOpen(false);
		removeCookie("turns");
		removeCookie("dealer");
		removeCookie("players");
		setShowStartup(true);
		setPlayers();
		setTurns();
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

	function endGame() {
		setShowEndGame(false);
		setShowScoreDialog(true);
	}

	function showScoreReset() {
		setShowScoreDialog(true);
		setMenuOpen(false);
	}

	function showPlayerReset() {
		setShowPlayerDialog(true);
		setMenuOpen(false);
	}

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<StartupComp
				dialogOpen={showStartup}
				cancelFunction={() => setShowStartup(false)}
				confirmFunction={startGame}
			/>
			<EndGameDialog
				dialogOpen={showEndGame}
				cancelFunction={() => setShowEndGame(false)}
				confirmFunction={endGame}
				currentScores={currentScores}
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
			<MenuDialog
				dialogOpen={menuOpen}
				cancelFunction={() => setMenuOpen(false)}
				clickScores={showScoreReset}
				clickPlayers={showPlayerReset}
				emptyMenu={emptyMenu}
				directNew={newPlayers}
			/>
			<Container className="container" style={{ minHeight: "576px" }}>
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
					{!showStartup && !emptyMenu && (
						<Grid container style={{ height: "100%", placeContent: "end", paddingBottom: "1em" }}>
							<Grid item xs={6}>
								<Button onClick={() => setMenuOpen(true)} color="inherit">
									<MenuIcon />
									Menu
								</Button>
							</Grid>
							<Grid item xs={6}>
								<Button
									onClick={addTurn}
									color="inherit"
									variant="outlined"
									disabled={!validWorkingTurn}
								>
									end round {newTurn}
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
