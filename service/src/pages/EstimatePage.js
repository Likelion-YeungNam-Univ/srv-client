import { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../Cookies";
import styled from "styled-components"
import EstimateHead from "../components/Estimates/EstimateHead";
import EstimateBody from "../components/Estimates/EstimateBody";
import BidList from "../components/Estimates/BidList";
import OfferBid from "../components/Estimates/OfferBid";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const StyledEstimatePage = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledBody = styled.div`
    display: flex;
    justify-content: center;
`;

const EstimatePage = () =>{
    

    const [requests, setrequests] = useState([
        {id: 1, level: 15, name: "나문희", price: 30000, status: "미정", content: "", },
    ]);

    const nextId = useRef(1);

    const onInsert = useCallback(
        (price, content) => {
            const request = {
                id: nextId.current + 1,
                price,
                content,
            };
            console.log(price);
            console.log(content);

            setrequests(requests => requests.concat(request));
        },
        [requests],
    );

    /*
    const fetchData = useEffect(()=>{
        axios.get('/estimates',   
            {headers: {
                authorization: `Bearer ${getCookie("ACCESS_TOKEN")}`,
            }}
            ).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
            console.log(error);
        })
    
    }, []);
    */
    //console.log(fetchData);
    axios.get("/estimates/10/")
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    })

    return(
        <>
            <Header/>
            <Nav/>
        <StyledEstimatePage>

            <StyledBody>
                <EstimateHead/>
                <EstimateBody/>
            </StyledBody>
            
            <BidList requests={requests}/>
            
            <OfferBid onInsert={onInsert}/>
            
            
        </StyledEstimatePage>
            <Footer/>
        </>
    )
}

export default EstimatePage;