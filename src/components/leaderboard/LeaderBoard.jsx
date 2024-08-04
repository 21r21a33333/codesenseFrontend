import { useMemo, useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import env from "../../../env";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import DropdownStats from "./DropdownStats";
import { ClipLoader } from "react-spinners";

// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { mkConfig, generateCsv, download } from "export-to-csv";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// Material UI Imports
import {
  Box,
  Button,
  ListItemIcon,
  MenuItem,
  Typography,
  lighten,
} from "@mui/material";

// Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";

const Example = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const jwtToken = Cookies.get("jwtToken");
      try {
        const config = {
          method: "get",
          url: `${env.SERVER_URL}/leaderboard`,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        const response = await axios(config);
        setData(
          response.data.result.map((entry) => ({
            ...entry,
            leetcode: Math.round(entry.leetcode),
            codeforces: Math.round(entry.codeforces),
            codechef: Math.round(entry.codechef),
            hackerrank: Math.round(entry.hackerrank),
            spoj: Math.round(entry.spoj),
            totalScore: Math.round(entry.totalScore),
          }))
        );
        console.log("Fetched leaderboard data:", response.data.result);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        alert("Error fetching leaderboard");
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(data);
    download(csvConfig)(csv);
  };

  const columns = useMemo(
    () => [
      {
        id: "student", // id used to define `group` column
        header: "Student",
        columns: [
          {
            accessorKey: "rank",
            header: "Rank",
            size: 120,
            filterFn: "between",
          },
          {
            accessorKey: "name",
            header: "Name",
            size: 120,
          },
          {
            accessorKey: "roll_no",
            header: "Roll No",
            size: 120,
          },
          {
            accessorKey: "branch",
            header: "Branch",
            size: 120,
          },
          // Uncomment this if you want to display the email column
        ],
      },
      {
        id: "scores",
        header: "Scores",
        columns: [
          {
            accessorKey: "leetcode",
            header: "Leetcode",
            size: 120,
            filterFn: "between",
            Cell: ({ cell }) => Math.round(cell.getValue()),
          },
          {
            accessorKey: "codeforces",
            header: "Codeforces",
            size: 120,
            filterFn: "between",
            Cell: ({ cell }) => Math.round(cell.getValue()),
          },
          {
            accessorKey: "codechef",
            header: "Codechef",
            size: 120,
            filterFn: "between",
            Cell: ({ cell }) => Math.round(cell.getValue()),
          },
          {
            accessorKey: "hackerrank",
            header: "Hackerrank",
            size: 120,
            filterFn: "between",
            Cell: ({ cell }) => Math.round(cell.getValue()),
          },
          {
            accessorKey: "spoj",
            header: "SPOJ",
            size: 120,
            filterFn: "between",
            Cell: ({ cell }) => Math.round(cell.getValue()),
          },
          {
            accessorKey: "totalScore",
            header: "Total Score",
            size: 120,
            filterFn: "between",
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor: theme.palette.success.dark,
                  borderRadius: "0.25rem",
                  color: "#fff",
                  maxWidth: "9ch",
                  p: "0.25rem",
                })}
              >
                {Math.round(cell.getValue())}
              </Box>
            ),
          },
          {
            accessorKey: "email",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Email",
            size: 200,
          },

          // Uncomment this if you want to display the job title column
          // {
          //   accessorKey: "jobTitle",
          //   header: "Job Title",
          //   size: 350,
          // },
        ],
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, // data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    initialState: {
      showColumnFilters: true,
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: ["mrt-row-actions"],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    // enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button onClick={handleExportData} startIcon={<FileDownloadIcon />}>
          Export All Data
        </Button>

        <Button
          disabled={table.getPrePaginationRowModel().rows.length === 0}
          onClick={() =>
            handleExportRows(table.getPrePaginationRowModel().rows)
          }
          startIcon={<FileDownloadIcon />}
        >
          Export All Rows
        </Button>

        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>

        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Selected Rows
        </Button>
      </Box>
    ),
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-around",
          left: "30px",
          maxWidth: "90vw",
          position: "sticky",
          width: "100%",
        }}
      >
        {/* Profile dropdown */}
        <Box sx={{ height: "100%", width: "100%" }}>  
          {/* <Typography variant="h4">ROLL NO:</Typography>
          <Typography variant="h1">
            &quot;{row.original.roll_no}&quot;
          </Typography>  */}

          
            <DropdownStats rollno={row.original.roll_no}/>
          
        </Box>
      </Box>
    ),
    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          navigate("/dashboard");
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        View Profile
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...

          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Send Email
      </MenuItem>,
    ],
  });

  return <>{loading ? (
      <div className="loading-container">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    ) : (
      <MaterialReactTable table={table} />)}
      </>
};

// Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Link } from "react-router-dom";

const ExampleWithLocalizationProvider = () => (
  // App.tsx or AppProviders file
  <div className="my-4 px-16">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    
      <Example />
    </LocalizationProvider>
  </div>
);

export default ExampleWithLocalizationProvider;

//Mock Data
// const data = [
//   {
//     name: "sairam",
//     roll_no: "21r21a12f9",
//     leetcode: 10855.401358413555,
//     codeforces: 660,
//     codechef: 2780,
//     hackerrank: 410,
//     spoj: 0,
//     totalScore: 14705.401358413555,
//     rank: 1
//   },
//   {
//     name: "sujal",
//     roll_no: "21R21A0557",
//     leetcode: 12713.481066681821,
//     codeforces: 750,
//     codechef: 187.5,
//     hackerrank: 10,
//     spoj: 120,
//     totalScore: 13780.981066681821,
//     rank: 2
//   },
//   {
//     name: "gaytri28",
//     roll_no: "21r21a3328",
//     leetcode: 1063.4444262029942,
//     codeforces: 1260,
//     codechef: 5710,
//     hackerrank: 610,
//     spoj: 160,
//     totalScore: 8803.444426202994,
//     rank: 3
//   },
//   {
//     name: "tvih762",
//     roll_no: "21R21A6614",
//     leetcode: 0,
//     codeforces: 0,
//     codechef: 0,
//     hackerrank: 0,
//     spoj: 0,
//     totalScore: 0,
//     rank: 4
//   }
// ];

// Previous columns commented for reference
/*
      {
        id: "employee",
        header: "Employee",
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
            id: "name",
            header: "Name",
            size: 250,
            Cell: ({ renderedCellValue }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          {
            accessorKey: "email",
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Email",
            size: 300,
          },
        ],
      },
      {
        id: "id",
        header: "Job Info",
        columns: [
          {
            accessorKey: "salary",
            filterFn: "between",
            header: "Salary",
            size: 120,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() < 50_000
                      ? theme.palette.error.dark
                      : cell.getValue() >= 50_000 && cell.getValue() < 75_000
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                  borderRadius: "0.25rem",
                  color: "#fff",
                  maxWidth: "9ch",
                  p: "0.25rem",
                })}
              >
                {cell.getValue()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
          },
          {
            accessorKey: "jobTitle",
            header: "Job Title",
            size: 350,
          },
          {
            accessorFn: (row) => new Date(row.startDate),
            id: "startDate",
            header: "Start Date",
            filterVariant: "date",
            filterFn: "lessThan",
            sortingFn: "datetime",
            Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(),
            Header: ({ column }) => <em>{column.columnDef.header}</em>,
            muiFilterTextFieldProps: {
              sx: {
                minWidth: "250px",
              },
            },
          },
        ],
      },
      */
