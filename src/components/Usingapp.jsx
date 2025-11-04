import React from 'react'

const Usingapp = () => {
  return (
    
<div className=" p-6  ">
  <h1 className="text-2xl font-bold text-center mb-6">How to Use This Web App</h1>
  
  
  
  
 <style>
{`
@keyframes arrowMove {
  0%,100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}
.arrow-anim {
  animation: arrowMove 1.2s infinite;
}
`}
</style>

<div className="w-full flex flex-col md:flex-row flex-wrap  items-center justify-center gap-6 md:gap-4 mt-6">

  {[
    {
      img: "assets/undraw_access-account_aydp.svg",
      step: "Step 1",
      title: "Sign Up & Log In",
      desc: "Create your account and log in to start using all features."
    },
    {
      img: "assets/undraw_forms_1ciz.svg",
      step: "Step 2",
      title: "Become a Service Provider",
      desc: "Fill the provider form to list your services."
    },
    {
      img: "assets/undraw_publish-article_u3z6.svg",
      step: "Step 3",
      title: "Submit Profile",
      desc: "Submit your details and get listed for users to find."
    },
    {
      img: "assets/undraw_search-app_cpm0.svg",
      step: "Step 4",
      title: "Search for Services",
      desc: "Enter service name and explore available providers."
    },
    {
      img: "assets/undraw_completing_3pe7.svg",
      step: "Step 5",
      title: "Contact & Get Work Done",
      desc: "Select a provider and contact them to complete the service."
    }
  ].map((item, i, arr) => (
    <div key={i} className="flex items-center gap-4">

      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-[280px] flex flex-col items-center text-center border border-gray-200 hover:shadow-xl transition">
        <img src={item.img} alt="" className="w-[180px] mb-3" />
        <p className="text-blue-600 font-bold text-lg">{item.step}</p>
        <h3 className="font-semibold text-gray-800 text-md mt-1">{item.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
      </div>

      {/* Animated Arrow */}
      {i !== arr.length - 1 && (
        <div className="hidden md:flex text-3xl font-bold text-blue-500 arrow-anim">
          ➜
        </div>
      )}

    </div>
  ))}

</div>



</div>

    
  )
}

export default Usingapp