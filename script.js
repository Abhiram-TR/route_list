document.getElementById('searchBtn').addEventListener('click', fetchApi);

function fetchApi() {
  const from = document.getElementById('fromInput').value;
  const to = document.getElementById('toInput').value;
  console.log('From:', from);
  console.log('To:', to);

  const url = `https://onlineksrtcswift.com/api/resource/searchRoutesV4?fromCityName=${from}&toCityName=${to}&journeyDate=2024-04-24&mode=oneway`;
  console.log('URL:', url);

  fetch(url)
    .then(response => {
      console.log('Response:', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text(); // Read response body as text
    })
    .then(text => {
      console.log('Response text:', text);
      // Check if response text is empty
      if (!text.trim()) {
        displayNoResultsMessage();
        return; // Stop further execution
      }
      // Try parsing response text as JSON
      try {
        const data = JSON.parse(text);
        console.log('Parsed JSON data:', data);
        if (!Array.isArray(data) || data.length === 0) {
          displayNoResultsMessage();
          return; // Stop further execution
        }
        displayBusResults(data);
      } catch (error) {
        console.error('Error parsing JSON data:', error);
        throw new Error('Invalid JSON format');
      }
    })
    .catch(err => {
      console.error('Error fetching data:', err);
    });
}

function displayNoResultsMessage() {
  const busResults = document.getElementById('busResults');
  busResults.innerHTML = '<p>No bus results found.</p>';
}

function displayBusResults(data) {
  const busResults = document.getElementById('busResults');
  busResults.innerHTML = '';

  data.forEach(item => {
    const busInfo = document.createElement('div');
    busInfo.innerHTML = `<p>${item.ServiceType}</p>`;
    busResults.appendChild(busInfo);
  });
}
