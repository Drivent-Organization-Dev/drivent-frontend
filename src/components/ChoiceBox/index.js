
import styled from 'styled-components';

export default function ChoiceBox({ description, price, setPrice, selectState, selector, disable, }) {
  function clickButton() {
    if (!disable && !selectState && selector) {
      if (description === 'Presencial' || description === 'Sem Hotel') {
        selector(!selectState);
      } else {
        selector(selectState);
      }
      setPrice(Number(price));
    }
  }

  return (
    <Wrapper onClick={clickButton} selected={selectState} disable={disable}>
      <p>{description}</p>
      {description === 'Com Hotel' || description === 'Sem Hotel' ? <p>{'+ R$ '+price}</p> : <p>{'R$ '+price}</p>}
    </Wrapper>
  );
}

const Wrapper = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  border-radius: 20px;
  margin: 12px;
  height: 145px;
  width: ${(props) => (props.disable ? '285px' : '145px')};
  background-color: ${(props) => (props.selected || props.disable ? '#FFEED2' : '#FFFFFF')};
  border: ${(props) => (props.selected || props.disable ? 'none' : '1px solid #cecece')};
  
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #454545;

  p:nth-child(2) {
    color: #898989;
    margin-top: 8px;
  }
`;
