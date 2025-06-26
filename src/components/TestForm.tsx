import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "./formComponents/TextField";
import CheckBoxField from "./formComponents/CheckboxField";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  interests: Yup.array().min(1, "Select at least one interest"),
});

function TestForm() {
  return (
    <Formik
      initialValues={{ name: "", email: "", interests: [] }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {() => (
        <Form>
          <TextField label="Name" placeholder="Enter your name" value="name" />
          <TextField label="Email" placeholder="Enter your email" value="email" />
          <CheckBoxField
            label="Interests"
            value="interests"
            options={[
              { label: "Sports", value: "sports" },
              { label: "Music", value: "music" },
              { label: "Reading", value: "reading" },
            ]}
          />
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default TestForm;
