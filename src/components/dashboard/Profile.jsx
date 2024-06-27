import React from 'react'

function Profile(props) {
  const data = props.data;
  return (
    <div className="p-16">
  <div className="p-8 bg-white shadow mt-24">
     
    <div className="grid grid-cols-1 md:grid-cols-3">
       
      <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
         
        <div>
           
          <p className="font-bold text-gray-700 text-xl">22</p> 
          <p className="text-gray-400">Friends</p> 
        </div> 
        <div>
           
          <p className="font-bold text-gray-700 text-xl">10</p> 
          <p className="text-gray-400">Photos</p> 
        </div> 
        <div>
           
          <p className="font-bold text-gray-700 text-xl">89</p> 
          <p className="text-gray-400">Comments</p> 
        </div> 
      </div> 
      <div className="relative">
         
        <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
        {data.profile && data.profile.length !== 0 ? (
  <img src={data.profile} alt="Profile" className="h-24 w-24" />
) : (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-24 w-24"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
)}

        </div> 
      </div> 
      <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
        <button className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
           
          Connect
        </button> 
        <button className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
           
          Message
        </button> 
      </div>
    </div> 
    <div className="mt-20 text-center border-b pb-12">
       
      <h1 className="text-4xl font-medium text-gray-700">
        {data.user_name} <span className="font-light text-gray-500">( {data.roll_no} )</span>
      </h1> 
      <p className="font-light text-gray-600 mt-3">{data.city.length!==0?data.city:"city"} , { data.state.length!==0?data.state:"state"}</p> 
      <p className="mt-8 text-gray-500">
      <span className="text-sm font-medium text-gray-500 mt-2">About: </span>
      {data.about_me.length!==0?data.about_me:"null" }
      </p> 
    </div> 
    
    <div className="bg-white overflow-hidden shadow rounded-lg border mt-3">
  <div className="px-4 py-5 sm:px-6">
    <h3 className="text-lg leading-6 font-medium text-gray-900">
      User Profile
    </h3>
    <p className="mt-1 max-w-2xl text-sm text-gray-500">
      This is some information about the user.
    </p>
  </div>
  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
    <dl className="sm:divide-y sm:divide-gray-200">
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Full name</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.name}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Email address</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
      {data.email}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Phone number</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.phone_number}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">DOB</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.dob}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Street name</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.street}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">House No</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.building}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">City</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.city}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">State</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.state}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Postal code</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.postal_code}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Gender</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {data.gender}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Facebook</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.fb_handle}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Twitter</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.twitter_handle}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Instagram</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.insta_handle}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">LinkedIn</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.linekdin_handle}
        </dd>
      </div>
      <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
        <dt className="text-sm font-medium text-gray-500">Github</dt>
        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
          {data.github}
        </dd>
      </div>
    </dl>
  </div>
</div>

  </div>
  
  
</div>

  )
}

export default Profile
