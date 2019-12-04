import React from 'react';
import clixLogo from '../../assets/images/clixLogo.png'

const toolbar = () => {
    return (
        <div>
            <div style={{ textAlign: 'left', paddingTop: '.5%', paddingLeft: '.5%' }}>
                <img src={clixLogo} width={10} height={50} />
            </div>
            <hr
                style={{
                    color: 'gray'
                }}
            />
        </div>
    );
}

export default toolbar;