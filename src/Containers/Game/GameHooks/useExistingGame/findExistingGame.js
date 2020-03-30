import { readFromLocalStorage } from '../../../../helpers/localStorage/localStorage';
import { LOCAL_STORAGE_FILE } from '../../../../consts/localStorageFilename';

const findExistingGame = (user, ref) => {
    // const useExistingGame = (user, ref) => {
    // if (!ref) {
    const id = user.user && user.user._id ? user.user._id : null;

    // const getResult = (id) => {
    const hasExistingGame = readFromLocalStorage(LOCAL_STORAGE_FILE);

    // if (!hasChecked.current) {
    if (hasExistingGame) {
        const parsed = JSON.parse(hasExistingGame);
        // situation 1: continue game || cancel
        if (!id && !parsed.loggedIn) {
            return { type: 1, data: parsed };
        } else

            // situation 2: user logged in but no loggedIn
            if (id && !parsed.loggedIn) {
                return { type: 3, data: parsed };
            } else

                // situation 3: user logged in and loggedIn matches
                if (id && parsed.loggedIn && parsed.loggedIn === id) {
                    return { type: 1, data: parsed };
                    // setRes(2);
                } else

                    // situation 4: user logged in but loggedIn doesnt match
                    if (id && parsed.loggedIn && parsed.loggedIn !== id) {
                        return { type: 4, data: null };
                        // setRes(4);
                    } else

                        // situation 5: user not logged in but loggedIn is present
                        if (!id && parsed.loggedIn) {
                            return { type: 2, data: parsed };
                            // setRes(5);
                        }
    }
    // }
}

export default findExistingGame;