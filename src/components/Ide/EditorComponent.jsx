import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ResultComponent from "./ResultComponent";
import { TextConverter } from "../../../controllers";
import jwtToken from "../../helper/jwtToken";
import {
  changeCode,
  toggleCustomInput,
  changeLanguage,
  setCurrentProblemId,
  setCustomInputData,
  setLoading,
  setCurrentTestCases,
} from "../../redux/ide";
import { useEffect } from "react";
import { Run, Submit } from "../../../controllers";
import env from "../../../env";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BiBorderRadius } from "react-icons/bi";
import SubmissionsModal from "./SubmissionsModal";

function TestcasesSidebar(props) {
  let ProblemId = useSelector((state) => state.ide.currentProblemId);
  let { setResultStatus, ResultStatus } = props;
  let { setResultType, ResultType } = props;
  let { setResult, Result } = props;
  let { setResultTypeMessage, ResultTypeMessage } = props;
  let customInputData = useSelector((state) => state.ide.customInputData);
  let testCases = useSelector((state) => state.ide.testCases);
  if (ResultStatus === "custom") {
    let response = JSON.parse(Result);
    let istokenPresent = response.token;
    // //console.log(istokenPresent);
    // //alert(what);/
    return (
      <>
        <div
          className="my-0 mx-0 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-grey-800 scrollbar-track-black-600"
          onClick={() => {
            if (istokenPresent) {
              setResultTypeMessage({
                input: TextConverter.utf8ToBase64(customInputData),
                output: response.stdout,
                expected_output: "",
                message: response.compile_output,
              });
            }
          }}
        >
          <aside id="cta-button-sidebar" className="" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-white-50 ">
              <ul className="space-y-2 font-medium">
                <li>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                    {!istokenPresent ? (
                      <svg
                        className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 21"
                      >
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                      </svg>
                    ) : response.status.description == "Accepted" ? (
                      <>
                        <svg
                          className="h-5 w-5 text-green-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <polygon points="12 2 19 21 12 17 5 21 12 2" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-5 w-5 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </>
                    )}
                    <span className="ms-3">
                      <h2>Custom Testcase</h2>
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </>
    );
  } else if (ResultStatus === "submit") {
    let response = JSON.parse(Result);
    // //console.log(response);
    return (
      <div className="my-0 mx-0 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-grey-800 scrollbar-track-black-600">
        <aside id="cta-button-sidebar" className="" aria-label="Sidebar">
          {response.map((item) => {
            return (
              <div
                className="h-full px-3 py-2 overflow-y-auto bg-white-50 "
                onClick={() => {
                  if (item.status.description != "Accepted") {
                    setResultTypeMessage({
                      message: `${TextConverter.utf8ToBase64(
                        item.status.description
                      )}`,
                    });
                  }
                }}
              >
                <ul className="space-y-2 font-medium">
                  <li>
                    <div className="flex items-center p-1 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                      {item &&
                      item.status &&
                      item.status.description === "Accepted" ? (
                        <>
                          <svg
                            className="h-5 w-5 text-green-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 19 21 12 17 5 21 12 2" />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            className="h-5 w-5 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </>
                      )}

                      <span className="ms-3">
                        <svg
                          className="h-5 w-5 text-neutral-900"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />{" "}
                          <path d="M7 11V7a5 5 0 0 1 9.9-1" />
                        </svg>
                      </span>
                      <span className="ms-3">
                        <h2 className="text-lg">Hidden TestCase</h2>
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            );
          })}
        </aside>
      </div>
    );
  } else {
    let response = JSON.parse(Result);
    //console.log(response);
    let a = Number(-1);
    return (
      <div className="my-0 mx-0 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-grey-800 scrollbar-track-black-600">
        <aside
          id="cta-button-sidebar"
          className=""
          aria-label="Sidebar"
        ></aside>
          <div
            className="h-full px-3 py-2 overflow-y-auto bg-white-50 "
          >
        <ul className="space-y-2 font-medium">
        {
          testCases.map((item) => {
            a=a+1;
            return(
              <li key={a}>
                    <div className="flex items-center p-1 text-gray-900 rounded-lg  hover:bg-gray-100  group"
                    
                    onClick={
                      ()=>{
                        if( ResultStatus == "Run"){
                          let currres=response.find((element)=>element.input === TextConverter.utf8ToBase64(item.input));
                          if(currres.status.description == "Accepted"){
                            let input = item.input;
                            let expected_output = item.output;
                            let output=currres.stdout;
                            setResultTypeMessage({
                              input: TextConverter.utf8ToBase64(input),
                              expected_output:TextConverter.utf8ToBase64(expected_output),
                              output:(output),
                            });
                          }
                          else{
                            let input = item.input;
                            let expected_output = item.output;
                            let output=currres.stdout;
                            setResultTypeMessage({
                              input: TextConverter.utf8ToBase64(input),
                              expected_output:TextConverter.utf8ToBase64(expected_output),
                              output:(output)?output:"",
                              message:(currres.compile_output)?currres.compile_output:"",
                              fishy:TextConverter.utf8ToBase64(currres.status.description)
                            });
                          }
                        }else{
                          //alert("no run");
                          let input = item.input;
                          let expected_output = item.output;
                          let output="_";
                          setResultTypeMessage({
                            input: TextConverter.utf8ToBase64(input),
                            expected_output:TextConverter.utf8ToBase64(expected_output),
                            output:TextConverter.utf8ToBase64(output),
                          });
                        }

                      }
                    }>
                      <span className="ms-3">
                      { ResultStatus == "None" ? (
                      <svg
                        className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 21"
                      >
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                      </svg>
                    ) : response[a].status.description == "Accepted" ? (
                      <>
                        <svg
                          className="h-5 w-5 text-green-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {" "}
                          <polygon points="12 2 19 21 12 17 5 21 12 2" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <svg
                          className="h-5 w-5 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </>
                    )}
                      </span>

                      <span className="ms-3 text-lg">
                        <h2>Sample Testcase {a}</h2>
                      </span>
                    </div>
              </li>
            )
          })
        }
        </ul>
        </div>
      </div>
    );
  }
}

