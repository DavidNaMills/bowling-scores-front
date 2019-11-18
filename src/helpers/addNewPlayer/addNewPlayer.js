export const addNewPlayer = (gameObj, newPlayer) =>{
            const tempState = JSON.parse(JSON.stringify(gameObj));
            tempState.players[newPlayer._id] = {
                name: newPlayer.name,
                color: newPlayer.color
            }
            return tempState;
}