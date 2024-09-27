$(document).ready(function() {
    $('.chosen-select').chosen({
        width: "100%"
    });

    $('#calculateButton').click(function() {
        var businessType = $('#businessType').val();
        var leads = parseInt($('#leads').val());
        var averageCheck = parseFloat($('#averageCheck').val());
        var tariffPlan = $('#tariffPlan').val();

        // Проверка количества лидов и автоматическая подстановка 100
        if (leads >= 0 && leads <= 10) {
            leads = 100;
        }

        // Проверка среднего чека и умножение тарифа на 5
        var tariffMultiplier = (averageCheck < 10000) ? 5 : 1;

        var profitWithoutTariff = calculateProfit(businessType, leads, averageCheck);
        var profitWithTariff = calculateProfitWithTariff(businessType, leads, averageCheck, tariffPlan, tariffMultiplier);
        var profitDifference = profitWithTariff - profitWithoutTariff;

        $('#profitOutput').text('Прибыль: ' + profitWithTariff.toFixed(2) + ' руб.');
        $('#profitWithoutTariff').text('Прибыль без тарифа: ' + profitWithoutTariff.toFixed(2) + ' руб.');
        $('#profitWithTariff').text('Прибыль с тарифом: ' + profitWithTariff.toFixed(2) + ' руб.');
        $('#profitDifference').text('Разница в прибыли: ' + profitDifference.toFixed(2) + ' руб.');

        $('#result').removeClass('hidden');
        $('#requestSection').removeClass('hidden');

        saveData(businessType, leads, averageCheck, tariffPlan, profitWithoutTariff, profitWithTariff, profitDifference);
        document.getElementById('chartImage').style.display = 'none';
    });

    $('#requestButton').click(function() {
        alert('Заявка отправлена!');
    });

    function calculateProfit(businessType, leads, averageCheck) {
        var profitPercentage;
        switch(businessType) {
            case 'E-commerce':
                profitPercentage = 0.25;
                break;
            case 'Tourism':
                profitPercentage = 0.1;
                break;
            case 'Leisure':
                profitPercentage = 0.2;
                break;
            case 'HomeFamily':
                profitPercentage = 0.35;
                break;
            default:
                profitPercentage = 0.15;
        }
        return leads * averageCheck * profitPercentage;
    }

    function calculateProfitWithTariff(businessType, leads, averageCheck, tariffPlan, tariffMultiplier) {
        var baseProfit = calculateProfit(businessType, leads, averageCheck);
        var tariffPercentage;
        switch(tariffPlan) {
            case 'startup':
                tariffPercentage = 0.2;
                break;
            case 'growth':
                tariffPercentage = 0.3;
                break;
            case 'premium':
                tariffPercentage = 0.4;
                break;
            default:
                tariffPercentage = 0;
        }
        return baseProfit * (1 + tariffPercentage * tariffMultiplier);
    }

    function saveData(businessType, leads, averageCheck, tariffPlan, profitWithoutTariff, profitWithTariff, profitDifference) {
        $.ajax({
            url: '\php',
            method: 'POST',
            data: {
                businessType: businessType,
                leads: leads,
                averageCheck: averageCheck,
                tariffPlan: tariffPlan,
                profitWithoutTariff: profitWithoutTariff.toFixed(2),
                profitWithTariff: profitWithTariff.toFixed(2),
                profitDifference: profitDifference.toFixed(2)
            },
            success: function(response) {
                console.log('Data saved successfully');
            },
            error: function(xhr, status, error) {
                console.error('Error saving data:', error);
            }
        });
    }
});