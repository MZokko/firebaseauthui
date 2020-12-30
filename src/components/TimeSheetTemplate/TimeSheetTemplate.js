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

  return (
    <>
      <Form>
        {/* date */}
        <Form.Group></Form.Group>

        {/* work info */}
        <Form.Group>
          <Form.Label>Company name</Form.Label>
          <Form.Control type='select'></Form.Control>
          <Form.Label>Site Adress</Form.Label>
          <Form.Control></Form.Control>
        </Form.Group>

        {/* time */}
        <Form.Group>
          <Form.Label>Starting time</Form.Label>
          <Form.Control></Form.Control>
          <Form.Label>Finishing time</Form.Label>
          <Form.Control></Form.Control>
        </Form.Group>

        {/* forman sign */}
        <Form.Group>
          <Form.Label>Foreman name</Form.Label>
          <Form.Control></Form.Control>

          {/* <Popup
            modal
            position='right center'
            trigger={<button>Signature Foreman</button>}
            closeOnDocumentClick={false}
          >
            {(close) => (
              <>
                <div className='backdrop'>
                  <SignatureCanvas
                    canvasProps={{ className: 'signatureCanvas' }}
                  />
                </div>
                {console.log(SignatureCanvasModalShow)}
              </>
            )}
          </Popup> */}

          <Button>Submit</Button>
        </Form.Group>
      </Form>
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
    </>
  );
}

export default TimeSheetTemplate;
