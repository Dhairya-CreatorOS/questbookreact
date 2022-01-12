import React from 'react';
import styled from 'styled-components';

const ButtonComp = styled.button`
    /* @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap'); */
    width: 184px;
    height: 64px;

    background: #FFFFFF;
    border: 1px solid #000000;
    box-sizing: border-box;
    box-shadow: 0px 2px 0px #000000;
    border-radius: 8px;
    
    font-family: Roboto Mono;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;

    margin-top: 25px;
    margin-bottom: 25px;
`

const Button = ({text, onClick}) => {
    return (<ButtonComp onClick={onClick}>{text}</ButtonComp>)
}

export default Button;
