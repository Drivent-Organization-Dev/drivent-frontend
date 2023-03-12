import { useState } from 'react';
import styled from 'styled-components';

export default function RoomCard({ roomId, roomName, roomCapacity, bookedRooms, setSelectRoom, selectRoomButton, setSelectRoomButton }) {
  const icons = [];
  let disable = false;
  console.log(bookedRooms);
  for(let i=0; i<bookedRooms.length; i++) {
    if (bookedRooms[i].roomId === roomId) {
      icons.push (<ion-icon name="person"></ion-icon>);
    }
  }

  if(icons.length >= roomCapacity) {
    disable = true;
  }

  while (icons.length < roomCapacity) {
    icons.push (<ion-icon name="person-outline"></ion-icon>);
  }

  return (
    <Room
      selectRoomButton={selectRoomButton}
      roomId={roomId}
      disable={disable}
      onClick={() => {
        setSelectRoomButton(roomId);
        setSelectRoom(roomId);
      }}>
      <div>{roomName}</div>
      <span>{icons}</span>
    </Room>
  );
}

const Room = styled.div`
  font-family: 'Roboto', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 190px;
  height: 45px;
  border: solid 1px #CECECE;
  border-radius: 10px;
  margin-right: 10px;
  margin-top: 10px;
  padding: 15px;
  font-size: 20px;
  background-color: ${props => (props.selectRoomButton === props.roomId) ? '#FFEED2' : (props.disable ? '#CECECE' : 'none')};
  :hover {
    cursor: pointer;
  }
  pointer-events: ${props => (props.disable) && 'none'};
`;
