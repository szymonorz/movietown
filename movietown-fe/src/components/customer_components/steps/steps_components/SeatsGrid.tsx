import React, { useContext, useEffect, useRef, useState } from 'react'
import { CustomerReservationContext, getTakenSeats } from '../../../../api/ReservationApi';

interface SeatsGridProps {
    numberOfSeats: number,
    setNextDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

const SeatsGrid: React.FC<SeatsGridProps> = ({ setNextDisabled, numberOfSeats }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const provider = useContext(CustomerReservationContext)
    const [seatsIds, setSeatsIds] = useState<number[]>(provider!.customerReservation.seat_ids)
    const [takenSeatsIds, setTakenSeatsIds] = useState<number[]>([])
    const seatsToChoose = provider!.customerReservation.seatsToChoose
    useEffect(() => {
        const screeningId = provider!.customerReservation.screening_id
        getTakenSeats(screeningId)
        .then(({data}) => {
            console.log(data)
            if(data["taken_seat_ids"])
                setTakenSeatsIds(prev => [...data["taken_seat_ids"]])
        })
        .catch((err) => console.error(err))
    }, [])
    // do not change anything down there otherwise the entire thing will explode
    // this is a threat
    const boxSize = 40;
    const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas = canvasRef.current
        const rect = canvas?.getBoundingClientRect()
        const x = event.clientX - rect!.left
        const y = Math.floor(event.clientY - rect!.top)
        const numOfRows = Math.floor(numberOfSeats / 10)
        if (x >= boxSize && y >= boxSize && x < boxSize * 11 && y < boxSize * (numOfRows + 1)) {
            const row = Math.floor(y / boxSize) - 1;
            const col = Math.floor((x) / (boxSize)) - 1;
            const data = canvas?.getContext("2d")?.getImageData(x, y, 1, 1)
            const green = data?.data[1]
            const red = data?.data[0]
            const seatIndex = row * 10 + col + 1;
            if (green === 0x99 || red === 0x99) {

                if (seatsIds.includes(seatIndex)) {
                    seatsIds.splice(seatsIds.indexOf(seatIndex), 1);
                    setSeatsIds([...seatsIds]);
                    provider!.setCustomerReservation(prev => {
                        return {
                            ...prev,
                            seatsToChoose: seatsToChoose + 1
                        }
                    })
                } else if(seatsToChoose){
                    setSeatsIds([...seatsIds, seatIndex]);
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
    //ok now you can touch things

    useEffect(() => {
        const canvas = canvasRef.current
        if(!provider!.customerReservation.seatsToChoose) setNextDisabled(false)
        else setNextDisabled(true)
        provider!.setCustomerReservation(prev => {
            return {
                ...prev,
                seat_ids: [...seatsIds],
                seatsToChoose: seatsToChoose
            }
        })
        if (canvas) {
            const context = canvas!.getContext("2d")
            if (context) {
                context.fillStyle = "#414348"
                context.fillRect(0, 0, context.canvas.width, context.canvas.height)
                context.font = "bold 10pt Courier"

                const numOfRows = Math.floor(numberOfSeats / 10)
                context.fillStyle = "#009900"
                let index = 0;
                for (let row = 1; row <= numOfRows; row++) {
                    for (let col = 1; col <= 10; col++) {
                        if (seatsIds.includes(index + 1)) {
                            context.fillStyle = "#990000"
                            // console.log(index);
                        }
                        if(takenSeatsIds.includes(index + 1)){
                            context.fillStyle = "#1f1f1f"
                        }
                        context.beginPath()
                        context.strokeStyle = "#414348"
                        context.lineWidth = 10
                        context.rect(
                            (col - 1) * boxSize + 40,
                            row * boxSize,
                            boxSize,
                            boxSize
                        )
                        context.fillRect(
                            (col - 1) * boxSize + 40,
                            row * boxSize,
                            boxSize,
                            boxSize
                        )
                        context.stroke()
                        context.fillStyle = "#FFFFFF"

                        context.fillText(+col + "", (col - 1) * boxSize + 50, row * boxSize + 25)
                        context.fillStyle = "#009900"
                        index = index + 1;
                    }
                }
            }
        }
    }, [seatsIds, takenSeatsIds])


    return <canvas ref={canvasRef} width={500} height={500} onClick={handleClick} />
}

export default SeatsGrid