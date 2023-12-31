import { SideBlock } from './SideBlock';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import TagIcon from '@mui/icons-material/Tag';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';

export const TagsBlock = ({ items, isLoading }) => {
    return (
        <SideBlock title='Tags'>
            <List>
                {items.map((name, ind) => (
                    <a key={ind} style={{ textDecoration: 'none', color: 'black' }} href={`/tags/${name}`}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TagIcon />
                                </ListItemIcon>
                                {isLoading ? <Skeleton width={100} /> : <ListItemText primary={name} />}
                            </ListItemButton>
                        </ListItem>
                    </a>
                ))}
            </List>
        </SideBlock>
    );
};
