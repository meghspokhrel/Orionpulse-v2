// Interactive ROI Calculator

const revenueSlider = document.getElementById("monthly-revenue");
const budgetSlider = document.getElementById("marketing-budget");

const revenueDisplay = document.getElementById("revenue-display");
const budgetDisplay = document.getElementById("budget-display");

const additionalRevenueDisplay =
    document.getElementById("additional-revenue");

const roasDisplay =
    document.getElementById("roas-result");

const annualImpactDisplay =
    document.getElementById("annual-impact");


function formatINR(value) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0
    }).format(value);
}


function formatCrore(value) {
    if (value >= 10000000) {
        return `₹${(value / 10000000).toFixed(2)}Cr`;
    }

    if (value >= 100000) {
        return `₹${(value / 100000).toFixed(2)}L`;
    }

    return formatINR(value);
}


function calculateROI() {

    const monthlyRevenue =
        Number(revenueSlider.value);

    const marketingBudget =
        Number(budgetSlider.value);


    /*
     * Illustrative model:
     * We estimate incremental revenue as a percentage
     * of the combined revenue and marketing investment.
     *
     * This is NOT a promise or guaranteed business result.
     */

    const estimatedROAS =
        Math.max(
            2,
            Math.min(
                6,
                2.5 +
                (monthlyRevenue / marketingBudget) * 0.35
            )
        );


    const estimatedAdditionalRevenue =
        marketingBudget * estimatedROAS;


    const estimatedAnnualImpact =
        estimatedAdditionalRevenue * 12;


    revenueDisplay.textContent =
        formatINR(monthlyRevenue);

    budgetDisplay.textContent =
        formatINR(marketingBudget);


    additionalRevenueDisplay.textContent =
        formatINR(estimatedAdditionalRevenue);


    roasDisplay.textContent =
        `${estimatedROAS.toFixed(1)}x`;


    annualImpactDisplay.textContent =
        formatCrore(estimatedAnnualImpact);
}


if (revenueSlider && budgetSlider) {

    revenueSlider.addEventListener(
        "input",
        calculateROI
    );

    budgetSlider.addEventListener(
        "input",
        calculateROI
    );

    calculateROI();
}
