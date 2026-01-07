function getSentiment(event, text) {
    console.log(text);

    if (!text || event.key !== "Enter") {
        return;
    }

    answerPart.style.display = "block";

    // Get Sentiment
    fetch('/sentiment?' + new URLSearchParams({
        text: text,
    }), {
        method: 'GET',
        headers: {}
    }).then(
        response => {
            console.log(response)
            response.json().then(function (data) {
                let positiveValue = (data.find(item => item.className === "Positive").probability * 100).toFixed(2);
                let negativeValue = (data.find(item => item.className === "Negative").probability * 100).toFixed(2);
                
                let positivePercent = positiveValue + "%";
                let negativePercent = negativeValue + "%";
                
                // Update progress bars
                positive.style.width = positivePercent;
                positive.textContent = positivePercent;
                positive.setAttribute('aria-valuenow', positiveValue);
                
                negative.style.width = negativePercent;
                negative.textContent = negativePercent;
                negative.setAttribute('aria-valuenow', negativeValue);
                
                // Update badges
                positivePercent.textContent = positivePercent;
                negativePercent.textContent = negativePercent;
            });
        }
    ).then(
        success => console.log(success)
    ).catch(
        error => console.log(error)
    );

}