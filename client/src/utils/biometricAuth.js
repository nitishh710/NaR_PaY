export const registerBiometric =
  async () => {
    try {
      if (
        !window.PublicKeyCredential
      ) {
        alert(
          "Biometric authentication not supported"
        );

        return false;
      }

      const publicKey = {
        challenge:
          new Uint8Array(32),

        rp: {
          name: "NARpay",
        },

        user: {
          id:
            new Uint8Array(16),

          name:
            "narpayuser",

          displayName:
            "NARpay User",
        },

        pubKeyCredParams: [
          {
            type:
              "public-key",

            alg: -7,
          },
        ],

        authenticatorSelection:
          {
            authenticatorAttachment:
              "platform",

            userVerification:
              "required",
          },

        timeout: 60000,

        attestation: "direct",
      };

      const credential =
        await navigator.credentials.create(
          {
            publicKey,
          }
        );

      if (credential) {
        localStorage.setItem(
          "biometricEnabled",
          "true"
        );

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);

      return false;
    }
  };
  export const verifyBiometric =
  async () => {
    try {
      const publicKey = {
        challenge:
          new Uint8Array(32),

        allowCredentials: [],

        timeout: 60000,

        userVerification:
          "required",
      };

      const assertion =
        await navigator.credentials.get(
          {
            publicKey,
          }
        );

      return !!assertion;
    } catch (error) {
      console.log(error);

      return false;
    }
  };