function CustomTestCases(props) {
  const dispatch = useDispatch();
  let CustomTestCases = props.custom;
  let setCustomTestCases = props.setcustom;
  let ResultStatus = props.ResultStatus;
  let setResultStatus = props.setResultStatus;
  return (
    <div className="flex items-start mx-5 my-4">
      <div
        className="flex items-center h-5 text-white-900"
        onClick={() => {
          dispatch(toggleCustomInput());
          setCustomTestCases(!CustomTestCases);
          if (!CustomTestCases) {
            setResultStatus("custom");
          } else {
            setResultStatus("None");
          }
          // setResultStatus("custom");
        }}
      >
        <input
          id="helper-checkbox"
          aria-describedby="helper-checkbox-text"
          type="checkbox"
          defaultValue=""
          className="w-4 h-4 text-blue-600 bg-black-100 border-black-300 rounded focus:ring-blue-500  focus:ring-2 "
        />
      </div>
      <div className="ms-2 text-sm">
        <label htmlFor="helper-checkbox" className="font-medium  ">
          Test against custom input
        </label>
      </div>
      {/* Conditionally render the textarea if CustomTestCases is true */}
      {CustomTestCases && (
        <>
          <div className="w-96">
            <div className="mx-8 relative w-full min-w-[200px]">
              <textarea
                onChange={(e) => {
                  dispatch(setCustomInputData(e.target.value));
                }}
                className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              ></textarea>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Custom TestCases
              </label>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SelectLanguage(props) {
  let dispatch = useDispatch();
  let [langDropDown, setLangDropDown] = useState(false);
  let language = useSelector((state) => state.ide.language);
  let { langSelected, setLangSelected } = props;
  setLangSelected(language);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className="my-2 flex justify-between items-center border-t-4 p-2 border-blue-600 ">
      {/* <!-- Flex container --> */}
      <div className="flex items-center z-10 ">
      <div>
      <button
        type="button"
        className="border-gray-300 py-3 px-4 inline-flex items-center gap-x-2  rounded-full  hover:bg-blue-100 disabled:opacity-50 disabled:pointer-events-none "
        onClick={openModal}
      >
        Previous Submissions
      </button>

      {isOpen && (
        <SubmissionsModal closeModal={closeModal}/>
      )}
    </div>
        
      </div>
      {/* <!-- Dropdown aligned to the end --> */}
      <div className="relative mx-4" title="Select Language">
        {/* <!-- Your dropdown button --> */}
        <button
          onClick={() => {
            setLangDropDown(!langDropDown);
          }}
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-8 py-2.5 me-2 "
        >
          {language}
        </button>

        {/* <!-- Dropdown content --> */}
        {langDropDown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <li
              onClick={() => {
                setLangSelected("python");
                dispatch(changeLanguage("python"));
                setLangDropDown(!langDropDown);
                window.location.reload();
              }}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Python
            </li>
            <li
              onClick={() => {
                setLangSelected("Java");
                dispatch(changeLanguage("Java"));
                setLangDropDown(!langDropDown);
                window.location.reload();
              }}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Java
            </li>
            <li
              onClick={() => {
                setLangSelected("Cpp");
                dispatch(changeLanguage("Cpp"));
                setLangDropDown(!langDropDown);
                window.location.reload();
              }}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            >
              Cpp
            </li>
          </div>
        )}
      </div>
    </div>
  );
}

function RunAndSubmit(props) {
  let {moduleId,courseid,lessonId}=useParams();
  // alert(`moduleId:${moduleId} courseid:${courseid}`);
  let dispatch = useDispatch();
  let code = useSelector((state) => state.ide.code);
  let language = useSelector((state) => state.ide.language);
  let custominput = useSelector((state) => state.ide.custominput);
  let customInputData = useSelector((state) => state.ide.customInputData);
  let currentProblemId = useSelector((state) => state.ide.currentProblemId);
  let [loading, setLoading] = useState(false);
  let { Result, setResult } = props;
  let { setResultTypeMessage } = props;
  let { setResultStatus } = props;
  let {lessonPoints}=props;

  async function RunHelper(props) {
    setLoading(true);
    let data = await Run({
      code,
      language,
      custominput,
      customInputData,
      currentProblemId,
      moduleId,
      courseid,
      lessonPoints,
      lessonId
    });
    setResult(JSON.stringify(data));
    // //console.log(data);
  }
  async function SubmitHelper(props) {
    setLoading(true);
    let data = await Submit({
      code,
      language,
      custominput,
      customInputData,
      currentProblemId,
      moduleId,
      courseid,
      lessonPoints,
      lessonId
    });
    setResult(JSON.stringify(data));
    // //console.log(data);
  }

  return (
    <div className="flex justify-end my-4 ">
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-8 py-2.5 me-2 "
        onClick={async () => {
          await RunHelper();
          setLoading(false);
          setResultTypeMessage({});
          if (!custominput) setResultStatus("Run");
        }}
      >
        {loading ? "Running..." : "Run"}
      </button>
      <button
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-8 py-2.5 me-2 "
        onClick={async () => {
          await SubmitHelper();
          setLoading(false);
          setResultTypeMessage({});
          setResultStatus("submit");
        }}
      >
        {loading ? "Submiting..." : "Submit"}
      </button>
    </div>
  );
}

function EditorComponent(props) {
  let { problem_id ,lessonPoints,lessonId} = props;
  // //alert(problem_id)
  const dispatch = useDispatch();
  let codeR = useSelector((state) => state.ide.code);
  let language = useSelector((state) => state.ide.language);
  let currentProblemId = useSelector((state) => state.ide.currentProblemId);
  let custominput = useSelector((state) => state.ide.custominput);
  let loading = useSelector((state) => state.ide.loading);

  let [code, setCode] = useState(codeR);
  let [custom, setcustom] = useState(custominput);
  let [langSelected, setLangSelected] = useState(language);
  let [Result, setResult] = useState("{}");
  let [ResultStatus, setResultStatus] = useState("None"); //run ,submit , custom
  let [ResultType, setResultType] = useState("Display"); //Testcases
  let [ResultTypeMessage, setResultTypeMessage] = useState({}); //Testcases

  const editorRef = useRef(null);

  useEffect(() => {
    //console.log("Component mounted");
    dispatch(setCurrentProblemId(problem_id));
    const codeL = localStorage.getItem(`code${problem_id}`);
    if(codeL){
      dispatch(changeCode(codeL));
      setCode(codeL);
    }else{
      dispatch(changeCode("#code here"));
      setCode("#code here");
    }
    // dispatch(changeCode());
    const fetchTestCases = async () => {
      try {
        const testCasesL = localStorage.getItem(`testCases${problem_id}`);
        if (testCasesL) {
          // //console.log("Test cases found in local storage");
          // //console.log(JSON.parse(testCasesL));
          dispatch(setCurrentTestCases(JSON.parse(testCasesL)));
        } else {
          // //console.log("Test cases not found in local storage");
          const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${env.SERVER_URL}/judge/getTestCases/${problem_id}`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken()}`,
            },
          };
          const response = await axios.request(config);
          // //console.log(response.data);
          dispatch(setCurrentTestCases(response.data));
          localStorage.setItem(
            `testCases${problem_id}`,
            JSON.stringify(response.data)
          );
        }
      } catch (error) {
        //console.log(error);
      }
    };
    fetchTestCases();
    return () => {
      //console.log("Component unmounted");
    };
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function handleEditorChange(value, event) {
    dispatch(changeCode(value));
    setCode(value);
    // //console.log("here is the current model value:", value);
  }

  function zoomIn() {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "editor.action.fontZoomIn", {});
    }
  }

  function zoomOut() {
    if (editorRef.current) {
      editorRef.current.trigger("keyboard", "editor.action.fontZoomOut", {});
    }
  }
  function getLanguage(language) {
    if (language === "python") {
      return "python";
    } else if (language === "Java") {
      return "java";
    } else if (language === "Cpp") {
      return "cpp";
    }
  }
  // zoomin and out buttons
  /* <div className="flex justify-between items-center">
    <div className="flex"></div>
    <div className="flex">
      <div
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={zoomIn}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
          />
        </svg>
      </div>
      <div
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={zoomOut}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM13.5 10.5h-6"
          />
        </svg>
      </div>
    </div>
  </div> */

  return (
    <div className="w-full ">
      <SelectLanguage
        langSelected={langSelected}
        setLangSelected={setLangSelected}
      />

      <div className="shadow-2xl">
        <Editor
          height="70vh"
          width={"100%"}
          defaultLanguage={getLanguage(language)}
          theme="vs-dark"
          defaultValue={code}
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          options={{
            inlineSuggest: true,
            fontSize: "16px",
            formatOnType: true,
            autoClosingBrackets: true,
            minimap: { scale: 10 },
          }}
        />
      </div>
      {/* run submit and custom test cases */}
      <div className="rounded-b-lg  shadow-xl bg-gray-900  flex justify-between items-center bg-white">
        {/* Custom testcases */}
        <CustomTestCases
          custom={custom}
          setcustom={setcustom}
          ResultStatus={ResultStatus}
          setResultStatus={setResultStatus}
        ></CustomTestCases>
        {/* Run and Submit */}
        <RunAndSubmit
          Result={Result}
          setResult={setResult}
          ResultStatus={ResultStatus}
          setResultStatus={setResultStatus}
          setResultTypeMessage={setResultTypeMessage}
          lessonPoints={lessonPoints}
          lessonId={lessonId}
        ></RunAndSubmit>
      </div>

      {/* result bar */}
      <div className="shadow-2xl my-1 grid grid-rows-3 grid-cols-4 gap-2">
        {/* testcases display */}
        <div className="rounded-l-lg bg-white row-span-3 col-span-1">
          <TestcasesSidebar
            ResultStatus={ResultStatus}
            setResultStatus={setResultStatus}
            ResultType={ResultType}
            setResultType={setResultType}
            Result={Result}
            setResult={setResult}
            ResultTypeMessage={ResultTypeMessage}
            setResultTypeMessage={setResultTypeMessage}
          ></TestcasesSidebar>
        </div>

        <div className="rounded-r-lg bg-white row-span-3 col-span-3">
          <ResultComponent
            Result={Result}
            ResultTypeMessage={ResultTypeMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default EditorComponent;
