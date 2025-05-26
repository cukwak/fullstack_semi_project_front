import { useCallback, useEffect, useMemo, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner';
import api from '../api/axios';
import BoxSlides from './BoxSlides';

function MainBox() {
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [boxOffice, setBoxOffice] = useState(null);

    const getBoxoffice = useCallback(async () => {
        try {
            const response = await api.get(`mv/boxOffice`);
            console.log(response.data);
            setBoxOffice(response.data);
        } catch (err) {
            console.error(err);
            setError('데이터를 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getBoxoffice();
    }, [getBoxoffice]);

    const handleSelect = useCallback((selectedIndex) => {
        setIndex(selectedIndex);
    }, []);

    const carouselItems = useMemo(() => {
        if (!boxOffice) return null;
        
        return boxOffice.map((box, idx) => (
            <Carousel.Item key={box.movieCd || idx} style={{ height: '500px' }}>
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: '100%',
                    padding: '20px'
                }}>
                    <BoxSlides
                        title={box.movieNm}
                        release={box.openDt}
                        audiAcc={box.audiAcc}
                    />
                </div>
            </Carousel.Item>
        ));
    }, [boxOffice]);

    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!boxOffice) {
        return <div>데이터가 없습니다.</div>;
    }

    return (
        <>
            <h3 style={{ color: '#333', marginBottom: '20px' }}>weekly boxoffice</h3>
            <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                <Carousel 
                    activeIndex={index} 
                    onSelect={handleSelect}
                    style={{ 
                        width: '100%',
                        height: '500px',
                        backgroundColor: '#1a1a1a',
                        borderRadius: '10px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }}
                >
                    {carouselItems}
                </Carousel>
            </div>
        </>
    );
}

export default MainBox;