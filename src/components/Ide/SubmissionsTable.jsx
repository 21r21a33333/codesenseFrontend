import { useEffect, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useTheme } from "@mui/material";
import { Typography } from "@mui/material";
import Editor from "@monaco-editor/react";
import { CheckCircle, Cancel } from "@mui/icons-material";
import { useState } from "react";
import env from "./../../../env";
import jwtToken from "../../helper/jwtToken";
import axios from "axios";
import { json } from "react-router-dom";
// import { LineChart } from '@mui/x-charts/LineChart';

const SubmissionTable = () => {
  const [data, setData] = useState([]);
  let currentProblemIdL = localStorage.getItem("currentProblemId");
//   alert(currentProblemIdL);
// alert(jwtToken())

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${env.SERVER_URL}/fetch/submission/`,
          {
            problem_id: `${currentProblemIdL}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken()}`,
            }
          }
        );
        // alert(JSON.stringify(response.data))
        setData(response.data.submissions);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const theme = useTheme();

  const columns = useMemo(
    //column definitions...
    () => [
      {
        accessorKey: "submission_time",
        header: "Submission Time",
      },
      {
        accessorKey: "lang",
        header: "Language",
      },
      {
        accessorKey: "submission_status",
        header: "Submission Status",
        Cell: ({ cell }) =>
          cell.getValue() === "accepted" ? (
            <CheckCircle style={{ color: "green" }} />
          ) : (
            <Cancel style={{ color: "red" }} />
          ),
      },
    ],
    []
    //end
  );

  const table = useMaterialReactTable({
    columns,
    data,
    initialState: { expanded: { 0: true } },
    muiTableBodyRowProps: {
      sx: {
        ".Mui-TableBodyCell-DetailPanel": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? theme.palette.grey[900]
              : theme.palette.grey[100],
        },
      },
    },
    renderDetailPanel: ({ row }) => (
      <Editor
        height="50vh"
        defaultLanguage={row.original.lang}
        defaultValue={row.original.submission_code}
      />
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default SubmissionTable;
