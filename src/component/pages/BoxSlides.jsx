import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import api from '../api/axios';
import ImageCarousel from './ImageCarousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function BoxSlides(props) {
    
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const {title, release} = props;
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const releaseDate = release.replace(/-/g, "");

    const data = {
        title : title,
        release : releaseDate
    }

    useEffect(() => {
        getSlides();
    }, []);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

        const getSlides = async () => {
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

    if (loading) {
        return <div>Loading...</div>; // 로딩 중 표시
    }

    if (error) {
        return <div>{error}</div>; // 에러 발생 시 표시
    }

    const cleanText = details.title.replace(/!HS/g, "").replace(/!HE/g, "").trim();
    const Url = details.posters.split('|', 20);
    const firstImages = Url.map((url) => url).slice(0, 1);

    const moveToDetails = () => {
        navigate(`/Details/${cleanText}`, {state: {data : data} });
    }


return (
    <>
            <img src={Url[0]} onClick={moveToDetails}/>
    </>
);
}     

export default BoxSlides;