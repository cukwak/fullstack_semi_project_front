
import { useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Cards from "./Cards";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";


function Specifics() {

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state.data;

    const backToMain = () => {
        navigate('/');
    }
    console.log(data);
    
    /*

    size등 으로 개수 받아서 for문으로 return 밑에 카드이용

    */

    return (
        <div>
            <Button onClick={backToMain}> Back </Button>
            <div>

            { data.map( (movie, index) => {
                const directorNames = movie.directors.director.map(d => d.directorNm).join(", ");
                return (
                    <Cards
                    key = {index}
                    title = {`${movie.title}`}
                    // directors = {`${movie.directors}`}
                    directors = {directorNames}
                    poster = {`${movie.posters}`}
                    plots = {`${movie.plots}`}
                    actors = {`${movie.actors}`}
                    releaseDate = {`${movie.repRlsDate}`}
                    />
                )
            })
        }    

            </div>
        </div>
      );
}

export default Specifics;