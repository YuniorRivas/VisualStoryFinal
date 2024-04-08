document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('FentanylGraph').getContext('2d');
    Chart.register({
        id: 'datasetLabels',
        afterDatasetsDraw(chart, args, options) {
            const {ctx} = chart;
            chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i);
                if (!meta.hidden && dataset.data.length > 0) {
                    const lastPoint = meta.data[meta.data.length - 1];
                    ctx.save();
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = dataset.borderColor;
                    ctx.font = 'bold 12px Arial';
                    ctx.fillText(dataset.label, lastPoint.x + 10, lastPoint.y);
                    ctx.restore();
                }
            });
        }
    });
    const createChart = () => {
        const chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from(new Array(24), (val, index) => 1999 + index),
                datasets: [{
                    label: 'Fentanyl',
                    data: [1000, 1200, 1500, 1750, 2000, 3000, 4500, 6000, 8000, 10000, 12000, 14000, 18000, 25000, 33000, 42000, 50000, 55000, 60000, 65000, 68000, 70000, 72000, 74000],
                    borderColor: 'rgba(165, 168, 213, 1)',
                    backgroundColor: 'rgba(165, 168, 213, 0.2)',
                    fill: true
                }, {
                    label: 'Opioids',
                    data: [5000, 5200, 5400, 5600, 5800, 6000, 6200, 6400, 6500, 6550, 6500, 6450, 6400, 6350, 6300, 6250, 6200, 6150, 6100, 6050, 6000, 5950, 5900, 5850],
                    borderColor: 'rgba(165, 168, 213, 1)',
                    backgroundColor: 'rgba(165, 168, 213, 0.2)',
                    fill: true
                }, {
                    label: 'Heroin',
                    data: [1500, 1550, 1575, 1600, 1625, 1650, 1675, 1700, 1725, 1750, 1775, 1800, 1825, 1850, 1875, 1900, 1925, 1950, 1975, 2000, 2025, 2050, 2075, 2100],
                    borderColor: 'rgba(165, 168, 213, 1)',
                    backgroundColor: 'rgba(165, 168, 213, 0.2)',
                    fill: true
                }]
            },
            options: {
                layout: {
                    padding: {
                        right: 70
                    }
                },
                animation: {
                    duration: 5000,
                    easing: 'linear',
                    onComplete: () => {
                        setTimeout(() => {
                            chart.reset();
                            createChart();
                        }, 2000);
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            callback: function(val, index) {
                                const year = parseInt(this.getLabelForValue(val));
                                return year % 2 === 0 ? year : '';
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        suggestedMax: 80000
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    };
    createChart();
});
