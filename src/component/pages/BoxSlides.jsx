import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function BoxSlides(props) {

    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const { title, release, audiAcc } = props;
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const releaseDate = release.replace(/-/g, "");

    const data = {
        title: title,
        release: releaseDate,
        audiAcc: audiAcc
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

    const decodeHtmlEntities = (text) => {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    };

    const cleanText = details.title && typeof details.title === 'string'
        ? decodeHtmlEntities(details.title.replace(/!HS/g, "").replace(/!HE/g, "").trim())
        : details.title;

    const Url = (details.posters && typeof details.posters === 'string')
        ? details.posters.split('|', 20)
        : [];  // details.posters가 없거나 문자열이 아니면 빈 배열로 대체

    const firstImages = Url.map((url) => url).slice(0, 1);

    const moveToDetails = () => {
        navigate(`/Details/${cleanText}`, { state: { data: data } });
    }

    const formattedDate = release.replace(/-/g, ".");

    return (
        <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '30px',
            padding: '30px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            cursor: 'pointer',
            width: '100%',
            height: '500px'
        }} onClick={moveToDetails}>
            <img 
                src={Url[0]} 
                style={{ 
                    width: '300px', 
                    height: '450px', 
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }} 
            />
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px',
                flex: 1
            }}>
                <h3 style={{ 
                    margin: 0, 
                    color: '#ffffff',
                    fontSize: '32px',
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    {cleanText}
                </h3>
                <p style={{ 
                    margin: 0, 
                    color: '#cccccc',
                    fontSize: '20px'
                }}>
                    개봉일: {formattedDate}
                </p>
                <p style={{ 
                    margin: 0, 
                    color: '#cccccc',
                    fontSize: '20px'
                }}>
                    관객수: {audiAcc}
                </p>
            </div>
        </div>
    );
}

export default BoxSlides;