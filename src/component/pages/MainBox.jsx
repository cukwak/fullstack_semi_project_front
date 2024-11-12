
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import api from '../api/axios';
import BoxSlides from './BoxSlides';
import Spinner from 'react-bootstrap/Spinner';

function MainBox() {
    const [index, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [boxOffice, setBoxOffice] = useState(null);



    useEffect( () => {
        getBoxoffice();
    }, [] )


    console.log("mainbox called");
    const getBoxoffice = async () => {
        try {
            const response = await api.get(`mv/boxOffice`)
            console.log(response.data);
            setBoxOffice(response.data);

        } catch (err) {
            console.log(err);
        }finally {
            setLoading(false); // 로딩 상태 종료
        }
    }
    if (loading) {
        return <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>; // 로딩 중 표시
    }

    if (error) {
        return <div>{error}</div>; // 에러 발생 시 표시
    }

    console.log(`${boxOffice.movieNm}`);
    

    return (
        <>
            <h3>weekly boxoffice</h3>
            <div>
                { boxOffice.map( (box, index) =>{
                    return(
                        <BoxSlides
                        key = {index}
                        title={`${box.movieNm}`}
                        release={`${box.openDt}`}
                        />
                    );
                })}
            </div>
        </>
    );
}

export default MainBox;