import React, {Component, useState } from 'react';
import {Modal, Button } from 'react-bootstrap';
import Canvas from './Canvas';
import { Redirect } from "react-router-dom";



//https://react-bootstrap.github.io/components/modal/
//https://stackoverflow.com/questions/53282848/react-16-7-hooks-react-usestate-is-not-a-function
//https://stackoverflow.com/questions/34438671/react-bootstrap-modal-how-do-i-get-it-to-show

function Example(val) {
    const [show, setShow] = useState(false);
    //console.log("val: ", val);
  
    const handleSave = () => { 
        var log_time = new Date();
        const key = log_time.getFullYear().toString() + (log_time.getMonth() + 1).toString().padStart(2, '0') + log_time.getDate().toString();
        //https://www.sanwebe.com/snippet/downloading-canvas-as-image-dataurl-on-button-click
        //safari problem:  https://stackoverflow.com/questions/22094489/image-is-downloading-in-chrome-but-not-in-safari
        //https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
        var mirror = document.getElementById('mirror');
        var image = mirror.toDataURL("image/jpg", 1.0).replace("image/jpg", "image/octet-stream");    
        var link = document.createElement('a');
        //link.download = `${key}.jp2`;

        if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) { //iOS = Iphone, Ipad, etc.

          link.download = `${key}.jp2`;
          link.href = image;
          link.click(); 
          //setShow(false);
          //window.location.reload(false);
         
        }
        else{

          link.download = `${key}.jpg`;
          link.href = image;
          link.click();   
          //setShow(false);
          //window.location.reload(false);
         
        }

        
        
        

        
    }

    const handleClose = () => {    
        setShow(false);
        window.location.reload(false);
        //window.location.reload(false);
    }



    const handleShow = () => setShow(true);

  
    return (
      <>
        {/*
        <Button variant="primary" onClick={handleShow}>
        Certificate modal
        </Button>
         */}
  
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Download</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              Save certificate to your cell phone and show to the security when enter the plant
              <Canvas badge_id={val.badge_id} pass_cat={val.pass_cat} time={val.time} />
            </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Certificate
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default Example;