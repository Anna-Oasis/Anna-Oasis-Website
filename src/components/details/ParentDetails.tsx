import TextField from "@/components/formComponents/TextField";
import PhoneInputField from "@/components/formComponents/PhoneInputField";
import SelectField from "@/components/formComponents/SelectField";
import countries from "@/constants/countries";
import indianStates from "@/constants/indianStates";
import Text from "@/components/ui/text";

const ParentDetails = () => (
  <>
    <div className="p-4 max-w-3xl mx-auto bg-white rounded-xl shadow-md transition-all duration-300">
      <Text bold size="xl" className="mb-4 text-center text-blue-700">
        Parent's Details
      </Text>
    </div>

    {/* Father Details */}
    <hr className="my-6" />
    <Text bold size="lg" className="mb-2 text-blue-600">Father's Details</Text>
    <TextField label="Father's Name" value="fatherName" placeholder="Father's name" />
    <TextField label="Father's Occupation" value="fatherOccupation" placeholder="Father's occupation" />
    <PhoneInputField label="Father's Mobile" value="fatherMobile" placeholder="Father's phone number" />
    <TextField label="Father's Email" value="fatherEmail" placeholder="Father's email" />
    <SelectField label="Father's Country" value="fatherCountry" options={countries} />

    {/* Mother Details */}
    <hr className="my-6" />
    <Text bold size="lg" className="mb-2 text-blue-600">Mother's Details</Text>
    <TextField label="Mother's Name" value="motherName" placeholder="Mother's name" />
    <TextField label="Mother's Occupation" value="motherOccupation" placeholder="Mother's occupation" />
    <PhoneInputField label="Mother's Mobile" value="motherMobile" placeholder="Mother's phone number" />
    <TextField label="Mother's Email" value="motherEmail" placeholder="Mother's email" />
    <SelectField label="Mother's Country" value="motherCountry" options={countries} />

    {/* Residential Address (India) */}
    <hr className="my-6" />
    <Text bold size="lg" className="mb-2 text-blue-600">Residential Address (India)</Text>
    <TextField label="Indian House No" value="resIndiaHouseNo" placeholder="House No" />
    <TextField label="Indian Street" value="resIndiaStreet" placeholder="Street" />
    <TextField label="Indian City" value="resIndiaCity" placeholder="City" />
    <SelectField label="Indian State" value="resIndiaState" options={indianStates} />
    <TextField label="Indian Postal Code" value="resIndiaPostalCode" placeholder="Postal Code" />

    {/* Residential Address (Foreign) */}
    <hr className="my-6" />
    <Text bold size="lg" className="mb-2 text-blue-600">Residential Address (Foreign)</Text>
    <TextField label="Foreign House No" value="resForeignHouseNo" placeholder="House No" />
    <TextField label="Foreign Street" value="resForeignStreet" placeholder="Street" />
    <TextField label="Foreign City" value="resForeignCity" placeholder="City" />
    <TextField label="Foreign State" value="resForeignState" placeholder="State" />
    <SelectField label="Foreign Country" value="resForeignCountry" options={countries} />
    <TextField label="Foreign Postal Code" value="resForeignPostalCode" placeholder="Postal Code" />
  </>
);

export default ParentDetails;