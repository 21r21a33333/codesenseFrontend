import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import jwtToken from "../../helper/jwtToken";
import env from "../../../env";

const isValidUrl = (url, platform) => {
  const patterns = {
    facebook: /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_]+\/?$/,
    twitter: /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/,
    instagram: /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_]+\/?$/,
    linkedin: /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?$/,
    github: /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+\/?$/
  };
  return patterns[platform].test(url);
};

export default function EditProfile() {
  let location = useLocation();
  let navigate = useNavigate();

  const { data } = location.state || {};

  const [formData, setFormData] = useState({
    about_me: '',
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postal_code: '',
    dob: '',
    gender: '',
    building: '',
    fb_handle: '',
    twitter_handle: '',
    insta_handle: '',
    linkedin_handle: '',
    github: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (data) {
      setFormData({
        about_me: data.about_me,
        name: data.name,
        email: data.email,
        street: data.street,
        city: data.city,
        state: data.state,
        postal_code: data.postal_code,
        dob: data.dob,
        gender: data.gender,
        building: data.building,
        fb_handle: data.fb_handle,
        twitter_handle: data.twitter_handle,
        insta_handle: data.insta_handle,
        linkedin_handle: data.linkedin_handle,
        github: data.github,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = '';

    if (name === 'fb_handle' && value && !isValidUrl(value, 'facebook')) {
      error = 'Invalid Facebook URL';
    }
    if (name === 'twitter_handle' && value && !isValidUrl(value, 'twitter')) {
      error = 'Invalid Twitter URL';
    }
    if (name === 'insta_handle' && value && !isValidUrl(value, 'instagram')) {
      error = 'Invalid Instagram URL';
    }
    if (name === 'linkedin_handle' && value && !isValidUrl(value, 'linkedin')) {
      error = 'Invalid LinkedIn URL';
    }
    if (name === 'github' && value && !isValidUrl(value, 'github')) {
      error = 'Invalid GitHub URL';
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== '');

    if (hasErrors) {
      alert('Please fix the errors in the form');
      return;
    }

    try {
      const response = await fetch(`${env.SERVER_URL}/update/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken()}`,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Profile data saved successfully');
        navigate('/dashboard');
      } else {
        // Handle error
        console.error('Failed to save profile data');
        alert('Failed to save profile data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="my-4 px-40" onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about_me"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.about_me}
                  onChange={handleChange}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="streetAddress" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street"
                  id="streetAddress"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postalCode" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal_code"
                  id="postalCode"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.postal_code}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-900">
                Date of Birth
              </label>
              <div className="mt-2">
                <input
                  type="date"
                  name="dob"
                  id="dob"
                  autoComplete="bday"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.dob}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                Gender
              </label>
              <div className="mt-2">
                <select
                  id="gender"
                  name="gender"
                  autoComplete="sex"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="building" className="block text-sm font-medium leading-6 text-gray-900">
                House No
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="building"
                  id="building"
                  autoComplete="building"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.building}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Social Handles</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Add valid social media URLs.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="fb_handle" className="block text-sm font-medium leading-6 text-gray-900">
                Facebook URL
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="fb_handle"
                  id="fb_handle"
                  autoComplete="fb_handle"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.fb_handle}
                  onChange={handleChange}
                />
                {errors.fb_handle && <p className="text-sm text-red-600">{errors.fb_handle}</p>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="twitter_handle" className="block text-sm font-medium leading-6 text-gray-900">
                Twitter URL
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="twitter_handle"
                  id="twitter_handle"
                  autoComplete="twitter_handle"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.twitter_handle}
                  onChange={handleChange}
                />
                {errors.twitter_handle && <p className="text-sm text-red-600">{errors.twitter_handle}</p>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="insta_handle" className="block text-sm font-medium leading-6 text-gray-900">
                Instagram URL
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="insta_handle"
                  id="insta_handle"
                  autoComplete="insta_handle"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.insta_handle}
                  onChange={handleChange}
                />
                {errors.insta_handle && <p className="text-sm text-red-600">{errors.insta_handle}</p>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="linkedin_handle" className="block text-sm font-medium leading-6 text-gray-900">
                LinkedIn URL
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="linkedin_handle"
                  id="linkedin_handle"
                  autoComplete="linkedin_handle"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.linkedin_handle}
                  onChange={handleChange}
                />
                {errors.linkedin_handle && <p className="text-sm text-red-600">{errors.linkedin_handle}</p>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="github" className="block text-sm font-medium leading-6 text-gray-900">
                GitHub URL
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="github"
                  id="github"
                  autoComplete="github"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData.github}
                  onChange={handleChange}
                />
                {errors.github && <p className="text-sm text-red-600">{errors.github}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  
  );
}

