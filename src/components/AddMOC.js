import React from 'react';
import { Card, Button, Form, Select, Icon, InputNumber } from 'antd';

const { Option } = Select;
let id = 0;

class AddMOC extends React.Component {
  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++ + this.props.parameterName);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };


  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      if (!k.includes(this.props.parameterName)) {
        return [];
      };
      
      return (
        <React.Fragment key={k}>
          <Card style={{ backgroundColor: '#f2f2f2' }}>
            <Form.Item 
              label="Select MOC"
              required={true}
              key={k + 'select-moc'}
              style={{ display: 'inline-block', width: 'calc(65% - 12px)', marginRight: '10px' }}>
              {getFieldDecorator(`selectMOC[${k}]` + this.props.parameterName, {
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
            <Form.Item 
              label="Recovery (%)"
              required={true}
              style={{ display: 'inline-block', width: 'calc(25% - 12px)', marginLeft: '10px' }}
              className='input-inLine'
            >
              {getFieldDecorator(`mocRecovery[${k}]` + this.props.parameterName, {
                rules: [{ required: true, message: 'Please input recovery percentage' }],
              })(
                <InputNumber min={0} max={100} />
              )}
              <Icon
                type="close"
                onClick={() => this.remove(k)}
              />
            </Form.Item>
            <p onClick={() => this.add()}
              style={{ width: '50%', margin: '0', marginBottom: '1em', color: 'blue' }}
            >
              Add Another
          </p>
          </Card>
        </React.Fragment>
      );
    });

    return (
      <div>
        {true &&
          <Button type="primary" ghost
            style={{ width: '100%', marginBottom: '1em' }}
            onClick={() => this.add()}
          >
            Add MOC
          </Button>}

        {formItems}
      </div>
    );
  };
}

export default AddMOC;