import React from "react";
import {TextConverter} from "../../../controllers";

function ResultComponent(props) {
  let { Result, ResultTypeMessage } = props;
  if(Object.keys(ResultTypeMessage).length===0) 
    return <div></div>
  if(ResultTypeMessage.fishy){
      return(
        <>
      <div  className="mb-0 mt-1 space-y-4 rounded-lg p-2 shadow-lg ">
      <p className="text-left text-lg font-medium text-red ">Console</p>
      {/* {ResultTypeMessage.message} */}
      <div>
        <div className="relative">
          <textarea
            type="email"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm "
            placeholder={TextConverter.base64ToUtf8(ResultTypeMessage.message)}
            disabled
          /> 
        </div>
      </div>
      </div>
    <div  className="mb-0 mt-1 space-y-4 rounded-lg p-2 shadow-lg ">
      <p className="text-left text-lg font-medium">Sample Input</p>
      <div>
        <div className="relative">
          <textarea
            type="email"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
            placeholder={TextConverter.base64ToUtf8(ResultTypeMessage.input)}
            disabled
          /> 
        </div>
      </div>
      </div>
      <div  className="mb-0 mt-1 space-y-4 rounded-lg p-2 shadow-lg ">
      <p className="text-left text-lg font-medium">Output</p>
      <div>
        <div className="relative">
          <textarea
            type="email"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
            placeholder={(ResultTypeMessage.output)?TextConverter.base64ToUtf8(ResultTypeMessage.output):""}
            disabled
          />

          
        </div>
      </div>
      </div>
      <div  className="mb-0 mt-1 space-y-4 rounded-lg p-2 shadow-lg ">
      <p className="text-left text-lg font-medium">Expected Output</p>
      <div>
        <div className="relative">
          <textarea
            type="email"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
            placeholder={(ResultTypeMessage.expected_output)?TextConverter.base64ToUtf8(ResultTypeMessage.expected_output):""}
            disabled
          />

          
        </div>
      </div>
      </div>
      <div  className="mb-0 mt-1 space-y-4 rounded-lg p-2 shadow-lg ">
      <p className="text-left text-lg font-medium text-red ">Error</p>
      {/* {ResultTypeMessage.message} */}
      <div>
        <div className="relative">
          <textarea
            type="email"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
            placeholder={TextConverter.base64ToUtf8(ResultTypeMessage.fishy)}
            disabled
          /> 
        </div>
      </div>
      </div>
    </>
      );
  }
  if (ResultTypeMessage.message) {
    return (
      <div  className="mb-0 mt-1 space-y-4 rounded-lg p-2 shadow-lg ">
      <p className="text-left text-lg font-medium text-red ">Error</p>
      {/* {ResultTypeMessage.message} */}
      <div>
        <div className="relative">
          <textarea
            type="email"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
            placeholder={TextConverter.base64ToUtf8(ResultTypeMessage.message)}
            disabled
          /> 
        </div>
      </div>
      </div>
    );
  }
  // alert(JSON.stringify(ResultTypeMessage));
  return (
    <>
    <div  className="mb-0 mt-1 space-y-4 rounded-lg p-2 shadow-lg ">
      <p className="text-left text-lg font-medium">Sample Input</p>
      <div>
        <div className="relative">
          <textarea
            type="email"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
            placeholder={TextConverter.base64ToUtf8(ResultTypeMessage.input)}
            disabled
          /> 
        </div>
      </div>
      </div>
      <div  className="mb-0 mt-1 space-y-4 rounded-lg p-2 shadow-lg ">
      <p className="text-left text-lg font-medium">Output</p>
      <div>
        <div className="relative">
          <textarea
            type="email"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
            placeholder={(ResultTypeMessage.output)?TextConverter.base64ToUtf8(ResultTypeMessage.output):""}
            disabled
          />

          
        </div>
      </div>
      </div>
      <div  className="mb-0 mt-1 space-y-4 rounded-lg p-2 shadow-lg ">
      <p className="text-left text-lg font-medium">Expected Output</p>
      <div>
        <div className="relative">
          <textarea
            type="email"
            className="w-full rounded-lg border-gray-200 p-2 pe-12 text-sm shadow-sm"
            placeholder={(ResultTypeMessage.expected_output)?TextConverter.base64ToUtf8(ResultTypeMessage.expected_output):""}
            disabled
          />

          
        </div>
      </div>
      </div>
    </>

    
    
  );
}

export default ResultComponent;
