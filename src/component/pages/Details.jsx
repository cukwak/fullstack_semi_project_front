import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Container } from "react-bootstrap";
import { Button } from "react-bootstrap";

function Details() {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.data; // 안전하게 data를 가져오기
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getDetails = async () => {
            if (!data) return; // data가 없으면 종료
            try {
                const response = await api.post('mv/details', data);
                setDetails(response.data); // 응답 데이터 저장
            } catch (err) {
                console.error('Error fetching details:', err);
                setError('Failed to fetch details. Please try again later.'); // 에러 메시지 설정
            } finally {
                setLoading(false); // 로딩 상태 종료
            }
        };

        getDetails();
    }, [data]);

    if (loading) {
        return <div>Loading...</div>; // 로딩 중 표시
    }

    if (error) {
        return <div>{error}</div>; // 에러 발생 시 표시
    }

    if (!details) {
        return <div>No details available.</div>; // details가 null일 때
    }

    const like = async () => {
        const response = await api.post('users/like', data)
    }

    const dislike = async () => {
        const response = await api.post('users/dislike', data)
    }

    const backToMain = () => {
        navigate('/');
    }

    const cleanText = details.title?.replace(/!HS/g, "").replace(/!HE/g, "").trim() || "Unknown Title";
    const formattedDate = `${details.repRlsDate?.slice(0, 4) || '----'}-${details.repRlsDate?.slice(4, 6) || '--'}-${details.repRlsDate?.slice(6) || '--'}`;
    const directorNames = details.directors.director.map(d => d.directorNm).join(", ");
    const actors = details.actors.actor.slice(0, 10).map(d => d.actorNm).join(", ") || "";
    const plot = details.plots.plot[0]?.plotText || "No plot available";
    const Url = details.posters.split('|', 20);
    return (
        <>
            <Button onClick={backToMain}> Back </Button>
        <Container>
            <img src={Url[0]}/>
            <h1>{cleanText}</h1>
            <p>Release Date: {formattedDate}</p>
            <p>감독 : {directorNames}</p>
            <p>출연 : {actors}</p>
            <p>시놉시스 : {plot}</p>
        <Button  variant="primary" >Like</Button>
        <Button  variant="danger" >DisLike</Button>
        </Container>
        </>
        
    );
}

export default Details;
