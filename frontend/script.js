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

        const response = await fetch("http://127.0.0.1:8000/predict", {
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

        result.innerHTML = `
            <h2>${data.severity}</h2>

            <h3>${data.confidence}% Confidence</h3>

            <p><strong>Predicted Class:</strong> ${data.class}</p>

            <hr style="margin:20px 0">

            <h4>Probabilities</h4>

            <p>No Disease : ${(data.probabilities[0] * 100).toFixed(2)}%</p>
            <p>Mild : ${(data.probabilities[1] * 100).toFixed(2)}%</p>
            <p>Moderate : ${(data.probabilities[2] * 100).toFixed(2)}%</p>
            <p>Severe : ${(data.probabilities[3] * 100).toFixed(2)}%</p>
            <p>Critical : ${(data.probabilities[4] * 100).toFixed(2)}%</p>
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