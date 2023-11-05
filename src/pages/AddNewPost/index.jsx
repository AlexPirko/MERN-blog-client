import styles from './AddNewPost.module.scss';

import { useState, useCallback, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';

export const AddNewPost = () => {
    const imageUrl = '';
    const [value, setValue] = useState('');

    const handleChangeFile = () => {};

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

    return (
        <Paper style={{ padding: 30 }}>
            <Button variant='outlined' size='large'>
                Load preview
            </Button>
            <input type='file' onChange={handleChangeFile} hidden />
            {imageUrl && (
                <Button variant='contained' color='error' onClick={onClickRemoveImage}>
                    Delete
                </Button>
            )}
            {imageUrl && <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt='Uploaded' />}
            <br />
            <br />
            <TextField classes={{ root: styles.title }} variant='standard' placeholder='Header...' fullWidth />
            <TextField classes={{ root: styles.tags }} variant='standard' placeholder='Tags' fullWidth />
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
