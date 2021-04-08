import { css } from '@emotion/react';
import React from 'react';

const Error404 = ({mensaje}) => {
    return (
        <div>
           <h1
            css={css`
                text-align: center;
                margin-top: 5rem;
            `}
           >{mensaje}</h1> 
        </div>
    );
};

export default Error404;