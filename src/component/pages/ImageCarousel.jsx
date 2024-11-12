import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ImageCarousel = ({ Url }) => {
    return (
        <Carousel>
            {Url.map((url, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={url}
                        alt={`Slide ${index + 1}`}
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;
