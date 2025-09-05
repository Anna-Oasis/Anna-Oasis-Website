import TextField from "@/components/formComponents/TextField";
import PhoneInputField from "@/components/formComponents/PhoneInputField";
import SelectField from "@/components/formComponents/SelectField";
import indianStates from "@/constants/indianStates";
import  Text  from "../ui/text";

const LocalGuardian = () => (
  <>
  <div className="p-4 max-w-3xl mx-auto bg-white rounded-xl shadow-md transition-all duration-300">
    <Text bold size="xl" className="mb-4 text-center text-blue-700">
      Local Guardian's Details
    </Text>
  </div>
    <TextField label="Guardian Name" value="localGuardianName" placeholder="Name" />
    <TextField
      label="Relationship"
      value="localGuardianRelationship"
      placeholder="Relationship"
    />
    <PhoneInputField
      label="Guardian Mobile"
      value="localGuardianMobile"
      placeholder="Guardian's phone number"
    />
    <TextField
      label="Guardian Email"
      value="localGuardianEmail"
      placeholder="Email"
    />
    <TextField
      label="Guardian House No"
      value="guardianHouseNo"
      placeholder="House No"
    />
    <TextField
      label="Guardian Street"
      value="guardianStreet"
      placeholder="Street"
    />
    <TextField label="Guardian City" value="guardianCity" placeholder="City" />
    <SelectField
      label="Guardian State"
      value="guardianState"
      options={indianStates}
    />
    <TextField
      label="Guardian Postal Code"
      value="guardianPostalCode"
      placeholder="Postal Code"
    />
  </>
);

export default LocalGuardian;
