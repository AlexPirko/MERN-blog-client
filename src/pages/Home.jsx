import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../store/slices/posts';

export const Home = () => {
    const dispatch = useDispatch();
    const { posts, tags } = useSelector((state) => state.posts);

    const isPostLoading = posts.status === 'loadind';
    const isTagsLoading = tags.status === 'loadind';

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, [dispatch]);

    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label='basic tabs example'>
                <Tab label='New' />
                <Tab label='Popular' />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(isPostLoading ? [...Array(5)] : posts.items).map((obj, ind) =>
                        isPostLoading ? (
                            <Post key={ind} isLoading={true} />
                        ) : (
                            <Post
                                key={ind}
                                id={obj._id}
                                title={obj.title}
                                imageUrl='https://cdn.pixabay.com/photo/2023/10/27/23/10/mountain-8346389_1280.jpg'
                                user={obj.user}
                                createdAt={obj.createdAt}
                                viewsCount={obj.viewsCount}
                                commentsCount={3}
                                tags={obj.tags}
                                isEditable
                            />
                        ),
                    )}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags.items} isTagsLoading={isTagsLoading} />
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'John Johnson',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Your comment',
                            },
                            {
                                user: {
                                    fullName: 'Jack Jackson',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'Mauris arcu dapibus justo tortor, molestie sodales integer elit. Luctus mauris habitasse velit sapien et in leo, est. Nisi hac in ut. In lectus',
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </>
    );
};
