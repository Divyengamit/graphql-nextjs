import { CUSTOMER_REGISTRATION_STEP1 } from "@/graphql/register";
import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
// import client from "../apollo-client";

// export async function getStaticProps() {
//   const { data } = await client.query({
//     query: gql`
//       query Countries {
//         countries {
//           code
//           name
//           emoji
//         }
//       }
//     `,
//   });
//   // console.log("data", data);

//   return {
//     props: {
//       countries: data.countries.slice(0, 4),
//     },
//   };
// }

//  Increments a back-end counter and gets its resulting value

export default function Home() {
  const [myFunctionAPICall, { data, loading, error }] = useMutation(
    CUSTOMER_REGISTRATION_STEP1
  );
  console.log("data", data);
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  const onclickMutation = () => {
    myFunctionAPICall({
      variables: {
        firstName: "f-name",
        middleName: "m-name",
        lastName: "l-name",
        mobileNo: "8855669988",
        dob: "1998-05-05",
        termConditionConsent: true,
      },
    })
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => {
        console.log(typeof error);
        console.log(Object.keys(error));

        console.log("");
        console.log("error", error.message);
      });
  };
  return (
    <>
      <Button variant="contained" onClick={onclickMutation}>
        Call
      </Button>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
