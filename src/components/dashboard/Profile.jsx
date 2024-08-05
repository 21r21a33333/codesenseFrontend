import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa"; 
import axios from "axios";
import env from "../../../env";
import jwtToken from "../../helper/jwtToken";

function Profile(props) {
  const data = props.data;
  let [disPlayDetails, setDisPlayDetails] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [profileImage, setProfileImage] = useState("");
  const nav = useNavigate();
  
  useEffect(() => {
    if (data.profile) {
      setProfileImage(data.profile);
    }
  }, [data.profile]);

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
  
      if (validExtensions.includes(fileExtension)) {
        const formData = new FormData();
        formData.append('file', file);
  
        try {
          const response = await axios.post(`${env.SERVER_URL}/update/image`, formData, {
            headers: {
              'Authorization': 'Bearer ' + jwtToken(),
              'Content-Type': 'multipart/form-data'
            }
          });
  
          if (response.data && response.data.data) {
            console.log('Image uploaded:', response.data.data);
            setProfileImage(response.data.data);
          }
        } catch (error) {
          console.log('Error uploading image:', error);
          alert('Error uploading image. Please try again.');
        }
      } else {
        alert('Invalid file type. Please upload an image file (jpg, jpeg, png).');
      }
    }
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const validExtensions = ['pdf'];
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (validExtensions.includes(fileExtension)) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await axios.post(`${env.SERVER_URL}/update/resume`, formData, {
            headers: {
              'Authorization': 'Bearer ' + jwtToken(),
              'Content-Type': 'multipart/form-data'
            }
          });

          if (response.data && response.data.data) {
            console.log('Resume uploaded:', response.data.data);
            alert('resume updated/uploaded successfully , Reload the page');
            // Update the resume URL in the state or props
          }
        } catch (error) {
          console.log('Error uploading resume:', error);
          alert('Error uploading resume. Please try again.');
        }
      } else {
        alert('Invalid file type. Please upload a PDF file.');
      }
    }
  };

  // Function to check if the URL is a valid PDF URL
  const isValidPdfUrl = (url) => {
    return url.match(/\.(pdf)$/) != null;
  };

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
              {profileImage &&  profileImage.length !== 0 ? (
                <img src={profileImage} alt="Profile" className="h-full w-full object-cover rounded-full" />
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
              <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 focus:outline-none hover:bg-blue-700 transition duration-150" aria-label="Update Profile Image">
                <FaCamera />
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleProfileImageChange} />
              </button>
            </div>
          </div>
          <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
            <button className="text-white py-2 px-4 uppercase rounded bg-blue-600 hover:bg-blue-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
            <div onClick={() => { nav("editProfile", { state:{data}});}}>edit profile
</div>
            </button>
            <button onClick={() => { setDisPlayDetails(!disPlayDetails) }} className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
              View Complete Profile
            </button>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
          <h1 className="text-4xl font-medium text-gray-700">
            {data.user_name}{" "}
            <span className="font-light text-gray-500">( {data.roll_no} )</span>
          </h1>
          <p className="font-light text-gray-600 mt-3">
            {data.city ? data.city : "city"} ,{" "}
            {data.state ? data.state : "state"}
          </p>
          <p className="mt-8 text-gray-500">
            <span className="text-sm font-medium text-gray-500 mt-2">
              About:{" "}
            </span>
            {data.about_me ? data.about_me : "null"}
          </p>
          <div className="flex justify-start space-x-4">  {/* Added space-x-4 */}
    <button
      onClick={() => setShowModal(true)}
      className="text-white py-2 px-4 rounded bg-blue-600 hover:bg-blue-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 mt-8"
    >
      Resume
    </button>
    <button
      className="text-white py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 mt-8"
    >
      <label htmlFor="resume-upload" className="cursor-pointer">
        Update Resume
      </label>
      <input
        type="file"
        id="resume-upload"
        accept=".pdf"
        className="hidden"
        onChange={handleResumeUpload}
      />
    </button>
</div>

        </div>
        {disPlayDetails &&
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Info
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is general information about the user.
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
                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.gender}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Location
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is address of the user.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">House No</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.building}
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Street name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {data.street}
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
                </dl>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Social Media Handles
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is social media handles of the user.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
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
                      {data.linkedin_handle}
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

            <div className="bg-white overflow-hidden shadow rounded-lg border">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  User Profile Section 4
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  This is some information about the user.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  {/* Placeholder for future data */}
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Placeholder</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      Temporary Data
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Placeholder</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      Temporary Data
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Placeholder</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      Temporary Data
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Placeholder</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      Temporary Data
                    </dd>
                  </div>
                  <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Placeholder</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      Temporary Data
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        }
      </div>

      {showModal && (
  <div className="fixed z-50 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${data.resume && isValidPdfUrl(data.resume) ? 'sm:max-w-4xl' : 'sm:max-w-lg'} sm:w-full`}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Resume
              </h3>
              <div className="mt-2 w-full">
                {data.resume && isValidPdfUrl(data.resume) ? (
                  <iframe
                    src={data.resume}
                    title="Resume"
                    className="w-full h-96 sm:h-[70vh]"
                  />
                ) : (
                  <p className="text-sm text-gray-500">No resume available</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default Profile;
