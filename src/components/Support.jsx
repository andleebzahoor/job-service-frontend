import React from "react";
import Navbar from "./Nav.jsx";
import Footer from "./Footer.jsx"

export default function Support() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-100 px-6 py-12 flex flex-col items-center overflow-x-hidden">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Support & Help Center
      </h1>

      <p className="text-gray-700 max-w-2xl text-center leading-relaxed mb-10">
        We are here to help you. Whether you are a worker or a customer, if you need
        any assistance, feel free to contact us. Our goal is to support local workers
        and make it easy for customers to get services.
      </p>

      <div className="bg-white shadow-md rounded-xl p-6 max-w-2xl w-full mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          How Can We Help You?
        </h2>
        <ul className="text-gray-600 space-y-2 text-sm">
          <li>✔️ Issues with account or login</li>
          <li>✔️ Help finding a worker or service</li>
          <li>✔️ Worker profile updates or problems</li>
          <li>✔️ Report a problem or fake profile</li>
          <li>✔️ Feedback or suggestions</li>
        </ul>
      </div>

      

      <div className="bg-blue-600 text-white rounded-xl p-6 max-w-2xl text-center shadow-lg">
        <h2 className="text-xl font-semibold mb-2">Need Quick Help?</h2>
        <p className="text-white/90 text-sm mb-3">
          Send us your issue and we will get back to you soon.
        </p>
        <section class="p-6 md:p-12 bg-gray-50">
  <div class="max-w-4xl mx-auto">

    <h2 class="text-3xl font-bold text-blue-600 mb-4">Support & Help</h2>
    <p class="text-gray-700 mb-8">
      We are here to support both local workers and customers. Find quick assistance, read our policies, or explore FAQs below.
    </p>

     {/* Contact Cards  */}
    <div class="grid md:grid-cols-3 gap-6 mb-12">
      <div class="p-5 bg-white shadow rounded-lg text-center">
        <h3 class="font-bold text-lg mb-2">📞 Call Us</h3>
        <p class="text-gray-600">+91 98765-43210</p>
      </div>

      <div class="p-5 bg-white shadow rounded-lg text-center">
        <h3 class="font-bold text-lg mb-2">📧 Email Support</h3>
        <p class="text-gray-600">support@localhelp.com</p>
      </div>

      <div class="p-5 bg-white shadow rounded-lg text-center">
        <h3 class="font-bold text-lg mb-2">💬 Live Chat</h3>
        <button class="mt-2 px-4 py-2 bg-blue-600 text-white rounded text-sm">Chat Now</button>
      </div>
    </div>


     {/* FAQ Section  */}
    <div class="mb-16">
      <h3 class="text-2xl font-semibold text-blue-600 mb-4">Frequently Asked Questions</h3>
      <ul class="space-y-4">
        <li>
          <strong>How do I hire a worker?</strong>
          <p class="text-gray-600">Search by service → View profile → Call or message directly.</p>
        </li>

        <li>
          <strong>How can a worker register?</strong>
          <p class="text-gray-600">Create an account → Choose provider → Fill details → Start working.</p>
        </li>

        <li>
          <strong>Is this platform free?</strong>
          <p class="text-gray-600">Yes, it's 100% free for both customers and workers.</p>
        </li>

        <li>
          <strong>How long does support take to respond?</strong>
          <p class="text-gray-600">Usually within 24 hours.</p>
        </li>
      </ul>
    </div>


    {/* Terms & Conditions  */}
    <div class="mb-12">
      <h3 class="text-2xl font-semibold text-blue-600 mb-3">Terms & Conditions</h3>
      <p class="text-gray-700 mb-2">
        By using our platform, you agree to provide accurate information and follow fair usage rules. 
        We only connect customers with local service providers—work quality and pricing are handled directly between both parties.
      </p>
      <p class="text-gray-700">
        Any misuse of our platform (fake profiles, fraud, spam) may result in account removal.
      </p>
    </div>



    <div class="mb-12">
      <h3 class="text-2xl font-semibold text-blue-600 mb-3">Privacy Policy</h3>
      <p class="text-gray-700 mb-2">
        Your data is safe with us. We only collect necessary information to connect customers with workers.
      </p>
      <p class="text-gray-700">
        We do not sell or share personal data. Contact information is shown only to help users connect for services.
      </p>
    </div>

  </div>
</section>

      </div>
    </div>
    <Footer/>
   </> 
  );
}