import React from 'react';
import {screening} from '../api/ScreeningApi';
import ScreeningCard from './ScreeningCard';
import { StyledList } from './customer_components/StyledList';


interface ScreeningListProps{
    screenings: screening[]
}



const ScreeningList: React.FC<ScreeningListProps> = ({screenings}) => {
    const showScreenings = (screenings: screening[]) => {
        return screenings.map( (screening, index) => {
            return  <ScreeningCard key={index} values={screening}/>   
        })
    }
    
    return(
        <div>
            <StyledList>
                {showScreenings(screenings)}
            </StyledList>
        </div>
    )
}

export default ScreeningList