import React, { useState } from 'react'
import { Button, Col, Modal, ModalBody, ModalHeader, Row, Form } from 'reactstrap';
import { CustomSelectField } from '../../../helpers/customForms';
import { playerEmailTemplateType } from '../../../constants/config';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getSendEmailInitialValues, sendEmailValidationSchema } from '../formDetails';
import { useDispatch } from 'react-redux';
import { sendEmailPlayersStart } from '../../../store/actions';

const SendEmail = ({ header, toggle, show, user  }) => {
  const dispatch = useDispatch();
  const [selectedTemplate, seSelectedTemplate] = useState(playerEmailTemplateType?.[0] || '');

  const handleSubmitEntry = (data) => {
    dispatch(sendEmailPlayersStart(data))
  };

  const { validation, formFields } = useForm({
    initialValues: getSendEmailInitialValues(user, selectedTemplate),
    validationSchema: sendEmailValidationSchema(),
    onSubmitEntry: (values) => {
      handleSubmitEntry(values);
      toggle();
    },
  });

  return (
    <Modal isOpen={show} toggle={toggle} size='lg'>
      <ModalHeader toggle={toggle} tag='h4'>
        {header}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <Col>
              <CustomSelectField
                label="Select Email Template"
                type="select"
                onChange={(e) => {
                  seSelectedTemplate(e.target.value);
                }}
                placeholder="Select Provider"
                value={selectedTemplate}
                options={
                  <>
                    <option value="" selected>
                      Select Email Template
                    </option>
                    {playerEmailTemplateType?.map((template) => (
                      <option key={template} value={template}>
                        {template}
                      </option>
                    ))}
                  </>
                }
                invalid={
									!!(validation.touched?.templateType && validation.errors?.templateType)
								}
								isError
								errorMsg={validation.touched?.templateType && validation.errors?.templateType}
              />
            </Col>
            <Col className="text-end">
              <Button
                type="submit"
                className="btn btn-primary mt-4 pull-right"
                color="primary"
              >
                Send
              </Button>
            </Col>
          </Form>
        </Row>

      </ModalBody>
    </Modal>
  )
}

export default SendEmail
