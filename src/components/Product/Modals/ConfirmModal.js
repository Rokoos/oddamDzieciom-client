import React from 'react'
import { Modal} from 'antd';

const ModalBox = ({title, modalVisible, setModalVisible, message="", remove}) => {
  return (
    <Modal 
      className="mt-4 text-center"
      title={title}
      centered
      visible={modalVisible}
      onOk={() => {
        setModalVisible(false)
        remove()
      }}
      onCancel={() => setModalVisible(false)}
      >
      <div className="d-flex flex-column">
      {message}
      </div>
      </Modal>
  )
}

export default ModalBox
