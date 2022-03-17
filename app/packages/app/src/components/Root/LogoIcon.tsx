/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  svg: {
    width: 'auto',
    height: 28,
  },
  path: {
    // fill: '#0078D4',
    fill: '#7df3e1',
  },
});

const LogoIcon = () => {
  const classes = useStyles();

  return (
    <svg className={classes.svg} viewBox="0 0 460 460" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" >
      <g id="contoso" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Group" className={classes.path} transform="translate(-0.500000, 0.000000)">
          <path d="M230,0 C357.025492,0 460,102.974508 460,230 C460,357.025492 357.025492,460 230,460 C102.974508,460 0,357.025492 0,230 C0,102.974508 102.974508,0 230,0 Z M367.56284,253.638122 C363.738986,267.662854 358.039972,281.415232 350.430079,294.595953 C302.79552,377.101431 197.296175,405.369895 114.790697,357.735335 C101.622188,350.132493 89.782566,341.048302 79.4614134,330.831178 C91.8884977,359.414155 113.253817,384.408322 142.318081,401.188583 C214.445511,442.831374 306.674498,418.118692 348.317289,345.991262 C365.086367,316.946368 371.082238,284.57753 367.56284,253.638122 Z M217.002697,54.7966428 C186.035571,51.2673248 153.707327,57.2731507 124.643063,74.0534113 C52.5156331,115.696202 27.8029505,207.92519 69.4457416,280.05262 C86.2148189,309.097513 111.249119,330.474509 139.803131,342.896325 C129.569284,332.572404 120.508882,320.760724 112.898989,307.580004 C65.2644298,225.074526 93.5328941,119.575181 176.038372,71.9406214 C189.206881,64.337779 202.993832,58.6264612 217.002697,54.7966428 Z M230,132.358491 C176.074083,132.358491 132.358491,176.074083 132.358491,230 C132.358491,283.925917 176.074083,327.641509 230,327.641509 C283.925917,327.641509 327.641509,283.925917 327.641509,230 C327.641509,176.074083 283.925917,132.358491 230,132.358491 Z M272.311321,73.7735849 C238.773166,73.7735849 207.742995,84.7654271 182.70838,103.283019 C196.766082,99.5822076 211.525498,97.6415094 226.745283,97.6415094 C322.014402,97.6415094 399.245283,174.87239 399.245283,270.141509 C399.245283,285.347194 397.297954,300.142703 393.610241,314.189645 C412.150284,289.135986 423.113208,258.135993 423.113208,224.575472 C423.113208,141.289889 355.596903,73.7735849 272.311321,73.7735849 Z" id="Combined-Shape" />
        </g>
      </g>
    </svg >
  );
};

export default LogoIcon;
