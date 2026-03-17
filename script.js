// Load and display NEB Curriculum
document.addEventListener('DOMContentLoaded', function() {
    fetch('curriculum.json')
        .then(response => response.json())
        .then(data => {
            displayCurriculum(data);
        })
        .catch(error => {
            console.error('Error loading curriculum:', error);
            document.getElementById('main-content').innerHTML = '<p>Error loading curriculum data.</p>';
        });
});

function displayCurriculum(data) {
    const main = document.getElementById('main-content');
    let html = '';

    for (const [streamKey, stream] of Object.entries(data.streams)) {
        html += `<section id="${streamKey}">
            <h2>${stream.name} Stream</h2>
            <h3>Compulsory Subjects</h3>
            <ul>`;
        stream.compulsory.forEach(subject => {
            html += `<li>${subject}</li>`;
        });
        html += `</ul>
            <h3>Elective Subjects</h3>
            <ul>`;
        stream.electives.forEach(subject => {
            html += `<li>${subject}</li>`;
        });
        html += `</ul>
            <h3>Subject Details</h3>`;

        for (const [subjectKey, subject] of Object.entries(stream.subjects)) {
            html += `<div class="subject">
                <h4>${subject.name}</h4>
                <h5>Grade 11</h5>
                <ul>`;
            subject.grade11.forEach(topic => {
                html += `<li>${topic}</li>`;
            });
            html += `</ul>
                <h5>Grade 12</h5>
                <ul>`;
            subject.grade12.forEach(topic => {
                html += `<li>${topic}</li>`;
            });
            html += `</ul>`;
            if (subject.grade12_resources) {
                html += `<h6>Recommended Books</h6>
                <ul>`;
                subject.grade12_resources.books.forEach(book => {
                    html += `<li>${book}</li>`;
                });
                html += `</ul>
                <h6>Important Notes</h6>
                <ul>`;
                subject.grade12_resources.important_notes.forEach(note => {
                    html += `<li>${note}</li>`;
                });
                html += `</ul>
                <h6>Answers/Solutions</h6>
                <p>${subject.grade12_resources.answers}</p>`;
            }
            html += `</div>`;
        }
        html += `</section>`;
    }

    html += `<section id="resources">
        <h2>Resources</h2>
        <p>Links to notes, past papers, etc.</p>
        <ul>
            <li><a href="https://www.neb.gov.np" target="_blank">Official NEB Website</a></li>
            <li><a href="#" onclick="alert('Add link to past papers')">Past Papers</a></li>
            <li><a href="#" onclick="alert('Add link to notes')">Study Notes</a></li>
        </ul>
    </section>`;

    main.innerHTML = html;
}
