import React, {FC, MouseEvent} from 'react';
import {Badge} from 'reactstrap';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../reducers';
import {Direction} from '../models/Elevator';
import {toggleActiveFloor} from '../actions/elevator';

const CallButtonsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: 0 20px;
`;

const BadgeStyle = styled(Badge)`
    cursor: pointer;
    background-color: ${props => props.isActive && "red"};
`;

type CallButtonsProps = {
    floor: number,
    upIsActive: boolean,
    downIsActive: boolean
}

const CallButtons: FC<CallButtonsProps> = ({floor, upIsActive, downIsActive}) => {
    const dispatch = useDispatch();
    const {position, floors} = useSelector((state: State) => state.elevator);

    const onClick = (event: MouseEvent, direction: number) => {
        event.preventDefault();
        if (position.current !== floor) {
            dispatch(toggleActiveFloor(floor, (direction === Direction.UP)));
        }
    };

    return (
        <CallButtonsWrapper>
            {!(floor === floors.length - 1) && <BadgeStyle onClick={(e: MouseEvent) => onClick(e, Direction.UP)}
                                                           color={upIsActive ? 'danger' : 'secondary'}>&#9650;</BadgeStyle>}
            {!(floor === 0) && <BadgeStyle onClick={(e: MouseEvent) => onClick(e, Direction.DOWN)}
                                           color={downIsActive ? 'danger' : 'secondary'}>&#9660;</BadgeStyle>}
        </CallButtonsWrapper>
    )
};

export default CallButtons;
