import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {State} from '../reducers';
import Floor from './Floor';
import styled from 'styled-components';
import {isEmpty} from 'lodash';
import {moveElevator} from '../actions/elevator';

const ElevatorControllerWrapper = styled.div`
    width: 200px;
    display: flex;
    flex-direction: column-reverse;
`;

const ElevatorController: FC = () => {
    const dispatch = useDispatch();
    const {position, controls, floors, doorsOpen} = useSelector((state: State) => state.elevator);

    useEffect(() => {
        let interval: number | undefined = undefined;

        if (controls.includes(true) || !isEmpty(floors.filter((floor) => (floor.callButtons.upIsActive || floor.callButtons.downIsActive)))) {
            interval = setInterval(() => {
                dispatch(moveElevator())
            }, 1000);
        }

        return () => clearInterval(interval);
    });

    const showFloors = () => floors.map(({id, level, callButtons}) => {
        const isCurrent = position.current === level;
        return <Floor key={id} level={level} isCurrent={isCurrent} doorsOpen={isCurrent && doorsOpen}
                      upBtnIsActive={callButtons.upIsActive} downBtnIsActive={callButtons.downIsActive}/>
    });

    return (
        <ElevatorControllerWrapper>
            {floors && showFloors()}
        </ElevatorControllerWrapper>
    )
};

export default ElevatorController;
