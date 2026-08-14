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
// OrionPulse Proposal Form

const proposalForm = document.getElementById("proposal-form");

const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbxFAYxwkTwbZF_MNMkkMRsJZHcxBrWrga9ZZJBTeZ6XEA2PLlZGUWJprIeT7tAVPmoirw/exec";


if (proposalForm) {

    proposalForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            proposalForm.querySelector("button[type='submit']");

        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const formData = new FormData(proposalForm);

        const data = {};

        formData.forEach((value, key) => {

            if (key === "services") {

                if (!data.services) {
                    data.services = [];
                }

                data.services.push(value);

            } else {

                data[key] = value;

            }

        });

        if (Array.isArray(data.services)) {
            data.services = data.services.join(", ");
        }


        try {

            await fetch(GOOGLE_SCRIPT_URL, {

                method: "POST",

                mode: "no-cors",

                headers: {
                    "Content-Type": "text/plain;charset=utf-8"
                },

                body: JSON.stringify(data)

            });


            submitButton.textContent = "Proposal Request Sent ✓";

            proposalForm.reset();


            setTimeout(function () {

                submitButton.disabled = false;
                submitButton.textContent = originalText;

            }, 5000);


        } catch (error) {

            console.error("Proposal form error:", error);

            submitButton.disabled = false;
            submitButton.textContent = "Try Again";

        }

    });

}
