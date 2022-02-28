import React from 'react'
import { Modal, Button} from 'antd';
import {termsAndConditions} from "../../../utils" 

const StatuteModal = ({modalVisible, setModalVisible}) => {
  return (
    <Modal 
      className="mt-4 text-center"
      title={'Regulamin serwisu'}
      centered
      visible={modalVisible}
      onOk={() => {
        setModalVisible(false)
      }}
      onCancel={() => setModalVisible(false)}
    //   footer={[<Button key="back" onClick={setModalVisible(false)}>OK
    // </Button>]}
    footer={[
      <Button key="back" type="primary" onClick={() => setModalVisible(false)}>
              OK
            </Button>
    ]}
      >
      
      <div className="d-flex flex-column text-left">
        <ol>
        {termsAndConditions.map(term => (
          <li className="pb-2" key={term.id}>{term.text}</li>
        ))}
        </ol>
      </div>
      </Modal>
  )
}

export default StatuteModal