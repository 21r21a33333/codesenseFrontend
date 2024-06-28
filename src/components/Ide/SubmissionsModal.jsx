import React from 'react'
import SubmissionTable from './SubmissionsTable'
function SubmissionsModal(props) {
    const { closeModal } = props;
    let currentProblemIdL=localStorage.getItem("currentProblemId");
    // alert(currentProblemIdL)
  return (
    <div className="fixed inset-0 overflow-x-hidden overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
  <div className="z-80 bg-white border shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70 w-full max-w-4xl mx-3 h-[80vh]">
    <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
      <h3 className="font-bold text-gray-800 dark:text-white">Previous Submissions</h3>
      <button
        type="button"
        className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700"
        onClick={closeModal}
      >
        <span className="sr-only">Close</span>
        <svg
          className="flex-shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
      </button>
    </div>
    <div className="p-4 overflow-y-auto h-[calc(80vh-64px)]">
      <SubmissionTable />
    </div>
  </div>
</div>

  )
}

export default SubmissionsModal

