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
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <hr />

        <Table
          bordered
          hover>
          <thead>
            <tr></tr>
          </thead>
          <tbody></tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <p>Generated with ClipCut</p>
      </Modal.Footer>
    </Modal>
  );
};

export default DownloadModal;
