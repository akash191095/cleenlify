import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import '../styles/render-form.css';
import RenderTargetResidueTypeFields from './RenderTargetResidueTypeFields';

const { Option } = Select;

const onNoParametersConfiguredError = () => {
  message.error('Please configure at least 1 sampling parameters');
};

class RenderForm extends React.Component {
  state = {
    targetResidueType: '',
    isSwabParameterConfigured: false,
    isRinseParameterConfigured: false,
    resetForm: false
  };

  componentDidMount() {
    // Use to disabled submit button at the beginning.
    // this.props.form.validateFields();
  }

  isSwabConfigured = () => {
    if (this.state.isSwabParameterConfigured) {
      this.setState({ isSwabParameterConfigured: false });
    } else {
      this.setState({ isSwabParameterConfigured: true });
    }
  };

  isRinseConfigured = () => {
    if (this.state.isRinseParameterConfigured) {
      this.setState({ isRinseParameterConfigured: false });
    } else {
      this.setState({ isRinseParameterConfigured: true });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    // check if either of sampling parameters are configured
    if (this.state.isRinseParameterConfigured || this.state.isSwabParameterConfigured) {
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          localStorage.setItem(values.analyticalMethodID, JSON.stringify(values));
          // reset fields
          this.setState({ resetForm: true });
          this.props.form.resetFields();
          this.setState({
            targetResidueType: '',
            isSwabParameterConfigured: false,
            isRinseParameterConfigured: false,
            resetForm: false
          });
        }
      });
    } else {
      // if not show error
      onNoParametersConfiguredError()
    }
  };

  onResidueTypeSelect = (value) => {
    this.setState({
      targetResidueType: value
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='form-wrapper'>
        <Form layout="horizontal" onSubmit={this.handleSubmit} className='form-container'>
          <Form.Item label="Analytical Method ID">
            {getFieldDecorator('analyticalMethodID', {
              rules: [{ required: true, message: 'Please input analytical method ID' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="Target Residue Type">
            {getFieldDecorator('targetResidueType', {
              rules: [{ required: true, message: 'Please input target residue type' }],
            })(
              <Select initialtValue="API" onChange={(value) => this.onResidueTypeSelect(value)}>
                <Option value="API">API</Option>
                <Option value="Cleaning Agent">Cleaning Agent</Option>
                <Option value="Bioburden">Bioburden</Option>
                <Option value="Endotoxin">Endotoxin</Option>
              </Select>
            )}
          </Form.Item>

          <RenderTargetResidueTypeFields
            targetResidueType={this.state.targetResidueType}
            form={this.props.form}
            isSwabConfigured={this.isSwabConfigured}
            isRinseConfigured={this.isRinseConfigured}
            resetForm={this.resetForm}
          />

          <Form.Item label="Reason">
            {getFieldDecorator('reason', {
              rules: [{ required: true, message: 'Please input reason' }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
          </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedRenderForm = Form.create({ name: 'form' })(RenderForm);

export default WrappedRenderForm;