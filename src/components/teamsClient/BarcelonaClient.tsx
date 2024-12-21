"use client";

import { useEffect } from "react";
import useDataStore from "@/stores/store";
import TeamItem from "@/components/TeamItem";

export default function BarcelonaClient({ data }) {
  const setData = useDataStore((state) => state.setData);

  useEffect(() => {
    if (data) {
      setData(data); // Save data to Zustand store
    }
  }, [data, setData]);

  if (!data) {
    return <p>Error loading team statistics. Please try again later.</p>;
  }

  return (
    // <div>
    //   <h1>Team Statistics:</h1>
    //   <pre>{JSON.stringify(data, null, 2)}</pre>
    // </div>
    <>
      <TeamItem data={data} teamName={"Barcelona"} />
    </>
  );
}

// ("use client");

// // import { useEffect } from "react";
// // import useDataStore from "@/stores/store";

// export default function BarcelonaClient({ data }) {
//   // Initialize Zustand store with data passed from the server

//   if (!data) {
//     return <p>Error loading team statistics. Please try again later.</p>;
//   }

//   return (
//     <div>
//       <h1>Team Statistics:</h1>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// }
