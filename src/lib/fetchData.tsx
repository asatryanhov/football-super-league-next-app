import PQueue from "p-queue";

export const revalidate = 604800; // Глобальное кэширование на 7 дней

// export const revalidate = 86400;

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
      if (res.status === 429 && attempt <= MAX_RETRIES) {
        // const retryAfter = parseInt(res.headers.get("retry-after") || "1", 10); old version

        const retryAfter = Math.max(
          parseInt(res.headers.get("retry-after") || "1", 10),
          5
        ); // Минимум 5 сек

        console.log(`Too many requests, retrying in ${retryAfter} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
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
    next: { 
      revalidate, // Кэширование fetch() на 7 дней
      tags: [`team-${teamId}-${tournamentId}-${seasonId}`] // Теги для инвалидации кэша
    },
  };

  const url = `https://sofascore.p.rapidapi.com/teams/get-statistics?teamId=${teamId}&tournamentId=${tournamentId}&seasonId=${seasonId}&type=overall`;

  return queue.add(async () => {
    try {
      const data = await retryFetch(url, options);
      return data;
    } catch (error) {
      throw error;
    }
  });
}
