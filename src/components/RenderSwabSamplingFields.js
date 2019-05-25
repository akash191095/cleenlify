import React from 'react';
import { Form, Input, Radio, InputNumber } from 'antd';
import AddMOC from './AddMOC';

class RenderSwabSamplingFields extends React.Component {
  renderFields = () => {
    if (this.props.targetResidueType === 'API' || this.props.targetResidueType === 'Cleaning Agent') {
      if (this.props.form) {
        const { getFieldDecorator } = this.props.form;
        return (
          <React.Fragment>
            <Form.Item label="Method Used">
              {getFieldDecorator('swabMethodUsed', {
                rules: [{ required: true, message: 'Please input method used' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="Solvent Name"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginRight: '10px' }}>
              {getFieldDecorator('solventName', {
                rules: [{ required: true, message: 'Please input solvent name' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="Solvent Quantity (ml)"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: '10px' }}>
              {getFieldDecorator('solventQuantity', {
                rules: [{ required: true, message: 'Please input solvent quantity' }],
              })(
                <InputNumber min={0} />
              )}
            </Form.Item>
            <Form.Item label="Default Recovery (%)">
              {getFieldDecorator('defaultRecoverySwab', {
                rules: [{ required: true, message: 'Please input recovery percentage' }],
              })(
                <InputNumber min={0} max={100} />
              )}
            </Form.Item>
            <AddMOC
              targetResidueType={this.props.targetResidueType} 
              form={this.props.form}
              parameterName='swab'
            />
          </React.Fragment>
        );
      };
    } else if (this.props.targetResidueType === 'Bioburden' || this.props.targetResidueType === 'Endotoxin') {
      if (this.props.form) {
        const { getFieldDecorator } = this.props.form;
        return (
          <React.Fragment>
            <Form.Item label="Use Recovery for Swab?"
              style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: '10px' }}>
              {getFieldDecorator('useRecoveryForSwab', {
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
              {getFieldDecorator('swabRecoveryPercentage', {
                rules: [{ required: true, message: 'Please input recovery percentage' }],
              })(
                <InputNumber min={0} max={100} />
              )}
            </Form.Item>
            <AddMOC
              targetResidueType={this.props.targetResidueType} 
              form={this.props.form} 
              parameterName='swab'
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

export default RenderSwabSamplingFields;