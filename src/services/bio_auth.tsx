// import { AvailableResult, NativeBiometric } from "capacitor-native-biometric";
import { BiometricWrapper } from "@awesome-cordova-plugins/biometric-wrapper";

export const setCredential = () => {
  // Save user's credentials
  //   NativeBiometric.setCredentials({
  //     username: "username",
  //     password: "password",
  //     server: "www.example.com",
  //   }).then();
  BiometricWrapper.activateFingerprint({ PID_XML: "&lt;pid-xml/>" })
    .then((res: any) => {})
    .catch((error: any) => {});
};

// export const deleteCredential = () => {
//   // Delete user's credentials
//   NativeBiometric.deleteCredentials({
//     server: "www.example.com",
//   });
// };

// export const checkCredential = () => {
//   NativeBiometric.isAvailable().then((result: AvailableResult) => {
//     const isAvailable = result.isAvailable;
//     alert("RESULT " + JSON.stringify(result));
//     // const isFaceId=result.biometryType==BiometryType.FACE_ID;
//     // const isFaceId = result.biometryType == BiometryType.FACE_ID;

//     if (isAvailable) {
//       // Get user's credentials
//       NativeBiometric.getCredentials({
//         server: "www.example.com",
//       }).then((credentials) => {
//         alert("CREDENTIAL " + JSON.stringify(credentials));
//         // Authenticate using biometrics before logging the user in
//         NativeBiometric.verifyIdentity({
//           reason: "For easy log in",
//           title: "Log in",
//           subtitle: "Maybe add subtitle here?",
//           description: "Maybe a description too?",
//         })
//           .then(() => {
//             //     // Authentication successful
//             alert("SUCCESS!!");
//             //     // this.login(credentials.username, credentials.password);
//           })
//           .catch((err) => {
//             //   // Failed to authenticate
//             alert("FAIL!");
//           });
//       });
//     }
//   });
// };
