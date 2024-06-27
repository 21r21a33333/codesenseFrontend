import React from 'react';
import HeatMapComponent from '@uiw/react-heat-map';

function Heatmap(props) {
  // Extract data from props and format it for the heatmap
  const value = props.data.map(entry => {
    const date = new Date(entry.date).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const count = parseInt(entry.codechef_solved_today, 10) +
                  parseInt(entry.codeforces_solved_today, 10) +
                  parseInt(entry.hackerrank_solved_today, 10) +
                  parseInt(entry.leetcode_solved_today, 10) +
                  parseInt(entry.spoj_solved_today, 10);
    return { date, count };
  });

  // Determine the start date from the first element of the data
  const startDate = new Date(props.data[0].date);

  return (
    <HeatMapComponent
      value={value}
      width={"90%"}
      startDate={startDate}
      rectRender={(props, data) => {
        if (!data.count) return <rect {...props} />;
        return (
          <rect {...props}>
            <title>{`Date: ${data.date}, Count: ${data.count || 0}`}</title>
          </rect>
        );
      }}
    />
  );
}

export default Heatmap;

// import React from 'react';
// import HeatMapComponent from '@uiw/react-heat-map'; // Rename imported component to avoid naming conflict
// import Tooltip from '@uiw/react-tooltip';

// function Heatmap(props) {
//   // Extract data from props and format it for the heatmap
//   const value = props.data.map(entry => {
//     const date = new Date(entry.date).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//     const count = parseInt(entry.codechef_solved_today, 10) +
//                   parseInt(entry.codeforces_solved_today, 10) +
//                   parseInt(entry.hackerrank_solved_today, 10) +
//                   parseInt(entry.leetcode_solved_today, 10) +
//                   parseInt(entry.spoj_solved_today, 10);
//     return { date, count };
//   });

//   // Determine the start date from the first element of the data
//   const startDate = new Date(props.data[0].date);

//   return (
//     <HeatMapComponent // Use a distinct name for your component
//       value={value}
//       width={"90%"}
//       startDate={startDate}
//       rectRender={(props, data) => {
//         if (!data.count) return <rect {...props} />;
//         return (
//           <Tooltip 
//             placement="top" 
//             content={`Date: ${data.date}, Count: ${data.count || 0}`}
//             delay={{ show: 0 , hide:0 }}
//           >
//             <rect {...props} />
//           </Tooltip>
//         );
//       }}
//       panelTitles={{
//         0: "Sunday",
//         1: "Monday",
//         2: "Tuesday",
//         3: "Wednesday",
//         4: "Thursday",
//         5: "Friday",
//         6: "Saturday",
//       }}
//     />
//   );
// }

// export default Heatmap;
