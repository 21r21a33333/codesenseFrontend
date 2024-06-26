import { createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios';

let custominputL=localStorage.getItem("custominput");
let languageL=localStorage.getItem("language");
let codeL=localStorage.getItem("code");
let currentProblemIdL=localStorage.getItem("currentProblemId");
let customInputDataL=localStorage.getItem("customInputData");





const initialState = {
    custominput:false,
    language: (languageL)?languageL:'python',
    code:(codeL)?codeL:"#code here",
    currentProblemId:(currentProblemIdL)?currentProblemIdL:"",
    customInputData:(customInputDataL)?customInputDataL:"",
    Result:"",
    loading:false,
    testCases:[],
}
export const IdeSlice = createSlice({
  name: 'Ide',
  initialState,
  reducers: {
    changeCode:(state,action)=>{
        state.code=action.payload
        localStorage.setItem("code",action.payload)
    },
    toggleCustomInput:(state)=>{
        state.custominput=!state.custominput
        localStorage.setItem("custominput",state.custominput)
    },
    changeLanguage:(state,action)=>{
        state.language=action.payload
        localStorage.setItem("language",action.payload)
    },
    setCurrentProblemId:(state,action)=>{
        state.currentProblemId=action.payload
        localStorage.setItem("currentProblemId",action.payload)
    },
    setCustomInputData:(state,action)=>{
        state.customInputData=action.payload   
        localStorage.setItem("customInputData",action.payload)
    },
    setLoading:(state,action)=>{
        state.loading=action.payload;
  },
  setCurrentTestCases: (state,action)=>{
    state.testCases=action.payload;
  }
}
})

// Action creators are generated for each case reducer function
export const { changeCode, toggleCustomInput,changeLanguage ,setCurrentProblemId ,setCustomInputData ,setLoading,setCurrentTestCases} = IdeSlice.actions

export default IdeSlice.reducer