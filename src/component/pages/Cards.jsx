
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


function Cards(props) {

    const code = null;
    const navigate = useNavigate();
    const {title, directors, poster, plots, releaseDate} = props;

    const Url = poster.split('|', 20);
    const cleanText = title.replace(/!HS/g, "").replace(/!HE/g, "").trim();

    const formattedDate = `${releaseDate.slice(0, 4)}-${releaseDate.slice(4, 6)}-${releaseDate.slice(6)}`;
    console.log(releaseDate);
    const moveToDetails = () => {
        const data = {
            title : cleanText,
            release : releaseDate
        }
        navigate(`/Details/${cleanText}`, {state: {data : data} });
    }

    return(
        <>
        <Stack direction="horizontal" gap={3}>
            <div onClick={moveToDetails}>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={Url[0]} />
            <Card.Body>
                <Card.Title>{cleanText}</Card.Title>
                <Card.Text>
                    {directors} <br/>
                    {formattedDate}
                </Card.Text>
            </Card.Body>
            </Card>
            </div>
        </Stack>
    </>
    );
}

export default Cards;