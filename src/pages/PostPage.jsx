import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';

export const PostPage = () => {
    return (
        <>
            <Post
                id={1}
                title='My post #1 | Mauris arcu dapibus'
                imageUrl='https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
                user={{
                    avatarUrl:
                        'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                    fullName: 'Keff',
                }}
                createdAt={'12 june 2022 г.'}
                viewsCount={150}
                commentsCount={3}
                tags={['react', 'fun', 'typescript']}
                isFullPost>
                <p>
                    Mauris arcu dapibus justo tortor, molestie sodales integer elit. Luctus mauris habitasse velit
                    sapien et in leo, est. Nisi hac in ut. In lectus dictumst. Mattis arcu amet morbi sed integer et
                    lectus vitae eleifend mattis tempus luctus lacinia eleifend nunc mattis nec faucibus. Sodales amet
                    tempus risus ex. Amet vulputate dui ut.
                </p>
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
