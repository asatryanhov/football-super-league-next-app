import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// Список всех команд для обновления
const teams = [
  { teamId: 2817, tournamentId: 8, seasonId: 77559, name: "barcelona" },
  { teamId: 17, tournamentId: 17, seasonId: 76986, name: "mancity" },
  { teamId: 44, tournamentId: 17, seasonId: 76986, name: "liverpool" },
  { teamId: 2829, tournamentId: 8, seasonId: 77559, name: "realmadrid" },
  { teamId: 2836, tournamentId: 8, seasonId: 77559, name: "atmadrid" },
  { teamId: 2697, tournamentId: 23, seasonId: 76457, name: "inter" },
  { teamId: 2692, tournamentId: 23, seasonId: 76457, name: "milan" },
  { teamId: 2687, tournamentId: 23, seasonId: 76457, name: "juventus" },
  { teamId: 42, tournamentId: 17, seasonId: 76986, name: "arsenal" },
  { teamId: 35, tournamentId: 17, seasonId: 76986, name: "manutd" },
  { teamId: 38, tournamentId: 17, seasonId: 76986, name: "chelsea" },
  { teamId: 1644, tournamentId: 34, seasonId: 77356, name: "psg" },
  { teamId: 2672, tournamentId: 35, seasonId: 77333, name: "bayern" },
  { teamId: 2673, tournamentId: 35, seasonId: 77333, name: "dortmund" },
  { teamId: 2681, tournamentId: 35, seasonId: 77333, name: "bayer" },
  { teamId: 39, tournamentId: 17, seasonId: 76986, name: "newcastle" },
  { teamId: 2699, tournamentId: 23, seasonId: 76457, name: "lazio" },
  { teamId: 2686, tournamentId: 23, seasonId: 76457, name: "atalanta" },
  { teamId: 2714, tournamentId: 23, seasonId: 76457, name: "napoli" },
  { teamId: 2825, tournamentId: 8, seasonId: 77559, name: "atbilbao" },
];

export async function GET(request: NextRequest) {
  try {
    // Проверяем авторизацию (опционально)
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("🔄 Начинаем автоматическое обновление статистики команд...");

    const results = [];
    let successCount = 0;
    let errorCount = 0;

    // Обновляем данные для каждой команды
    for (const team of teams) {
      try {
        // Принудительно инвалидируем кэш для каждой команды
        revalidateTag(
          `team-${team.teamId}-${team.tournamentId}-${team.seasonId}`
        );

        // Делаем новый запрос к API для обновления кэша
        const url = `https://sofascore.p.rapidapi.com/teams/get-statistics?teamId=${team.teamId}&tournamentId=${team.tournamentId}&seasonId=${team.seasonId}&type=overall`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
            "x-rapidapi-host": "sofascore.p.rapidapi.com",
          },
          next: {
            revalidate: 604800, // 7 дней
            tags: [`team-${team.teamId}-${team.tournamentId}-${team.seasonId}`],
          },
        });

        if (response.ok) {
          const data = await response.json();
          results.push({
            team: team.name,
            status: "success",
            teamId: team.teamId,
          });
          successCount++;
          console.log(`✅ ${team.name} - обновлено успешно`);
        } else {
          throw new Error(`HTTP ${response.status}`);
        }

        // Небольшая задержка между запросами чтобы не превысить лимиты API
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Ошибка обновления ${team.name}:`, error);
        results.push({
          team: team.name,
          status: "error",
          error: error instanceof Error ? error.message : "Unknown error",
          teamId: team.teamId,
        });
        errorCount++;
      }
    }

    const summary = {
      timestamp: new Date().toISOString(),
      totalTeams: teams.length,
      successCount,
      errorCount,
      results,
    };

    console.log("📊 Сводка обновления:", summary);

    return NextResponse.json({
      message: "Автоматическое обновление статистики завершено",
      ...summary,
    });
  } catch (error) {
    console.error("🚨 Критическая ошибка при обновлении:", error);
    return NextResponse.json(
      {
        error: "Ошибка при обновлении статистики",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
