// import PQueue from "p-queue";

// const queue = new PQueue({ concurrency: 3 });

// export async function fetchData(teamId: any, tournamentId: any, seasonId: any) {
//   // Validate required parameters before making the request
//   if (!teamId || !tournamentId || !seasonId) {
//     throw new Error("Не переданы необходимые параметры");
//   }

//   if (!process.env.RAPIDAPI_KEY) {
//     throw new Error("Отсутствует RAPIDAPI_KEY в переменных окружения");
//   }

//   const options = {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": process.env.RAPIDAPI_KEY,
//       "x-rapidapi-host": "sofascore.p.rapidapi.com",
//     },
//     next: { revalidate: 604800 },
//   };

//   const url = `https://sofascore.p.rapidapi.com/teams/get-statistics?teamId=${teamId}&tournamentId=${tournamentId}&seasonId=${seasonId}&type=overall`;

//   return queue.add(async () => {
//     try {
//       const res = await fetch(url, options);

//       // First check if the response is ok
//       if (!res.ok) {
//         throw new Error(
//           `Ошибка при запросе: ${res.statusText} (${res.status})`
//         );
//       }

//       // Check if the content type is JSON
//       const contentType = res.headers.get("content-type");
//       if (!contentType?.includes("application/json")) {
//         console.error(`Ошибка: ${res.status} - ${res.statusText}`);
//         console.error("Заголовки ответа:", res.headers);
//         throw new Error("Неверный ответ или тип контента не JSON");
//       }

//       const data = await res.json();

//       // Ensure data is in the expected format
//       if (!data || typeof data !== "object") {
//         throw new Error("API вернул пустой или некорректный ответ");
//       }

//       // Optionally log data in development
//       // if (process.env.NODE_ENV === "development") {
//       //   console.log(data);
//       // }

//       return data;
//     } catch (error) {
//       if (error instanceof Error) {
//         console.error("Ошибка при получении данных:", error.message);
//       } else {
//         console.error("Неизвестная ошибка:", error);
//       }
//       throw error;
//     }
//   });
// }
import PQueue from "p-queue";

const queue = new PQueue({ concurrency: 3 });

const MAX_RETRIES = 5; // Max retries in case of 429 error

async function retryFetch(
  url: string,
  options: RequestInit,
  attempt: number = 1
): Promise<any> {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      // If it's a 429, handle it with a backoff retry logic
      if (res.status === 429 && attempt <= MAX_RETRIES) {
        const retryAfter = parseInt(res.headers.get("retry-after") || "1", 10);
        console.log(`Too many requests, retrying in ${retryAfter} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000)); // Wait for the retry delay
        return retryFetch(url, options, attempt + 1);
      }
      throw new Error(`Ошибка при запросе: ${res.statusText} (${res.status})`);
    }

    const contentType = res.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      throw new Error("Неверный ответ или тип контента не JSON");
    }

    const data = await res.json();

    if (!data || typeof data !== "object") {
      throw new Error("API вернул пустой или некорректный ответ");
    }

    return data;
  } catch (error) {
    if (attempt > MAX_RETRIES) {
      throw new Error("Превышено количество попыток");
    }
    // console.error("Ошибка при получении данных:", error.message);
    throw error;
  }
}

export async function fetchData(teamId: any, tournamentId: any, seasonId: any) {
  if (!teamId || !tournamentId || !seasonId) {
    throw new Error("Не переданы необходимые параметры");
  }

  if (!process.env.RAPIDAPI_KEY) {
    throw new Error("Отсутствует RAPIDAPI_KEY в переменных окружения");
  }

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": "sofascore.p.rapidapi.com",
    },
    next: { revalidate: 604800 },
  };

  const url = `https://sofascore.p.rapidapi.com/teams/get-statistics?teamId=${teamId}&tournamentId=${tournamentId}&seasonId=${seasonId}&type=overall`;

  return queue.add(async () => {
    try {
      const data = await retryFetch(url, options); // Call the retryFetch with retry logic
      return data;
    } catch (error) {
      // console.error("Ошибка при получении данных:", error.message);
      throw error;
    }
  });
}
