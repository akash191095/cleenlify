import React from 'react';
import { Card, Button, Form, Input, Select } from 'antd';

const { Option } = Select;

class AddMOC extends React.Component {
  state = { addMOCIsOpen: false, mocItems: [] };

  onAddMOC = () => {
    this.setState({ addMOCIsOpen: true });
    this.addAMocField();
  };

  addAMocField = () => {
    if (this.props.form) {
      const { getFieldDecorator } = this.props.form;
      const randomKey = Math.random();
      
      //START HERE

      let item = (
        <React.Fragment key={randomKey}>
          <Form.Item label="Select MOC"
            style={{ display: 'inline-block', width: 'calc(70% - 12px)', marginRight: '10px' }}>
            {getFieldDecorator('selectMOC', {
              rules: [{ required: true, message: 'Please select MOC' }],
            })(
              <Select initialtValue="Stainless Steel">
                <Option value="Stainless Steel">Stainless Steel</Option>
                <Option value="Glass">Glass</Option>
                <Option value="Teflon">Teflon</Option>
                <Option value="Plastic">Plastic</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Recovery (%)"
            style={{ display: 'inline-block', width: 'calc(25% - 12px)', marginLeft: '10px' }}>
            {getFieldDecorator('mocRecovery', {
              rules: [{ required: true, message: 'Please input recovery percentage' }],
            })(
              <React.Fragment>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Input />
                  <p style={{margin: '0'}}>X</p>
                </div>
              </React.Fragment>
            )}
          </Form.Item>
        </React.Fragment>
      );

      this.setState({
        mocItems: [...this.state.mocItems, item]
      });
    }
  };

  render() {
    return (
      <div>
        {
          this.state.mocItems.length <= 0 &&
          <Button type="primary" ghost
            style={{ width: '100%', marginBottom: '1em' }}
            onClick={() => this.onAddMOC()}
          >
            Add MOC
        </Button>
        }
        {
          this.state.mocItems.length > 0 &&
          <Card style={{ backgroundColor: '#f2f2f2' }}>
            {this.state.mocItems}
          </Card>
        }
      </div>
    );
  };
}

export default AddMOC;