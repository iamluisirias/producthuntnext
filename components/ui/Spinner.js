import React from 'react';
import Layout from '../layout/Layout';
import { css } from '@emotion/react';


const Spinner = () => {
    return (
        <Layout>
            <div css={css`
                display: grid;
                place-items: center;
                margin-top: 5rem;

            `}>
                <div className="lds-ripple"><div></div><div></div></div>
            </div>
        </Layout>
    );
};

export default Spinner;