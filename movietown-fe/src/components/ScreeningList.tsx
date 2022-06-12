import React from 'react';
import {request_screening} from '../api/ScreeningApi';
import ScreeningCard from './ScreeningCard';
import { StyledList } from './customer_components/StyledList';


interface ScreeningListProps{
    screenings: request_screening[]
}



const ScreeningList: React.FC<ScreeningListProps> = ({screenings}) => {
    const showScreenings = (screenings: request_screening[]) => {
        return screenings.map( (screening, index) => {
            return  <ScreeningCard key={index} value={screening}/>   
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