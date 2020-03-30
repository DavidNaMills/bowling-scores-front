export const PORT = '7800';
// export const BASE = `http://localhost:${PORT}`;
export const BASE = `https://www.bowling-scores.com`;


const ACCESS = 'access'
export const LOGIN = `${BASE}/${ACCESS}/login`;
export const JWT_LOGIN = `${BASE}/${ACCESS}/jwt-login`;
export const SIGNUP = `${BASE}/${ACCESS}/signup`;

// /game/personalGames
const GAME = 'game';
export const NEW_GAME = `${BASE}/${GAME}/newGame`;
export const ADD_FRAME = `${BASE}/${GAME}/addFrame`;
export const ADD_PLAYER_URL = `${BASE}/${GAME}/addPlayer`;
export const PERSONAL_GAMES = `${BASE}/${GAME}/personalGames`;
export const UPDATE_GAME_SCORES = `${BASE}/${GAME}/updateScores`;
export const REMOVE_PLAYER_URL = `${BASE}/${GAME}/removePlayer`;

const USER = 'user';
export const IS_UNIQUE_USER = `${BASE}/${USER}/userUnique`