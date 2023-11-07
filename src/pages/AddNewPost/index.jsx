import styles from './AddNewPost.module.scss';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';

import { userIsAuth } from '../../store/slices/auth';
import axios from '../../axios';

export const AddNewPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(userIsAuth);

    // eslint-disable-next-line no-unused-vars
    const [isLoading, setIsLoading] = useState(false);
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const inputFileRef = useRef(null);

    const isEditing = Boolean(id);

    const handleChangeFile = async (e) => {
        try {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (error) {
            console.warn(error);
            alert('Failed upload!');
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onSubmit = async () => {
        try {
            setIsLoading(true);

            console.log(id);

            const fields = { title, text, tags, imageUrl };

            const { data } = isEditing ? await axios.patch(`/posts/${id}`, fields) : await axios.post('/posts', fields);

            const _id = isEditing ? id : data._id;

            navigate(`/posts/${_id}`);
        } catch (error) {
            console.warn(error);
            alert('Failed submit!');
        }
    };

    const onChange = useCallback((value) => {
        setText(value);
    }, []);

    useEffect(() => {
        if (id) {
            axios
                .get(`/posts/${id}`)
                .then(({ data }) => {
                    setTitle(data.title);
                    setText(data.text);
                    setTags(data.tags);
                    setImageUrl(data.imageUrl);
                })
                .catch((err) => {
                    console.warn(err);
                    alert('Post not found!');
                });
        }
    }, [id]);

    const options = useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Enter text...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    if (!window.localStorage.getItem('token') && !isAuth) {
        return <Navigate to='/' />;
    }

    return (
        <Paper style={{ padding: 30 }}>
            <Button onClick={() => inputFileRef.current.click()} variant='outlined' size='large'>
                Load preview
            </Button>
            <input ref={inputFileRef} type='file' onChange={handleChangeFile} hidden />
            {imageUrl && (
                <>
                    <Button variant='contained' color='error' onClick={onClickRemoveImage}>
                        Delete
                    </Button>
                    <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt='Uploaded' />
                </>
            )}
            <br />
            <br />
            <TextField
                classes={{ root: styles.title }}
                variant='standard'
                placeholder='Header...'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
            />
            <TextField
                classes={{ root: styles.tags }}
                variant='standard'
                placeholder='Tags'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                fullWidth
            />
            <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
            <div className={styles.buttons}>
                <Button onClick={onSubmit} size='large' variant='contained'>
                    {!isEditing ? 'Publish' : 'Save'}
                </Button>
                <a href='/'>
                    <Button size='large'>Cancel</Button>
                </a>
            </div>
        </Paper>
    );
};
