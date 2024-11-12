import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function FotoBlock() {
    const { id } = useParams(); // Витягує 'id' із URL
    const [fotos, setFotos] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/getfotos?id=${id}`)
            .then(response => response.json())
            .then(data => setFotos(data))
            .catch(error => console.error('Error fetching photos:', error));
    }, [id]);

    return (
        <div className="cont_foto">
            {fotos.map((foto, index) => (
                <div key={index} className={index === 0 ? 'active_cont' : 'useful_cont'}>
                    <img src={`http://127.0.0.1:8000/${fotos}`} alt={`Product Image ${index + 1}`} />
                </div>
            ))}
        </div>
    );
}

export default FotoBlock;
