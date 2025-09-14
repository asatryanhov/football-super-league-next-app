import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Проверяем работу автоматического обновления...");

    // Проверим инвалидацию кэша для одной команды
    const teamId = 2817; // Barcelona
    const tournamentId = 8;
    const seasonId = 77559;
    const tag = `team-${teamId}-${tournamentId}-${seasonId}`;

    console.log(`Инвалидируем кэш для тега: ${tag}`);
    revalidateTag(tag);

    // Проверим что данные обновились
    const response = {
      timestamp: new Date().toISOString(),
      status: "success",
      message: "Кэш инвалидирован для Barcelona",
      tag: tag,
      nextSteps: [
        "Перезагрузите главную страницу",
        "Данные для Barcelona должны обновиться",
        "Проверьте логи в консоли браузера",
      ],
      storeFlow: {
        step1: "API invalidateTag() инвалидирует кэш Next.js",
        step2: "При следующем запросе ServerComponent делает новый API запрос",
        step3: "ClientComponent получает новые данные через props",
        step4: "ClientComponent записывает данные в Zustand Store",
        step5: "App.tsx использует данные из Store для рендеринга",
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("❌ Ошибка при тестировании:", error);
    return NextResponse.json(
      {
        error: "Ошибка тестирования",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
