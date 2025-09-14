import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log("🔍 Тестируем автоматическое обновление...");

    // Вызываем наш cron endpoint для тестирования
    const cronUrl = new URL("/api/cron/update-stats", request.url);

    const response = await fetch(cronUrl.toString(), {
      method: "GET",
      headers: {
        authorization: `Bearer ${process.env.CRON_SECRET || "test"}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Cron endpoint failed: ${response.status}`);
    }

    const cronResult = await response.json();

    // Проверяем состояние store (это сложно проверить на сервере, но проверим данные)
    const testResponse = {
      timestamp: new Date().toISOString(),
      cronJobStatus: "success",
      cronResult,
      storeIntegration: {
        note: "Store обновляется автоматически при следующей загрузке страницы",
        mechanism:
          "Next.js кэш инвалидируется, новые данные загружаются в ServerComponent -> ClientComponent -> Store",
      },
      recommendations: [
        "Перезагрузите страницу после выполнения cron job",
        "Проверьте консоль браузера на наличие логов Store",
        "Убедитесь что CRON_SECRET установлен в environment variables",
      ],
    };

    return NextResponse.json(testResponse);
  } catch (error) {
    console.error("❌ Ошибка при тестировании:", error);
    return NextResponse.json(
      {
        error: "Ошибка тестирования автоматического обновления",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
