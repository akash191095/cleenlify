import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import '../styles/render-form.css';
import RenderTargetResidueTypeFields from './RenderTargetResidueTypeFields';

const { Option } = Select;

// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }


class RenderForm extends React.Component {
  state = { targetResidueType: '' };

  componentDidMount() {
    // Use to disabled submit button at the beginning.
    // this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        localStorage.setItem(values.analyticalMethodID, JSON.stringify(values));
      }
    });
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
        <Form layout="horizontal" onSubmit={this.handleSubmit} style={{ width: '40%' }}>
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

          <RenderTargetResidueTypeFields targetResidueType={this.state.targetResidueType} form={this.props.form} />

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