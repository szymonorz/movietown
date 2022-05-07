import React from 'react';
import {screening} from '../api/ScreeningApi';
import {List, makeStyles} from '@material-ui/core'
import ScreeningCard from './ScreeningCard';


interface ScreeningListProps{
    screenings: screening[]
}

const useStyles = makeStyles(() => ({
    list: {
        backgroundColor: "#282c34",
        margin: "0 15% 0 15%",
        borderRadius: "8px"
    }
}))

const ScreeningList: React.FC<ScreeningListProps> = ({screenings}) => {
    const {list} = useStyles()
    const showScreenings = (screenings: screening[]) => {
        return screenings.map( (screening, index) => {
            return  <ScreeningCard key={index} values={screening}/>
               
            
        })
    }
    
    return(
        <div>
            <List className={list}>
                {showScreenings(screenings)}
            </List>
        </div>
    )
}

export default ScreeningList