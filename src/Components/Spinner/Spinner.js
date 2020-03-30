import React from "react";
import { css } from "@emotion/core";
import { PropagateLoader } from "react-spinners";

const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
}

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
`;

const defColor = '36, 69, 255'

const Spinner = ({ size = 20, css = override, color = defColor, center=false }) => {
    return (
        <div style={center ? centerStyle : null}>

            <PropagateLoader
                css={css}
                size={size}
                color={`rgb(${color})`}
                loading={true}
            />
        </div>
    );
}

export default Spinner;