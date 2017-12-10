/**
 * Created by Administrator on 2017/12/10 0010.
 */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Input, DatePicker, Select, Button, Card, InputNumber, Radio, Icon, Tooltip,Modal,
  Table
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';
// import Table from "antd/es/table/Table.d";
// import Modal from "antd/es/modal/Modal.d";

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
@connect(state => ({
  submitting: state.form.regularFormSubmitting,
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 8},
      wrapperCol: { span: 14 },
    };
  return  (
    <PageHeaderLayout>
      <Card>
        <Form layout="inline">
          <FormItem
            label="Field A"
            {...formItemLayout}
          >
            <Input placeholder="input placeholder" />
          </FormItem>
          <FormItem
            label="Field B"
            {...formItemLayout}
          >
            <Input placeholder="input placeholder" />
          </FormItem>
          <FormItem>
            <Button type="primary">Submit</Button>
          </FormItem>
        </Form>
      </Card>
      <Card style={{marginTop:8}}>
        <Button type="primary"><Icon type="plus" />新增</Button>

      </Card>
    </PageHeaderLayout> )
  }
}
