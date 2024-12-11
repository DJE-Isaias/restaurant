export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-6">
          We would love to hear from you! Feel free to reach out to us using the
          information below.
        </p>

        <div className="space-y-6">
          {/* Address */}
          <div className="flex items-start space-x-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657m1.414-1.414L12 14l4.243 1.243m2.071-2.071A7.975 7.975 0 0012 6a7.975 7.975 0 00-5.657 2.343m11.314 0A7.975 7.975 0 0112 6m0 0a7.975 7.975 0 00-5.657 2.343"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold">Our Address</h2>
              <p className="text-gray-600">123 Main Street, Springfield, USA</p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start space-x-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12l4-4m0 0l-4-4m4 4H4"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold">Email Us</h2>
              <p className="text-gray-600">info@example.com</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start space-x-4">
            <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h1m6 0h1m2 0h1m6 0h1m2 0h1M9 16h1m4 0h1m2 0h1m2 0h1M3 20h1m6 0h1m4 0h1m2 0h1m2 0h1M9 4h1m4 0h1m2 0h1m2 0h1M3 4h1"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold">Call Us</h2>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
