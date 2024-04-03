export default function PaymentGateway(amount) {
  return new Promise(async (resolve, reject) => {
      try {
          // Fetch payment details from the backend
          const response = await fetch("http://localhost:5000/api/payment", {
              method: "POST",
              body: JSON.stringify({ amount }),
              headers: {
                  "Content-Type": "application/json",
              }
          });

          // Parse response data
          const data = await response.json();

          // Log payment details for debugging
          console.log("Payment data:", data);

          // Function to load Razorpay and handle payment
          const loadRazorpay = () => {
              console.log("window Razorpay:", window.Razorpay);
              if (window.Razorpay) {
                  const options = {
                      key: "rzp_test_H0imBRBCGuVydw",
                      currency: data.currency,
                      amount: data.amount,
                      name: "Travel",
                      description: "Wallet Transaction",
                      order_id: data.id,
                      handler: function (response) {
                          const razorpayPaymentId = response.razorpay_payment_id;
                          // Resolve the promise with the total amount
                          resolve(amount);
                      },
                      prefill: {
                          name: "Ruchir Parmar",
                          email: "ruchirgparmar@gmail.com",
                          contact: "9173497345",
                          notes: {
                            test_payment: 0 // Set a value to indicate it's not a test payment
                        }
                      },
                      
                  };
                  // Create a new Razorpay object and open payment dialog
                  const rzp1 = new window.Razorpay(options);
                  rzp1.open();
              } else {
                  // Retry loading Razorpay if it's not available yet
                  setTimeout(loadRazorpay, 100);
              }
          };

          // Call the function to load Razorpay and initiate payment
          loadRazorpay();
      } catch (error) {
          // Handle errors by logging and rejecting the promise
          console.error("Error fetching data:", error);
          reject(error);
      }
  });
}
