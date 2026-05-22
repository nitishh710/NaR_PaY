import { Scanner } from "@yudiel/react-qr-scanner";

function QRScanner({
  onScan,
}) {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Scanner
        onScan={(result) => {
          if (
            result?.[0]
              ?.rawValue
          ) {
            console.log(
              result[0]
                .rawValue
            );

            onScan(
              result[0]
                .rawValue
            );
          }
        }}
        onError={(error) =>
          console.log(error)
        }
      />
    </div>
  );
}

export default QRScanner;