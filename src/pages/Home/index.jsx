import styles from './Home.module.scss';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';

import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import Grid from '@mui/material/Grid';

import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock';
import { fetchPosts, fetchPopular, fetchTags } from '../../store/slices/posts';
import { TabContext, TabList } from '@mui/lab';

export const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.data);
    const { posts, popular, tags } = useSelector((state) => state.posts);
    const [value, setValue] = useState('new');

    const isPostLoading = posts.status === 'loadind';
    const isPopularLoading = popular.status === 'loadind';
    const isTagsLoading = tags.status === 'loadind';

    const handleChange = (event, newValue) => {
        event.preventDefault();
        setValue(newValue);
    };

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchPopular());
        dispatch(fetchTags());
    }, [dispatch]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <TabContext value={value}>
                        <TabList
                            onChange={handleChange}
                            aria-label='Tabs example'>
                            <Tab label='New' value='new' />
                            <Tab label='Popular' value='popular' />
                        </TabList>

                        <TabPanel value='new'>
                            <Grid xs={8} item>
                                {(isPostLoading
                                    ? [...Array(5)]
                                    : posts.items
                                ).map((obj, ind) =>
                                    isPostLoading ? (
                                        <Post key={ind} isLoading={true} />
                                    ) : (
                                        <Post
                                            key={ind}
                                            id={obj._id}
                                            title={obj.title}
                                            imageUrl={
                                                obj.imageUrl
                                                    ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                                                    : ''
                                            }
                                            user={obj.user}
                                            createdAt={format(
                                                new Date(obj.createdAt),
                                                'MMMM do, yyyy',
                                            )}
                                            viewsCount={obj.viewsCount}
                                            commentsCount={3}
                                            tags={obj.tags}
                                            isEditable={
                                                userData?.userData?._id ===
                                                obj.user?._id
                                            }
                                        />
                                    ),
                                )}
                            </Grid>
                        </TabPanel>
                        <TabPanel value='popular'>
                            <Grid xs={8} item>
                                {(isPopularLoading
                                    ? [...Array(5)]
                                    : popular.items
                                ).map((obj, ind) =>
                                    isPopularLoading ? (
                                        <Post key={ind} isLoading={true} />
                                    ) : (
                                        <Post
                                            key={ind}
                                            id={obj._id}
                                            title={obj.title}
                                            imageUrl={
                                                obj.imageUrl
                                                    ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                                                    : ''
                                            }
                                            user={obj.user}
                                            createdAt={format(
                                                new Date(obj.createdAt),
                                                'MMMM do, yyyy',
                                            )}
                                            viewsCount={obj.viewsCount}
                                            commentsCount={3}
                                            tags={obj.tags}
                                            isEditable={
                                                userData?.userData?._id ===
                                                obj.user?._id
                                            }
                                        />
                                    ),
                                )}
                            </Grid>
                        </TabPanel>
                    </TabContext>
                </div>

                <Grid className={styles.tags} xs={4} item>
                    <TagsBlock
                        items={tags.items}
                        isTagsLoading={isTagsLoading}
                    />
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    fullName: 'John Johnson',
                                    avatarUrl:
                                        'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Your comment',
                            },
                            {
                                user: {
                                    fullName: 'Jack Jackson',
                                    avatarUrl:
                                        'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'Mauris arcu dapibus justo tortor, molestie sodales integer elit. Luctus mauris habitasse velit sapien et in leo, est. Nisi hac in ut. In lectus',
                            },
                        ]}
                        isLoading={false}
                    />
                </Grid>
            </div>
        </>
    );
};
