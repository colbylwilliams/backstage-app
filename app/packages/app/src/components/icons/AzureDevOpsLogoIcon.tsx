import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    svg: {
        width: 'auto',
        height: 42,
    },
    path: {
        fill: '#0078D7',
    },
});

export const AzureDevOpsLogoIcon = () => {
    const classes = useStyles();

    return (
        <svg className={classes.svg} viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
            <title>Azure DevOps</title>
            <defs>
                <linearGradient x1="50%" y1="99.6878901%" x2="50%" y2="0.187265918%" id="linearGradient-1">
                    <stop stopColor="#0078D4" offset="0%" />
                    <stop stopColor="#1380DA" offset="16%" />
                    <stop stopColor="#3C91E5" offset="53%" />
                    <stop stopColor="#559CEC" offset="82%" />
                    <stop stopColor="#5EA0EF" offset="100%" />
                </linearGradient>
            </defs>
            <g id="Azure-DevOps" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(2.000000, 4.000000)" fill="url(#linearGradient-1)" fillRule="nonzero" id="a91f0ca4-8fb7-4019-9c09-0a52e2c05754">
                    <path d="M52.7058824,9.88235294 L52.7058824,41.9670588 L39.5294118,52.7717647 L19.1058824,45.3270588 L19.1058824,52.7058824 L7.54352941,37.5858824 L41.2423529,40.2211765 L41.2423529,11.3317647 L52.7058824,9.88235294 Z M41.4729412,11.4964706 L22.5647059,0 L22.5647059,7.54352941 L5.20470588,12.6494118 L0,19.3364706 L0,34.5223529 L7.44470588,37.8164706 L7.44470588,18.3482353 L41.4729412,11.4964706 Z" />
                </g>
            </g>
        </svg>
    );
};