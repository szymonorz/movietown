import React, { useContext, useEffect, useRef, useState } from 'react'
import { CustomerReservationContext, getTakenSeats } from '../../../../api/ReservationApi';
import { getSeatsInMovieHall, movie_hall_row, seat } from '../../../../api/ScreeningApi';

interface SeatsGridProps {
    movieHallId: number,
    setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

const SeatsGrid: React.FC<SeatsGridProps> = ({ setNextDisabled, movieHallId }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const provider = useContext(CustomerReservationContext)
    const [seats, setSeats] = useState<seat[]>([])
    const [takenSeats, setTakenSeats] = useState<seat[]>([])
    const [movieHallRows, setMovieHallRows] = useState<movie_hall_row[]>([])
    const seatsToChoose = provider!.customerReservation.seatsToChoose
    useEffect(() => {
        const screeningId = provider!.customerReservation.screening_id
        getSeatsInMovieHall(movieHallId)
        .then(({data}) =>{
           const movie_hall_rows = (data as movie_hall_row[]).map((mrow, index) => {
                const new_seats = mrow.row.seats.map((seat, index) => {
                    return {
                        ...seat,
                        row_number: mrow.row_number
                    }
                })

                return {
                    ...mrow,
                    row: {
                        ...mrow.row,
                        seats: new_seats,
                    }
                }
            })
            setMovieHallRows(rows => [...movie_hall_rows])
        })
        .catch((err) => console.error(err))

        getTakenSeats(screeningId)
        .then(({data}) => {
            if(data !== null)
                setTakenSeats(prev => [...data])
        })
        .catch((err) => console.error(err))
    }, [])

    const isSeatInArray = (seat: seat, seats: seat[]) => {
        return seats.find((element, index, array ) => {
            return (element.id === seat.id) && 
            (element.row_number === seat.row_number) && 
            (element.seat_number === seat.seat_number)
        }) !== undefined
    }


    // do not change anything down there otherwise the entire thing will explode
    // this is a threat
    const boxSize = 40;
    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas = canvasRef.current
        
        const rect = canvas?.getBoundingClientRect()
        const x = event.clientX - rect!.left
        const y = Math.floor(event.clientY - rect!.top)
        const numOfRows = movieHallRows.length
        if (x >= boxSize && y >= boxSize && x < boxSize * 20 && y < boxSize * (numOfRows + 1)) {
            
            const row = Math.floor(y / boxSize);
            const col = Math.floor((x) / (boxSize));
            const data = canvas?.getContext("2d")?.getImageData(x, y, 1, 1)
            const green = data?.data[1]
            const red = data?.data[0]
            const chosenRow = movieHallRows.find((element, index, array) => {
                return (element.row_number == row)
            })
            if(chosenRow !== undefined){
                const chosenSeat = chosenRow.row.seats.find((element, index, array) => {
                    return (element.seat_number == col)
                })
                if(chosenSeat !== undefined){
                    const newSeat: seat = {
                        id: chosenSeat?.id,
                        row_number: row,
                        row_id: 0,
                        seat_number: col
                    }
                    if (green === 0x99 || red === 0x99) {
                        if (isSeatInArray(newSeat, seats)) {
                            seats.splice(seats.indexOf(newSeat), 1);
                            setSeats([...seats]);
                            provider!.setCustomerReservation(prev => {
                                return {
                                    ...prev,
                                    seatsToChoose: seatsToChoose + 1
                                }
                            })
                        } else if(seatsToChoose){
                            setSeats([...seats, newSeat]);
                            provider!.setCustomerReservation(prev => {
                                return {
                                    ...prev,
                                    seatsToChoose: seatsToChoose - 1
                                }
                            })
                        }
        
                    }
                }
               
            }
        }
    }
    //ok now you can touch things

    useEffect(() => {
        const canvas = canvasRef.current
        if(!provider!.customerReservation.seatsToChoose) setNextDisabled(false)
        else setNextDisabled(true)
        provider!.setCustomerReservation(prev => {
            return {
                ...prev,
                seats: [...seats],
                seatsToChoose: seatsToChoose
            }
        })
        if (canvas) {
            const context = canvas!.getContext("2d")
            if (context) {
                context.fillStyle = "#414348"
                context.fillRect(0, 0, context.canvas.width, context.canvas.height)
                context.font = "bold 10pt Courier"
                movieHallRows.forEach((movieHallRow , index) => {
                    let rowN = movieHallRow.row_number
                    context.fillStyle = "#009900"
                    movieHallRow.row.seats.forEach((seat, col) => {
                        if(isSeatInArray(seat, seats)){
                            context.fillStyle = "#990000"
                        }
                        if(isSeatInArray(seat, takenSeats)){
                            context.fillStyle = "#1f1f1f"
                        }
                        context.beginPath()
                        context.beginPath()
                        context.strokeStyle = "#414348"
                        context.lineWidth = 10
                        context.rect(
                            (col) * boxSize + 40,
                            rowN * boxSize,
                            boxSize,
                            boxSize
                        )
                        context.fillRect(
                            (col) * boxSize + 40,
                            rowN * boxSize,
                            boxSize,
                            boxSize
                        )
                        context.stroke()
                        context.fillStyle = "#FFFFFF"

                        context.fillText(seat.seat_number + "", (col) * boxSize + 50, rowN * boxSize + 25)
                        context.fillStyle = "#009900"
                    })
                })
            }
        }
    }, [seats, takenSeats, movieHallRows])


    return <canvas ref={canvasRef} width={800} height={500} onClick={handleClick} />
}

export default SeatsGrid