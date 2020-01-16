import React, {FC} from 'react';
import _ from 'lodash';
import {Badge} from 'reactstrap';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../reducers';
import {toggleControlElevator} from '../actions/elevator';

const ControllerWrapper = styled.div`
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
`;

const BadgeStyle = styled(Badge)`
    cursor: pointer;
`;

const Controller: FC = () => {
    const dispatch = useDispatch();
    const {position, controls, floors} = useSelector((state: State) => state.elevator);

    const toggleControl = (level: number) => {
        if (level !== position.current) {
            dispatch(toggleControlElevator(level));
        }
    };

    return (
        <ControllerWrapper>
            {_.times(floors.length, (floor) => <BadgeStyle key={floor} color={controls[floor] ? 'danger' : 'secondary'}
                                                    onClick={() => toggleControl(floor)}>{floor}</BadgeStyle>)}
        </ControllerWrapper>
    )
};

export default Controller;
