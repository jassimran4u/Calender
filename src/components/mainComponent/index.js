import React from 'react';
import './index.scss';
import { daysList, eventList, timeSlotList } from './utils';

function Calender() {

    //getOverlappingEventsList
    //addOverlappingPadding

    const getOverlappingEventsList = () =>{
        const overlappingEventsList = []
        eventList.map((event, index) => {
            const overlappingEvents = getOverlapEvents(event)
            if(overlappingEvents.length > 0) {
                overlappingEventsList.push(overlappingEvents)
            }
        })
        return overlappingEventsList
    }

    const getOverlapEvents = (event) => {
        const overlappingEvents = []
        eventList.map((e, index) => {
            if(event.date === e.date && event.id !== e.id) {
                if(event.startTime >= e.startTime && event.startTime < e.endTime) {
                    overlappingEvents.push(e)
                } else if(event.endTime > e.startTime && event.endTime <= e.endTime) {
                    overlappingEvents.push(e)
                } else if(event.startTime <= e.startTime && event.endTime >= e.endTime) {
                    overlappingEvents.push(e)
                }
            }
        })
        return [...overlappingEvents,event]
    }

    const addOverlappingPadding = () => {
        const overlappingEventsList = getOverlappingEventsList()
        overlappingEventsList.map((overlappingEvents, index) => {
            overlappingEvents.map((event, index) => {
                const padding = index; 
                event.padding = padding
            })
        })
    }


    addOverlappingPadding();


    const renderEvents = (date) => {    
        return eventList.map((event, index) => {
            if(event.date === date) {
                return <div key={index} className='event' 
                    style={{top: `${event.startTime/100*100}px`, height: `${(event.endTime-event.startTime)/100*100}px`,
                    left: `${event.padding*100}px`, width: `${100}px`,
                    marginTop: `-${event.padding*10}px`
                }}
                >{event.title
                }
                </div>
            }
            return null
        })
    }



    return (
        <section className='main-container'>
            <section className='left-section' >
                <button className='btn' >Create new</button>
            </section>
            <section className='right-section' >
                <h2>Calender</h2>
                <section className='calender-container' >
                    <div className='hours-container' >
                        {timeSlotList.map((time, index) => {
                            if(index%4==0)
                            return <div key={index} className='hour' >{time.time}</div>
                            return null
                        })}
                    </div>
                    <div className='days-container' >
                        {daysList.map((day, index) => {
                            return <div>{day.date}
                                {renderEvents(day.date)}    
                            </div>
                        })}
                    </div>
                </section>
            </section>
        </section>
    )
}

export default Calender