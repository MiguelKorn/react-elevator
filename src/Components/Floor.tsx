import React, {FC} from 'react';
import CallButtons from './CallButtons';
import Controller from './Controller';
import styled from 'styled-components';

const FloorWrapper = styled.div`
    display: flex;
    margin-top: 5px;
`;

const FloorContainer = styled.div`
    border: 1px solid black;
    display: flex;
    position: relative;
    width: 110px;
    height: 110px;
    align-items: center;
    padding: 0;
    background: ${(props: FloorStyleProps) => props.doorsOpen ? 'yellowgreen' : props.current ? 'white' : 'lightgray'}
`;

const FloorName = styled.p`
    flex: 1;
    font-size: 3em;
    text-align: center;
    margin-left: ${(props: FloorStyleProps) => props.current && '18px'};
`;

type FloorStyleProps = {
    current?: boolean,
    doorsOpen?: boolean
}

type FloorProps = {
    level: number,
    isCurrent: boolean,
    doorsOpen: boolean,
    upBtnIsActive: boolean,
    downBtnIsActive: boolean
};

const Floor: FC<FloorProps> = ({level, isCurrent, doorsOpen, upBtnIsActive, downBtnIsActive}) => {
    return (
        <FloorWrapper>
            <CallButtons floor={level} upIsActive={upBtnIsActive} downIsActive={downBtnIsActive}/>
            <FloorContainer current={isCurrent} doorsOpen={doorsOpen}>
                <FloorName current={isCurrent && doorsOpen}>{level}</FloorName>
                {isCurrent && doorsOpen && <Controller/>}
            </FloorContainer>
        </FloorWrapper>
    )
};

export default Floor;
