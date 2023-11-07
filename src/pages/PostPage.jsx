import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from '../axios';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

export const PostPage = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setData(res.data);
                setIsLoading(false);
            })
            .catch((err) => console.warn(err));
    }, [id]);

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost />;
    }

    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={`${process.env.REACT_APP_API_URL}${data.imageUrl}`}
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={3}
                tags={data.tags}
                isFullPost>
                <ReactMarkdown children={data.text} />
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: 'John Johnson',
                            avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'Tempus sit consectetur platea nec libero, in lectus dui mattis leo, ipsum malesuada lectus integer lorem arcu lectus mauris non dictum tempus',
                    },
                    {
                        user: {
                            fullName: 'Jack Jackson',
                            avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                        },
                        text: 'Nisi hac in ut. In lectus dictumst. Mattis arcu amet morbi sed integer et lectus vitae eleifend mattis tempus luctus lacinia eleifend nunc mattis nec faucibus. Sodales amet tempus risus ex',
                    },
                ]}
                isLoading={false}>
                <Index />
            </CommentsBlock>
        </>
    );
};
