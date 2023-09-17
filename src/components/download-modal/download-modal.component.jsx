import { Button, Modal, Table } from 'react-bootstrap';

const DownloadModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}
      size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Mass Create Events</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <hr />
        <h4>
          <strong>Last Step: Upload Event Images</strong>
        </h4>
        <p>
          You can add an event image to each event that was successfully
          uploaded below.
        </p>
        <p>
          This is optional - for events that you don't add an image, we'll
          automatically add your group logo as the event image.
        </p>
        <hr />

        <Table
          bordered
          hover>
          <thead>
            <tr>
              <th style={{ width: 30 }}>Upload Image</th>
              <th>Title</th>
              <th>Date/Time</th>
              <th>Visibility</th>
            </tr>
          </thead>
          <tbody>
            {/* {props.successRows &&
              props.successRows.map((row, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <ImageDragDrop
                        eventID={row.EVENT_ID}
                        addFileToObject={addFileToObject}
                      />
                    </td>
                    <td>{row.EVENT_TITLE}</td>
                    <td>{row.EVENT_DATETIME_FORMATTED}</td>
                    <td>{row.EVENT_VISIBILITY}</td>
                  </tr>
                );
              })} */}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <p>Generated with ClipCut</p>
      </Modal.Footer>
    </Modal>
  );
};

export default DownloadModal;
