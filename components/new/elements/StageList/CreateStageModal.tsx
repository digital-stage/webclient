/** @jsxRuntime classic */
/** @jsx jsx */
import * as React from 'react';
import {
  jsx, Button, Flex, Heading,
} from 'theme-ui';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import useStageActions from '../../../../lib/digitalstage/useStageActions';
import Modal from '../Modal';
import InputField from '../../../InputField';

export interface Values {
  name: string,
  password: string,
  repeatPassword: string,
  width: number,
  length: number,
  height: number,
  damping: number,
  absorption: number
}
export interface IError {
  name?: string,
  password?: string,
  repeatPassword?: string,
  width?: string,
  length?: string,
  height?: string,
  damping?: string,
  absorption?: string
}

const CreateStageSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Zu kurz')
    .max(100, 'Zu lang')
    .required('Wird benötigt'),
  password: Yup.string()
    .min(5, 'Zu kurz')
    .max(50, 'Zu lang')
    .oneOf([Yup.ref('repeatPassword'), null], 'Passwords must match'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  width: Yup.number()
    .min(0.1)
    .max(1000),
  length: Yup.number()
    .min(0.1)
    .max(1000),
  height: Yup.number()
    .min(0.1)
    .max(1000),
  absorption: Yup.number()
    .min(0.1)
    .max(1),
  reflection: Yup.number()
    .min(0.1)
    .max(1),
});

const CreateStageModal = (props: { isOpen?: boolean; onClose?: () => any }) => {
  const { isOpen, onClose } = props;
  const { createStage } = useStageActions();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <Formik
        initialValues={{
          name: '',
          password: '',
          repeatPassword: '',
          width: 25,
          length: 13,
          height: 7.5,
          damping: 0.7,
          absorption: 0.6,
        }}
        validationSchema={CreateStageSchema}
        onSubmit={(values: Values) => {
          createStage(
            values.name,
            values.password,
            values.width,
            values.length,
            values.height,
            values.damping,
            values.absorption,
          );
          props.onClose();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Heading as="h3" sx={{ color: 'background', fontSize: 3 }}>Neue Bühne erstellen</Heading>
            <Field
              as={InputField}
              type="text"
              name="name"
              id="name"
              label="Stage name"
              version="dark"
              error={errors.name && touched.name}
            />
            <Field
              as={InputField}
              required={false}
              type="text"
              name="password"
              id="password"
              label="Password"
              version="dark"
              error={errors.password && touched.password}
            />
            <Field
              as={InputField}
              type="text"
              name="repeatPassword"
              id="repeatPassword"
              label="Repeat password"
              version="dark"
              error={errors.repeatPassword && touched.repeatPassword}
            />
            {/**
          <Accordion>
            <Panel title="Erweiterte Einstellungen">
              <FormControl
                label={() => 'Breite'}
                caption={() => 'Breite der Bühne'}
                error={formik.errors.width}
              >
                <Input
                  type="number"
                  name="width"
                  required={false}
                  value={formik.values.width}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
              <FormControl
                label={() => 'Länge'}
                caption={() => 'Länge der Bühne'}
                error={formik.errors.length}
              >
                <Input
                  type="number"
                  name="length"
                  required={false}
                  value={formik.values.length}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
              <FormControl
                label={() => 'Höhe'}
                caption={() => 'Höhe der Bühne'}
                error={formik.errors.height}
              >
                <Input
                  type="number"
                  name="height"
                  required={false}
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
              <FormControl
                label={() => 'Absorption'}
                caption={() => 'Dämpfungsfaktor der Bühnenwände'}
                error={formik.errors.damping}
              >
                <Input
                  type="number"
                  name="reflection"
                  required={false}
                  value={formik.values.damping}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
              <FormControl
                label={() => 'Absorption'}
                caption={() => 'Absorption der Bühnenwände'}
                error={formik.errors.absorption}
              >
                <Input
                  type="number"
                  name="absorption"
                  required={false}
                  value={formik.values.absorption}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormControl>
            </Panel>
          </Accordion>
          */}
            <Flex sx={{ justifyContent: 'space-between', py: 3 }}>
              <Button variant="black" type="button" onClick={onClose}>
                Abbrechen
              </Button>
              <Button type="submit">
                Erstellen
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
export default CreateStageModal;
