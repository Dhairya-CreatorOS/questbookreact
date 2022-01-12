import styled from "styled-components";
import React from "react";
import Button from "../Components/Button";

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items: center;
`

async function fetchJSON() {
    console.log('Fetching JSON')

    let url = 'https://random-data-api.com/api/crypto_coin/random_crypto_coin'
    let headers = {'method': 'GET', 'headers': {'Content-Type': 'application/json'}}
    let response = await fetch(url, headers)

    if (response.status == 200) {
        let data = await response.json()
        console.log(data)

        // const file = {
        //     path: 'file_upload.txt',
        //     content: 'ABC'
        //   }
    }
}

const IPFS = () => {
    return (
        <Container>
            <Button text="Fetch JSON and upload to IPFS" onClick={fetchJSON}/>
        </Container>
    );
}

export default IPFS;