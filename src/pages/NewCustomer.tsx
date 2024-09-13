import React, { useState } from "react";
import { Button, Form, Input } from "antd";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  address1: string;
  address2: string;
}

const NewCustomer: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
  });

  const [errors, setErrors] = useState<Partial<FormValues>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validate = () => {
    const tempErrors: Partial<FormValues> = {};

    if (!formValues.firstName) tempErrors.firstName = "First Name is required";
    if (!formValues.lastName) tempErrors.lastName = "Last Name is required";
    if (!formValues.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formValues.contact) {
      tempErrors.contact = "Contact number is required";
    } else if (!/^[0-9]+$/.test(formValues.contact)) {
      tempErrors.contact = "Contact number is not valid";
    }
    if (!formValues.address1) tempErrors.address1 = "Address 1 is required";
    if (!formValues.address2) tempErrors.address2 = "Address 2 is required";

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      console.log(formValues);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Create a New User Profile</h1>
      <Form layout="vertical" className="space-y-4">
        <Form.Item
          label="First Name"
          validateStatus={errors.firstName ? "error" : ""}
          help={errors.firstName}
        >
          <Input
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          validateStatus={errors.lastName ? "error" : ""}
          help={errors.lastName}
        >
          <Input
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email}
        >
          <Input
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Contact Number"
          validateStatus={errors.contact ? "error" : ""}
          help={errors.contact}
        >
          <Input
            name="contact"
            value={formValues.contact}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Address 1"
          validateStatus={errors.address1 ? "error" : ""}
          help={errors.address1}
        >
          <Input
            name="address1"
            value={formValues.address1}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item
          label="Address 2"
          validateStatus={errors.address2 ? "error" : ""}
          help={errors.address2}
        >
          <Input
            name="address2"
            value={formValues.address2}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Button type="primary" onClick={handleSubmit}>
          Create New User
        </Button>
      </Form>
    </div>
  );
};

export default NewCustomer;
