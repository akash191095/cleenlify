import React from 'react';
import { Form, Input, Radio, InputNumber } from 'antd';
import AddMOC from './AddMOC';

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
                rules: [{ required: true, message: 'Please input recovery percentage' }],
              })(
                <InputNumber min={0} max={100} />
              )}
            </Form.Item>
            <AddMOC
              targetResidueType={this.props.targetResidueType} 
              form={this.props.form} 
              parameterName='rinse'
            />
          </React.Fragment>
        );
      };
    } else if (this.props.targetResidueType === 'Bioburden' || this.props.targetResidueType === 'Endotoxin') {
      if (this.props.form) {
        const { getFieldDecorator } = this.props.form;
        return (
          <React.Fragment>
            <Form.Item label="Solvent Volume (ml)">
              {getFieldDecorator('solventVolume', {
                rules: [{ required: true, message: 'Please input solvent volume' }],
              })(
                <InputNumber min={0} />
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
                <InputNumber min={0} max={100} />
              )}
            </Form.Item>
            <AddMOC
              targetResidueType={this.props.targetResidueType} 
              form={this.props.form}
              parameterName='rinse'
            />
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