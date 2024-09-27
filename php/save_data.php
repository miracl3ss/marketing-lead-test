<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $businessType = $_POST['businessType'];
    $leads = $_POST['leads'];
    $averageCheck = $_POST['averageCheck'];
    $tariffPlan = $_POST['tariffPlan'];
    $profitWithoutTariff = $_POST['profitWithoutTariff']; // Получаем результат
    $profitWithTariff = $_POST['profitWithTariff']; // Получаем результат
    $profitDifference = $_POST['profitDifference']; // Получаем результат

    // Формируем строку данных
    $data = "Вид деятельности: $businessType, Количество лидов: $leads, Средний чек: $averageCheck, Тарифный план: $tariffPlan, Прибыль без тарифа: $profitWithoutTariff, Прибыль с тарифом: $profitWithTariff, Разница в прибыли: $profitDifference\n";

    // Записываем данные в файл
    file_put_contents('wp-content\themes\blankslate\php\data.txt', $data, FILE_APPEND | LOCK_EX);

    // Возвращаем успешный ответ
    echo "Данные успешно сохранены.";
} else {
    echo "Некорректный запрос.";
}
?>