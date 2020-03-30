import { css } from "@emotion/core";

const buildSpinnerCss = (color) => {
    return css`
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background-color: rgba(${color}, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
  `;
}

export default buildSpinnerCss;