import React from 'react';
import {screening} from '../api/ScreeningApi';
import {List} from '@material-ui/core'
import ScreeningCard from './ScreeningCard';


interface ScreeningListProps{
    screenings: screening[]
}

const ScreeningList: React.FC<ScreeningListProps> = ({screenings}) => {
    
    const showScreenings = (screenings: screening[]) => {
        return screenings.map( (screening, index) => {
            return (
                <div>
                    <ScreeningCard key={index} values={screening}/>
                </div>
            )
        })
    }

    
    return(
        <div>
            <List>
                {showScreenings(screenings)}
            </List>
        </div>
    )
}

export default ScreeningList