import { QrReader }
from "react-qr-reader";

function QRScanner({
  onScan,
}) {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <QrReader
        constraints={{
          facingMode:
            "environment",
        }}
        onResult={(
          result,
          error
        ) => {
          if (!!result) {
            onScan(
              result?.text
            );
          }
        }}
        style={{
          width: "100%",
        }}
      />
    </div>
  );
}

export default QRScanner;