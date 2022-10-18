import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { TurnedInNot } from '@mui/icons-material';
import { 
    Grid, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
} from "@mui/material";
import { setActiveNote } from '../../store/journal/journalSlice';

export const SideBarItem = ({ id, title, body, date, imageUrls = [] }) => {
    const { notes } = useSelector(state => state.journal);
    const dispatch = useDispatch();
    
    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0, 17) + '....' : title
    }, [title]);

    const setNoteActive = () => {
      dispatch(setActiveNote({ id, title, body, date, imageUrls }));
    }

    return (
      <ListItem key={id} disablePadding onClick={ setNoteActive }>
        <ListItemButton>
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>
          <Grid container>
            <ListItemText primary={ newTitle } />
            <ListItemText
              secondary={ body }
            />
          </Grid>
        </ListItemButton>
      </ListItem>
    );
}

SideBarItem.propTypes = {
    id: PropTypes.string.isRequired, 
    title: PropTypes.string.isRequired, 
    // body: PropTypes.string.isRequired, 
    // date : PropTypes.isRequired,  
    // imageUrls: PropTypes.array.isRequired
};