import React, { useState } from 'react';

import { SwatchesPicker } from 'react-color';

export const getRandomColor = () => {
    const max = 255;
    const min = 0;

    const r = Math.floor(Math.random() * (max - min + 1) + min);
    const g = Math.floor(Math.random() * (max - min + 1) + min);
    const b = Math.floor(Math.random() * (max - min + 1) + min);

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