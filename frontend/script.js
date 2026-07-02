const form = document.getElementById("predictForm");
const result = document.getElementById("result");
const loader = document.getElementById("loader");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const patient = {
        age: Number(age.value),
        sex: sex.value,
        cp: cp.value,
        trestbps: Number(trestbps.value),
        chol: Number(chol.value),
        fbs: fbs.value === "true",
        restecg: restecg.value,
        thalch: Number(thalch.value),
        exang: exang.value === "true",
        oldpeak: Number(oldpeak.value),
        slope: slope.value,
        ca: Number(ca.value),
        thal: thal.value
    };

    result.innerHTML = "";
    loader.classList.add("show");

    try {

        const response = await fetch("https://heart-disease-classifier-dtsi.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patient)
        });

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const data = await response.json();

        let color = "green";

switch(data.class){

    case 0:
        color="green";
        break;

    case 1:
        color="yellow";
        break;

    case 2:
        color="orange";
        break;

    case 3:
        color="red";
        break;

    case 4:
        color="darkred";
        break;

}

result.innerHTML = `

<div class="result-card ${color}">

<h2>${data.severity}</h2>

<p><strong>Predicted Class:</strong> ${data.class}</p>

<p><strong>Confidence:</strong> ${data.confidence}%</p>

<div class="progress">

<div
class="progress-bar"
style="width:${data.confidence}%">
</div>

</div>

<h3>Probability Distribution</h3>

<p>No Disease : ${(data.probabilities[0]*100).toFixed(1)}%</p>
<p>Mild : ${(data.probabilities[1]*100).toFixed(1)}%</p>
<p>Moderate : ${(data.probabilities[2]*100).toFixed(1)}%</p>
<p>Severe : ${(data.probabilities[3]*100).toFixed(1)}%</p>
<p>Critical : ${(data.probabilities[4]*100).toFixed(1)}%</p>

<div class="disclaimer">

<b>Disclaimer:</b>

This prediction is generated using a Machine Learning model and is intended for educational purposes only. It should not be considered medical advice or a substitute for professional diagnosis.

</div>

</div>

`;

    } catch (err) {

        result.innerHTML = `
            <div style="color:#ff6b6b;">
                <h3>⚠ Unable to connect to backend</h3>

                <p>
                    The backend may still be starting because it is hosted on a free server.
                    Please wait a few seconds and try again.
                </p>

                <small>${err.message}</small>
            </div>
        `;

    } finally {

        loader.classList.remove("show");

    }
});