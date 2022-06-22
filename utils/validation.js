import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid Email")
    .required("Email is required"),
  // password: yup
  //   .string()
  //   .matches(
  //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=.*[a-zA-Z]).{8,}$/g,
  //     "Password must contain upper case, lower case and special character"
  //   )
  //   .required("Password is required")
  //   .trim(),
});

const SignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Invalid first name")
    .trim()
    .required("First name is required"),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Invalid last name")
    .trim()
    .required("Last name is required"),
  middleName: yup
    .string()
    .trim()
    .matches(/^(([a-zA-Z ])|(.{0}))+$/, "Invalid middle name"),
  dob: yup.string().required("Select Date of Birth"),
  agreement: yup.bool(),
  mobileNo: yup
    .string()
    .trim()
    .max(10, "Enter valid phone number")
    .required("Phone number is required")
    .test("len", "Enter valid phone number", (val) => val?.length === 10),
});

const createPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email("Invalid Email")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .trim()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Both password should match")
    .required("Please type password again"),
});

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .trim()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Both password should match")
    .required("Please type password again"),
});

const ProfileSchema = yup.object().shape({
  cardName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Invalid card name")
    .trim()
    .required("Card name is required"),
  // dob: yup.string().required("Select sate of birth"),
  addressLine: yup.string().required("Address is required"),
  addressLine2: yup.string().required("Address 2 is required"),
  city: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Invalid Town / City")
    .required("Town / City is Required"),
  pincode: yup
    .string()
    .trim()
    .required("Pincode is required")
    .test("len", "Enter Valid Pincode", (val) => val?.length === 6)
    .matches(/^[0-9]+$/, "Enter Valid Pincode"),
});

const DocumentSchema = yup.object().shape({
  docType: yup.string().trim().required("Document type is required"),
  PanNumber: yup.string().when("docType", {
    is: "PAN",
    then: yup
      .string()
      .required("Document Number is required")
      .matches(/^$|^[A-Z0-9]{10}$/, "Invalid Pan Number"),
  }),
  AadharNumber: yup.string().when("docType", {
    is: "AADHAAR",
    then: yup
      .string()
      .required("Document Number is required")
      .matches(
        /^$|^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
        "Invalid Aadhaar number"
      ),
  }),
  docImage: yup.mixed().required("File is required"),
  agreement: yup.bool(),
});

const EquipmentFinanceSchema = yup.object().shape({
  // universityName: yup.string().trim().required("University name required"),
  // qualificationYear: yup
  //   .string()
  //   .trim()
  //   .required("Qualification year required")
  //   .test("len", "Enter Valid Year", (val) => val?.length === 4),
  // registrationNo: yup.string().trim().required("Registration number required"),
  // stateMedicalCouncil: yup
  //   .string()
  //   .trim()
  //   .required(" State medical council required"),
  experience: yup
    .string()
    .trim()
    .required(" Years of experience required")
    .min(0, "Min value 0."),
  annualIncome: yup.string().trim().required(" Annual income required"),
  // hospitalName: yup
  //   .string()
  //   .trim()
  //   .required("Hospital/Diagnostic/Clinic Centre name required"),
  // hospitalVintage: yup
  //   .string()
  //   .trim()
  //   .required("Hospital/Diagnostic/Clinic Centre Vintage required"),
  // businessStatus: yup
  //   .string()
  //   .trim()
  //   .required("Business ownership status  is required"),
  // bankStmtFile: yup.mixed(),
});
const addAddressSchema = yup.object().shape({
  address1: yup.string().required("Address is Required"),
  address2: yup.string().required("Address 2 is Required"),
  city: yup.string().required("Town / City is Required"),
  pincode: yup
    .string()
    .trim()
    .required("Pincode is required")
    .test("len", "Enter Valid Pincode", (val) => val?.length === 6),
});

const addEmailSchema = yup.object().shape({
  emailAddress: yup
    .string()
    .trim()
    .email("Invalid Email")
    .required("Email is required"),
});

export {
  loginSchema,
  SignUpSchema,
  createPasswordSchema,
  ProfileSchema,
  DocumentSchema,
  resetPasswordSchema,
  EquipmentFinanceSchema,
  addAddressSchema,
  addEmailSchema,
};
