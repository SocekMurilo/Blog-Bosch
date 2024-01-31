import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Container
} from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons/ai'
import styles from './styles.module.scss';
import axios from 'axios';
export default function Post() {
    var [page, setPage] = useState(1);
    var [artigos, setArtigos] = useState([]);
    async function getPosts() {
        const res = await axios.get(`http://localhost:8080/api/article/${page}`)
        setArtigos(res.data)
    }
    useEffect(() => {
        getPosts();
    }, [page])
    async function handleClick(id) {
        await axios.post(`http://localhost:8080/api/article/like/${id}`)
        getPosts();
    }
    function handleUp() {
        if (artigos.length === 5) {
            setPage(++page)
        }
    }
    function handleDown() {
        if (page > 1) {
            setPage(--page)
        }
    }
    const RenderPosts = () => {
        return artigos.map((artigo) => {
            return (
                <Card key={artigo._id} className={styles.card} >
                    <Card.Title className={styles.card__title}>
                        {artigo.title}
                    </Card.Title>
                    <Card.Body className={styles.card__body}>
                        <Card.Text className={styles.card__body__article}>{artigo.text}</Card.Text>
                        <div className='d-flex align-items-center '>
                            {artigo.likes}<Button variant='light' onClick={() => handleClick(artigo._id)}><AiOutlineLike /></Button>
                        </div>
                    </Card.Body>
                </Card>
            )
        })
    }
    return (
        <Container>
            <RenderPosts />
            <Button onClick={handleDown}>-</Button>
            {page}
            <Button onClick={handleUp}>+</Button>
        </Container>
    )
}

