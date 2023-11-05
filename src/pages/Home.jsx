import { useEffect } from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';


export const Home = () => {

useEffect(() => {

}, [])

    return (
        <>
            <Tabs style={{ marginBottom: 15 }} value={0} aria-label='basic tabs example'>
                <Tab label='New' />
                <Tab label='Popular' />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {[...Array(5)].map((_, ind) => (
                        <Post
                            key={ind}
                            id={1}
                            title='My Post #1 | Mauris arcu dapibus'
                            imageUrl='https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
                            user={{
                                avatarUrl:
                                    'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                                fullName: 'Keff',
                            }}
                            createdAt={'12 june 2022'}
                            viewsCount={150}
                            commentsCount={3}
                            tags={['react', 'fun', 'typescript']}
                            isEditable
                        />
                    ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={['react', 'typescript', 'note']} isLoading={false} />
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
