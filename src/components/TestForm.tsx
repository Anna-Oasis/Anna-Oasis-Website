import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "@/components/formComponents/TextField";
import CheckBoxField from "@/components/formComponents/CheckboxField";
import DateAndTimePicker from "@/components/formComponents/DatePicker";
import TimePickerField from "@/components/formComponents/TimePicker";
import ImagePickerField from "@/components/formComponents/ImagePickerField";
import MultiLineText from "@/components/formComponents/MultiLineText";
import PasswordField from "@/components/formComponents/PasswordField";
import PhoneInputField from "@/components/formComponents/PhoneInputField";
import RadioField from "@/components/formComponents/RadioField";
import SelectField from "@/components/formComponents/SelectField";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  interests: Yup.array().min(1, "Select at least one interest"),
  appointment: Yup.string().required("Select a date and time"),
  time: Yup.string().required("Select a time"),
  image: Yup.string().required("Please upload an image"),
  message: Yup.string().required("Message is required"),
  password: Yup.string().required("Password is required"),
  phone: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  select: Yup.string().required("Please select an option"),
});

function TestForm() {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        interests: [],
        appointment: "",
        time: "",
        image: "",
        message: "",
        password: "",
        phone: "",
        gender: "",
        select: "",
      }}
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
          <DateAndTimePicker
            label="Appointment"
            value="appointment"
            showDate={true}
            showTime={true}
            placeholder="Select date and time"
          />
          <TimePickerField
            label="Time"
            value="time"
            placeholder="Select time"
          />
          <ImagePickerField
            label="Profile Picture"
            value="image"
            placeholder="No image selected"
          />
          <MultiLineText
            label="Message"
            placeholder="Type your message here."
            value="message"
          />
          <PasswordField
            label="Password"
            placeholder="Enter your password"
            value="password"
          />
          <PhoneInputField label="Phone" placeholder="Enter your phone number" value="phone" />
          <RadioField
            label="Gender"
            value="gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
          />
          <SelectField
            label="Select Option"
            value="select"
            options={[
              { label: "Option 1", value: "option1" },
              { label: "Option 2", value: "option2" },
              { label: "Option 3", value: "option3" },
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
