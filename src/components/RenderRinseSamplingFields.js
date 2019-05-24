import React from 'react';
import { Form, Input, Radio } from 'antd';

class RenderRinseSamplingFields extends React.Component {
  renderFields = () => {
    if (this.props.targetResidueType === 'API' || this.props.targetResidueType === 'Cleaning Agent') {
      if (this.props.form) {
        const { getFieldDecorator } = this.props.form;
        return (
          <React.Fragment>
            <Form.Item label="Method Used">
              {getFieldDecorator('rinseMethodUsed', {
                rules: [{ required: true, message: 'Please input method used' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="Default Recovery (%)">
              {getFieldDecorator('defaultRecoveryRinse', {
                rules: [{ required: true, message: 'Please input method used' }],
              })(
                <Input />
              )}
            </Form.Item>
          </React.Fragment>
        );
      };
    } else if (this.props.targetResidueType === 'Bioburden' || this.props.targetResidueType === 'Endotoxin') {
      if (this.props.form) {
        const { getFieldDecorator } = this.props.form;
        return (
          <React.Fragment>
            <Form.Item label="Solvent Volume">
              {getFieldDecorator('solventVolume', {
                rules: [{ required: true, message: 'Please input solvent volume' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="Use Recovery for Swab?"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: '10px' }}>
              {getFieldDecorator('useRecoveryForSwabRinse', {
                rules: [{ required: true, message: 'Please input Yes or No' }],
              })(
                <Radio.Group>
                  <Radio value="Yes">Yes</Radio>
                  <Radio value="No">No</Radio>
                </Radio.Group>
              )}
            </Form.Item>
            <Form.Item label="Default Recovery (%)"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: '10px' }}>
              {getFieldDecorator('swabRecoveryPercentageRinse', {
                rules: [{ required: true, message: 'Please input recovery percentage' }],
              })(
                <Input />
              )}
            </Form.Item>
          </React.Fragment>
        );
      }
    }
  };
  render() {
    return (
      <div>
        {this.renderFields()}
      </div>
    );
  }
}

export default RenderRinseSamplingFields;