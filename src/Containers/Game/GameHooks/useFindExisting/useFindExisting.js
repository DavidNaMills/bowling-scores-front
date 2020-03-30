import findExistingGame from '../useExistingGame/findExistingGame';

const useFindExisting = ({makeToggle, existingGame, user, hasChecked}) =>{

    const checkForExisting = () => {
        const res = findExistingGame(user, hasChecked.current);
        if (res) {
            existingGame.current = res.data;
            makeToggle(`popup${res.type}`);
        }
    }

    return {
        checkForExisting
    }
}

export default useFindExisting;