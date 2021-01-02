import React, { useState, useRef } from 'react';
import Popup from 'reactjs-popup';
import { Form, Button } from 'react-bootstrap';
import SignatureCanvas from 'react-signature-canvas';
import './TimeSheetTemplate.css';

function TimeSheetTemplate() {
  const signedCanvas = useRef({});
  const [imgUrl, setImgUrl] = useState(null);
  const clearSign = () => {
    signedCanvas.current.clear();
  };
  const saveSign = () => {
    setImgUrl(signedCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
  };
  const foremanName = useRef();
  const lunchBreak = useRef();
  const date = useRef();
  const startTime = useRef();
  const finishTime = useRef();
  const day = useRef();
  const companyName = useRef();
  const siteAdress = useRef();

  const arrayWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  return (
    <>
      {/* date */}
      <Form.Group className='formGroupDate'>
        <Form.Label>Day</Form.Label>
        <Form.Control as='select' ref={day}>
          <option>----------------</option>
          {arrayWeek.map((el) => {
            return (
              <option key={el}>{el}</option>);
          })}
        </Form.Control>
        <Form.Label>Date</Form.Label>
        <Form.Control ref={date} placeholder='dd/mm/yyyy'></Form.Control>
      </Form.Group>

      {/* work info */}
      <Form.Group className='formGroupWorkInfo'>
        <Form.Label>Company name</Form.Label>
        <Form.Control ref={companyName}></Form.Control>
        <Form.Label>Site Adress</Form.Label>
        <Form.Control ref={siteAdress}></Form.Control>
      </Form.Group>

      {/* time */}
      <Form.Group className='formGroupTime'>
        <Form.Label>Starting time</Form.Label>
        <Form.Control ref={startTime} placeholder='7.00 am'></Form.Control>
        <Form.Label>Finishing time</Form.Label>
        <Form.Control ref={finishTime} placeholder='3.00 pm'></Form.Control>
        <Form.Label>Lunch break</Form.Label>
        <Form.Control ref={lunchBreak} placeholder='30min'></Form.Control>
      </Form.Group>

      {/* forman sign */}
      <Form.Group className='formGroupSignName'>
        <Form.Label>Foreman name</Form.Label>
        <Form.Control ref={foremanName}></Form.Control>
      </Form.Group>

      <Popup
        modal
        position='right center'
        trigger={<Button>Signature Foreman</Button>}
        closeOnDocumentClick={true}
      >
        {(close) => (
          <>
            <div className='backdrop'></div>
            <SignatureCanvas
              ref={signedCanvas}
              canvasProps={{ className: 'signatureCanvas' }}
            />
            <div>
              <Button onClick={clearSign}>Clear</Button>
              <Button onClick={close}>Close</Button>
              <Button onClick={saveSign}>Save</Button>
            </div>
          </>
        )}
      </Popup>
      <br />
      <br />
      {imgUrl ? (
        <img
          src={imgUrl}
          alt='signature'
          style={{
            display: 'block',
            width: '150px',
            border: '1px solid black',
            margin: '0 auto',
          }}
        />
      ) : null}

      <Button
        onClick={() => {
          console.log(day.current.value);
        }}
      >
        Send
      </Button>
    </>
  );
}

export default TimeSheetTemplate;
