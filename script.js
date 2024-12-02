function showDetails(sectionId) {

    gsap.to("#gallery-view", {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {

    document.getElementById('gallery-view').style.display = 'none';
    const detailsView = document.getElementById("details-view");
            detailsView.style.display = "flex";

    gsap.fromTo(
        "#details-view",
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
    );

    document.querySelectorAll('.detail-card').forEach(card => {
        card.style.display = 'none';
    });

    const detailCard = document.getElementById(`detail-${sectionId}`);
    if (detailCard) {
        detailCard.style.display = 'block';
    }
},
    });
}


function clearInputsAndBack() {
    gsap.to("#details-view", {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {

    document.getElementById('from-input').value = '';
    document.getElementById('to-input').value = '';


    const flightTableBody = document.getElementById('flight-table-body');
    flightTableBody.innerHTML = ''; 

    const flightInfo = document.getElementById('flight-info');
    flightInfo.style.display = 'none';

   
    const detailsView = document.getElementById('details-view');
    detailsView.style.display = 'none';

    const gallery = document.getElementById('gallery-view');
    gallery.style.display = 'flex';
    gsap.fromTo(
        "#gallery-view",
        { opacity: 0 },
        { opacity: 1, duration: 0.2 }
    );
},
});
}


async function searchFlights() {

    const name = document.getElementById('from-input').value.trim();
    const email = document.getElementById('to-input').value.trim();

    if (!name || !email) {
        alert("Please fill in both fields to search for flights.");
        return;
    }


    const flightTableBody = document.getElementById('flight-table-body');
    flightTableBody.innerHTML = '';

    const flightInfo = document.getElementById('flight-info');
    flightInfo.style.display = 'block';
    flightTableBody.innerHTML = `<tr><td colspan="7">Loading flight data...</td></tr>`;

    try {
        
        const flights = [
            {
                name: "Airways 101",
                time: "10:00 AM",
                journeyTime: "3h 20m",
                stops: "Non-stop",
                cost: "$300",
                start: "New York",
                end: "Chicago"
            },
            {
                name: "Skyline 202",
                time: "12:30 PM",
                journeyTime: "4h 10m",
                stops: "1 Stop",
                cost: "$250",
                start: "San Francisco",
                end: "Las Vegas"
            },
            {
                name: "Cloud 303",
                time: "6:45 PM",
                journeyTime: "5h 15m",
                stops: "2 Stops",
                cost: "$450",
                start: "Houston",
                end: "Miami"
            }
        ];

        
        const filteredFlights = flights.filter(
            flight =>
                flight.start.toLowerCase().includes(name.toLowerCase()) ||
                flight.end.toLowerCase().includes(name.toLowerCase())
        );

        
        if (filteredFlights.length === 0) {
            flightTableBody.innerHTML = `<tr><td colspan="7">No flights found for the provided input.</td></tr>`;
            return;
        }

        
        flightTableBody.innerHTML = ''; 
        filteredFlights.forEach(flight => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${flight.name}</td>
                <td>${flight.time}</td>
                <td>${flight.journeyTime}</td>
                <td>${flight.stops}</td>
                <td>${flight.cost}</td>
                <td>${flight.start}</td>
                <td>${flight.end}</td>
            `;
            flightTableBody.appendChild(row);
        });

        gsap.fromTo(flightInfo, { opacity: 0 }, { opacity: 1, duration: 0.2 });
    } catch (error) {
        console.error(error);
        flightTableBody.innerHTML = `<tr><td colspan="7">Error fetching flight data. Please try again later.</td></tr>`;
    }
}

