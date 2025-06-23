export const admissionFields = [
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "example@domain.com",
  },
  {
    name: "name",
    label: "Full Name",
    placeholder: "John Doe",
  },
  {
    name: "country",
    label: "Country",
    placeholder: "India",
    isCountrySelect:true,
  },
  {
    name: "nationality",
    label: "Nationality",
    placeholder: "Indian",
    isCountrySelect:true,

  },
  {
    name: "interestedCourse",
    label: "Course / Degree",
    placeholder: "B.Tech",
  },
  {
    name: "interestedBranch",
    label: "Branch",
    placeholder: "Information Technology",
  },
  {
    name: "alternateMail",
    label: "Alternate Email",
    type: "email",
    placeholder: "alt@example.com",
  },
  {
    name: "whatsappNumber",
    label: "WhatsApp Number",
    type: "tel",
    placeholder: "+91XXXXXXXXXX",
  },
  {
    name: "remarks",
    label: "Remarks",
    isTextArea: true,
    placeholder: "Any comments or questions...",
  },
]

export const defaultValues = {
    email: "",
    name: "",
    country: "",
    nationality: "",
    interestedCourse: "",
    interestedBranch: "",
    alternateMail: "",
    whatsappNumber: "",
    remarks: "",
}