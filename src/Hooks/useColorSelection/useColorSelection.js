import React, { useState } from 'react';

import { SwatchesPicker } from 'react-color';

const max = 255;
const min = 0;

const randomise = ()=> Math.floor(Math.random() * (max - min + 1) + min);

export const getRandomColor = () => {

    const r = randomise();
    const g = randomise();
    const b = randomise();

    return `${r}, ${g}, ${b}`;
}


const useColorSelection = () => {
    const [color, addColor] = useState(null);

    const swatchColor = (color, event) => {
        const selColor = `${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}`
        addColor(selColor);
        return true;
    }

    const randomColor = () => {
        const selColor = getRandomColor();
        addColor(selColor);
    }

    const showColorPickerComponent = () => (
        <SwatchesPicker
            onChangeComplete={swatchColor}
        />
    )

    return {
        color,
        randomColor,
        showColorPickerComponent
    }


}

export default useColorSelection;