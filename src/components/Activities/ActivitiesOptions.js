import { useEffect, useState } from 'react';
import { Title } from '../Booking/BookingOptions';
import { getActivities, enrollActivity } from '../../services/activitiesApi';
import useToken from '../../hooks/useToken';
import styled from 'styled-components';

export default function ActivitiesOptions() {
  const token = useToken();
  const mainRoom = [];
  const sideRoom = [];
  const workshopRoom = [];
  const [list, setList] = useState();
  const [select, setSelect] = useState();

  async function listActivities(token, day) {
    setSelect(day);
    await getActivities(token, day)
      .then(ans => setList(ans))
      .catch(ans => console.log(ans));
  }

  async function sendActvEnroll(token, actvId) {
    await enrollActivity(token, actvId)
      .then(ans => alert('Cadastro realizado!'))
      .catch(ans => alert('Não foi possível realizar o cadastro'));
  }

  return (
    <>
      <Title>Escolha de atividades</Title>
      <Options>
        <Day select={select} day={'Sexta'} onClick={() => listActivities(token, 'Sexta')}>Sexta, 22/10</Day>
        <Day select={select} day={'Sábado'} onClick={() => listActivities(token, 'Sábado')}>Sábado, 23/10</Day>
        <Day select={select} day={'Domingo'} onClick={() => listActivities(token, 'Domingo')}>Domingo, 24/10</Day>
      </Options>
      {(list) &&
        <>
          {
            list?.activities.map(actv => {
              if (actv.place === 'Auditório Principal') {
                mainRoom.push(
                  <DayCard enrolled={list.userActivitiesArray} vacancies={actv.vacancies} actvId={actv.id} key={actv.id}>
                    <span><strong>{actv.name}</strong></span>
                    <span>{actv.start}:00-{actv.end}:00</span>
                    {(list.userActivitiesArray.includes(actv.id)) ?
                      <div><ion-icon name="checkmark-circle-outline"></ion-icon>Inscrito</div> :
                      (actv.vacancies > 0 ?
                        <div><ion-icon name="enter-outline" onClick={() => sendActvEnroll(token, actv.id)}></ion-icon>{actv.vacancies} vagas</div> :
                        <div><ion-icon name="close-circle-outline"></ion-icon>Esgotado</div>)}
                  </DayCard>);
              }
              if (actv.place === 'Auditório Lateral') {
                sideRoom.push(
                  <DayCard enrolled={list.userActivitiesArray} vacancies={actv.vacancies} actvId={actv.id} key={actv.id}>
                    <span><strong>{actv.name}</strong></span>
                    <span>{actv.start}:00-{actv.end}:00</span>
                    {(list.userActivitiesArray.includes(actv.id)) ?
                      <div><ion-icon name="checkmark-circle-outline"></ion-icon>Inscrito</div> :
                      (actv.vacancies > 0 ?
                        <div><ion-icon name="enter-outline" onClick={() => sendActvEnroll(token, actv.id)}></ion-icon>{actv.vacancies} vagas</div> :
                        <div><ion-icon name="close-circle-outline"></ion-icon>Esgotado</div>)}
                  </DayCard>);
              }
              if (actv.place === 'Sala de Workshop') {
                workshopRoom.push(
                  <DayCard enrolled={list.userActivitiesArray} vacancies={actv.vacancies} actvId={actv.id} key={actv.id}>
                    <span><strong>{actv.name}</strong></span>
                    <span>{actv.start}:00-{actv.end}:00</span>
                    {(list.userActivitiesArray.includes(actv.id)) ?
                      <div><ion-icon name="checkmark-circle-outline"></ion-icon>Inscrito</div> :
                      (actv.vacancies > 0 ?
                        <div><ion-icon name="enter-outline" onClick={() => sendActvEnroll(token, actv.id)}></ion-icon>{actv.vacancies} vagas</div> :
                        <div><ion-icon name="close-circle-outline"></ion-icon>Esgotado</div>)}
                  </DayCard>);
              }
            })
          }
          <Options>
            {
              (mainRoom.length > 0) &&
              <Place>
                <div>Auditório Principal</div>
                {mainRoom}
              </Place>
            }
            {
              (sideRoom.length > 0) &&
              <Place>
                <div>Auditório Lateral</div>
                {sideRoom}
              </Place>
            }
            {
              (workshopRoom.length > 0) &&
              <Place>
                <div>Sala de Workshop</div>
                {workshopRoom}
              </Place>
            }
          </Options>
        </>
      }
    </>
  );
}

const Options = styled.div`
    display: flex;
    font-family: 'Roboto', sans-serif;
`;

const Day = styled.button`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  border: none;
  margin-right: 20px;
  width: 182px;
  height: 37px;
  background: ${props => (props.select === props.day) ? '#FFD37D' : '#e0e0e0'};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
  :hover {
    cursor: pointer;

  }
`;

const DayCard = styled.div`
    font-family: 'Roboto', sans-serif;
    font-size: 12px;
    max-width: 265px;
    height: 80px;
    background-color: ${props => (props.enrolled.includes(props.actvId)) ? '#D0FFDB' : '#F1F1F1'};
    border-radius: 5px;
    margin-top: 20px;
    padding: 10px;
    position: relative;
    span{
        text-align: left;
        display:flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
    div{
      height: 60px;
      width: 60px;
      padding-left: 8px;
      color: ${props => (props.vacancies > 0) ? '#078632' : '#CC6666'};
      position: absolute;
      font-size: 10px;
      top: 10px;
      right: 10px;
      display: flex;
      flex-direction: column;
      border-left: solid 1px #CFCFCF;
      :hover{
        cursor: ${props => (!props.enrolled.includes(props.actvId)) ? 'pointer' : 'auto'};
      }
    }
    ion-icon{
      font-size: 24px;
    }
`;

const Place = styled.div`
  width: 265px;
  margin-right: 20px;
  box-sizing: border-box;
  margin-top: 50px;
  justify-content: center;
  align-items: center;
  div{
    align-items: center;
    justify-items: center;
    justify-content: center;
    text-align: center;
  }
`;
