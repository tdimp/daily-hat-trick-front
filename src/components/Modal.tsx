import React from 'react';
import { modalProps } from '../@types/PropsInterface';

const Modal = ({ handleDrop, id }: modalProps) => {
  return (
<div className="modal fade" id="confirmDropModal" tabIndex={-1} aria-labelledby="confirmDropModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="confirmDropModalLabel">Confirm Drop</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={() => handleDrop(id)} >Save changes</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Modal