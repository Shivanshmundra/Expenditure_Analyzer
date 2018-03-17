function displayResult(filteredResult) {
    let labelString = '';
    let count = 1;
    if (filteredResult.length > 1) {
        labelString = '... or it might be ';
        filteredResult.forEach((resLabel) => {
            if (count == filteredResult.length) {
                labelString += 'a ' + resLabel.description + '! I\'m pretty sure! Maybe.'
            } else if (count == 1) {

            } else {
                labelString += 'a ' + resLabel.description + ' or '
            }
            count++;
        });

        Alert.alert(
            'Its a ' + filteredResult[0].description + '!',
            labelString
        );
    } else {
        Alert.alert(
            'Its a ' + filteredResult[0].description + '!'
        );
    }
}


const checkForLabels = async (base64) => {
    console.log("peace hai !!!!!!!!!!!!!!!!!!!!!!!!!!!!!")


    return await
        fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDVWGW4zJiwG680J03fhSntnmsAsCBUXG4', {
            method: 'POST',
            body: JSON.stringify({
                "requests": [
                    {
                        "image": {
                            "content": base64
                        },
                        "features": [
                            {
                                "type": "TEXT_DETECTION"
                            }
                        ]
                    }
                ]
            })
        }).then((response) => {
            console.log("bhoooooooooooooooooo");
            return response.json();
        }, (err) => {
            console.error('promise rejected1111111111111111111111')
            console.error(err)
        });
}

export {
    displayResult,
    checkForLabels
}