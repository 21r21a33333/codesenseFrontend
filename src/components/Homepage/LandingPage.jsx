import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      {/* hero section */}
      <header className="bg-white dark:bg-gray-900 px-32">
        <div className="container px-6 py-16 mx-auto">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                  Bring your{" "}
                  <span className="text-blue-500">goals into focus</span>
                </h1>
                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  Upskill for free with{" "}
                  <span className="font-medium text-blue-500">CodeSense</span>{" "}
                  is live
                </p>
                <div className="pl-8 flex my-16">
                  <div className="loader">
                    <svg viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32"></circle>
                    </svg>
                  </div>
                  <div className="loader triangle">
                    <svg viewBox="0 0 86 80">
                      <polygon points="43 8 79 72 7 72"></polygon>
                    </svg>
                  </div>
                  <div className="loader">
                    <svg viewBox="0 0 80 80">
                      <rect x="8" y="8" width="64" height="64"></rect>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
              <img
                className="w-full h-full max-w-md"
                src="https://merakiui.com/images/components/Email-campaign-bro.svg"
                alt="email illustration vector art"
              />
            </div>
          </div>
        </div>
      </header>
      {/* hover cards */}
      <div className="px-32">
        <section className="bg-white dark:bg-gray-900">
          <div className="container px-6 py-10 mx-auto">
            <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
            Join a community, not just a classroom
            </h1>
            <p className="mt-4 text-center text-gray-500 dark:text-gray-300">
            Upskill at your pace with flexible hybrid or 100% online options.
            <br />
            Be part of a like-minded community, solve questions, Track Scores , and Compete
            </p>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
              <div
                className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                }}
              >
                <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                  <h2 className="mt-4 text-xl font-semibold text-white capitalize">
                    Unlimited access to courses, Hands-on Learning Experience. 
                    Practice as you learn with our built-in IDE.
                  </h2>
                  <p className="mt-2 text-lg tracking-wider text-blue-400 uppercase ">
                    Website
                  </p>
                </div>
              </div>
              <div
                className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                }}
              >
                <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                  <h2 className="mt-4 text-xl font-semibold text-white capitalize">
                  Join us on a journey into the world of competitive programming.
                  Our platform keeps you updated about past events and future contests.
                  </h2>
                  <p className="mt-2 text-lg tracking-wider text-blue-400 uppercase ">
                  And track your progress with our leaderboard scores from codeforces, codechef , leetcode and more.
                  </p>
                </div>
              </div>
              <div
                className="overflow-hidden bg-cover rounded-lg cursor-pointer h-96 group"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")',
                }}
              >
                <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                  <h2 className="mt-4 text-xl font-semibold text-white capitalize">
                  Explore Courses
                  </h2>
                  <Link to="courses" className="mt-2 text-lg tracking-wider text-blue-400 uppercase ">
                    startLearning
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;
