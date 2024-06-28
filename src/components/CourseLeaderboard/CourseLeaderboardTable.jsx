import React, { useMemo } from "react";
import axios from "axios";
import env from "../../../env";
import Cookies from "js-cookie";
import { useState , useEffect } from "react";

// MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { mkConfig, generateCsv, download } from "export-to-csv";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

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


const Example = (props) => {

    const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const jwtToken = Cookies.get("jwtToken");
      try {
        const config = {
          method: "get",
          url: `${env.SERVER_URL}/course/leaderboard/${props.courseid}`,
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };

        const response = await axios(config);
        setData(response.data.result);
        console.log("Fetched Course leaderboard data:", response.data.result);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        console.log("Error fetching leaderboard");
      }
    };

    fetchLeaderboard();
  }, []);
  
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
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
            size: 10,
            filterFn: "between",
          },
          {
            accessorKey: "name",
            header: "Name",
            size: 40,
          },
          {
            accessorKey: "roll_no",
            header: "Roll No",
            size: 40,
          },
          // Uncomment this if you want to display the email column
          // {
          //   accessorKey: "email",
          //   enableClickToCopy: true,
          //   filterVariant: "autocomplete",
          //   header: "Email",
          //   size: 300,
          // },
        ],
      },
      {
        id: "scores",
        header: "Scores",
        columns: [
          
          {
            accessorKey: "score",
            header: "Score",
            size: 40,
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
    enableRowSelection: true,
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
        <Button
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
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
          maxWidth: "1000px",
          position: "sticky",
          width: "100%",
        }}
      >
        {/* Profile dropdown */}
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4">Roll No:</Typography>
          <Typography variant="h1">
            &quot;{row.original.roll_no}&quot;
          </Typography>
        </Box>
      </Box>
    ),
    renderRowActionMenuItems: ({ closeMenu }) => [
      <MenuItem
        key={0}
        onClick={() => {
          // View profile logic...
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

  return <MaterialReactTable table={table} />;
};

// Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const ExampleWithLocalizationProvider = (props) => (
  // App.tsx or AppProviders file
  <div className="my-4">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Example courseid={props.courseid}/>
    </LocalizationProvider>
  </div>
);

export default ExampleWithLocalizationProvider;
