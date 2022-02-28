import React from 'react'
import { Modal, Button} from 'antd';
import { charNumber } from '../../../utils'

const MessageModal = ({
  owner,
  message,
  modalVisible,
  setModalVisible,
  setMessage,
  handleEmail,
  messageSort
}) => {


  return (
    <Modal 
    className="mt-4 text-center"
      title={messageSort === 'user2admin' ? 'Powiadom Admina o naruszeniu regulaminu serwisu' : `Napisz wiadomość do użytkownika ${owner.name}.`}
      centered
      visible={modalVisible}
      onOk={() => setModalVisible(false)}
      onCancel={() => setModalVisible(false)}
      footer={[
        <Button key="back" onClick={() => setModalVisible(false)} >
          Anuluj
        </Button>,
        <Button disabled={message.trim().length === 0 ||message.length > 500} key="ok" type="primary" onClick={() => {
          handleEmail()
          setModalVisible(false)
        }}>
          Wyślij
        </Button>
      ]}
      >
        <div className="d-flex flex-column">
        <div className="form-group">
        <textarea
        rows="5"
        placeholder="Twoja wiadomość"
        className="form-control" 
        value={message}
        onChange={e => setMessage(e.target.value)}
        autoFocus
      ></textarea>
      </div>
      {charNumber(message, 500) < 0 ? <p style={{color: 'red'}}>{charNumber(message, 500)}</p> : <p style={{color:'#777'}}>{message.length} of 500</p>} 
        </div>
      </Modal>
  )
}

export default MessageModal