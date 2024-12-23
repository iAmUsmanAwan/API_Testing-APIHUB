import axios from 'axios';

(async () => {
    let maxId = 0;

    for (let i = 1; i <= 1000; i++) { // Replace 1000 with a high value to test more IDs
        try {
        const response = await axios.get(`https://api.freeapi.app/api/v1/public/randomusers/${i}`);
        
        if (response.data && response.data.data) {
            console.log(`Valid ID: ${i}`);
            maxId = i; // Update maxId with the latest valid ID
        } else {
            console.log(`No user found for ID: ${i}`);
            break; // Stop if the API returns invalid data
        }
        } catch (error) {
        console.log(`Error for ID: ${i}`, error.message);
        break; // Stop on error
        }
    }

    console.log(`Maximum valid ID: ${maxId}`);
})();
