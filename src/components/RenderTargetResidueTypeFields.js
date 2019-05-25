import React from 'react';
import { Form, Input, Radio, InputNumber } from 'antd';
import RenderSamplingParameters from './RenderSamplingParameters';

class RenderTargetResidueTypeFields extends React.Component {
  state = { defineLimits: false };

  onSelectDefineLimits = (event) => {
    let value = event.target.value
    if (value === 'Yes') {
      this.setState({
        defineLimits: true
      });
    } else {
      this.setState({
        defineLimits: false
      });
    };
  }

  renderFields = () => {
    // if form needs to reset
    if(this.props.resetForm) {
      this.setState({
        defineLimits: false
      });
    }
    if (this.props.targetResidueType === 'API' || this.props.targetResidueType === 'Cleaning Agent') {
      const { getFieldDecorator } = this.props.form;

      return (
        <React.Fragment>
          <Form.Item label="LOD (in ppm)"
            style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginRight: '10px' }}>
            {getFieldDecorator('LOD', {
              rules: [{ required: true, message: 'Please input LOD' }],
            })(
              <InputNumber min={0} />
            )}
          </Form.Item>
          <Form.Item label="LOQ (in ppm)"
            style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginLeft: '10px' }}>
            {getFieldDecorator('LOQ', {
              rules: [{ required: true, message: 'Please input LOQ' }],
            })(
              <InputNumber min={0} />
            )}
          </Form.Item>
          <RenderSamplingParameters 
            targetResidueType={this.props.targetResidueType} 
            form={this.props.form} 
            isSwabConfigured={this.props.isSwabConfigured}
            isRinseConfigured={this.props.isRinseConfigured}
            resetForm={this.props.resetForm}
          />
        </React.Fragment>
      );
    } else if (this.props.targetResidueType === 'Bioburden' || this.props.targetResidueType === 'Endotoxin') {
      const { getFieldDecorator } = this.props.form;
      return (
        <React.Fragment>
          <Form.Item label="Method Used">
            {getFieldDecorator('methodUsed', {
              rules: [{ required: true, message: 'Please input method used' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Define TNTC and TSFT Limits?">
            {getFieldDecorator('defineLimits', {
              rules: [{ required: true, message: 'Please input limits' }],
            })(
              <Radio.Group onChange={(event) => this.onSelectDefineLimits(event)}>
                <Radio value="Yes">Yes</Radio>
                <Radio value="No">No</Radio>
              </Radio.Group>
            )}
          </Form.Item>
          {this.state.defineLimits ?
            <React.Fragment>
              <Form.Item label="TNTC Limit (in CFU)"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginRight: '10px' }}>
                {getFieldDecorator('tntcLimit', {
                  rules: [{ required: true, message: 'Please input TNTC limit' }],
                })(
                  <InputNumber min={0} />
                )}
              </Form.Item>
              <Form.Item label="TFTC Limit (in CFU)"
                style={{ display: 'inline-block', width: 'calc(50% - 12px)', marginRight: '10px' }}>
                {getFieldDecorator('tftcLimit', {
                  rules: [{ required: true, message: 'Please input TFTC limit' }],
                })(
                  <InputNumber min={0} />
                )}
              </Form.Item>
            </React.Fragment> : ''}
          <RenderSamplingParameters 
            targetResidueType={this.props.targetResidueType} 
            form={this.props.form} 
            isSwabConfigured={this.props.isSwabConfigured}
            isRinseConfigured={this.props.isRinseConfigured}
            resetForm={this.props.resetForm}
          />
        </React.Fragment>
      );
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.renderFields()}
      </React.Fragment>
    );
  }
}

export default RenderTargetResidueTypeFields;