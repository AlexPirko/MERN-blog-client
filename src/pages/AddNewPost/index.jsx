import styles from './AddNewPost.module.scss';

import { useState, useCallback, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';

import { userIsAuth } from '../../store/slices/auth';
import axios from '../../axios';

export const AddNewPost = () => {
    const isAuth = useSelector(userIsAuth);

    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const inputFileRef = useRef(null);

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

    const onClickRemoveImage = () => {};

    const onChange = useCallback((value) => {
        setValue(value);
    }, []);

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
            <SimpleMDE className={styles.editor} value={value} onChange={onChange} options={options} />
            <div className={styles.buttons}>
                <Button size='large' variant='contained'>
                    Publish
                </Button>
                <a href='/'>
                    <Button size='large'>Cancel</Button>
                </a>
            </div>
        </Paper>
    );
};
